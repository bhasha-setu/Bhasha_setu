"""Unit tests for Fluency Scoring & Cultural Respect Tone Evaluation."""
import pytest
from services.fluency_scorer import FluencyScorer
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_detect_respect_markers():
    assert FluencyScorer.detect_respect_markers("नमस्ते नानी, आप कैसे हैं?") == "आप"
    assert FluencyScorer.detect_respect_markers("बहुत बहुत धन्यवाद") == "धन्यवाद"
    assert FluencyScorer.detect_respect_markers("तू इधर आ") is None


def test_evaluate_spoken_turn_with_respect():
    result = FluencyScorer.evaluate_spoken_turn(
        spoken_text="नमस्ते नानी! मैं आप के लिए मिठाई ला रहा हूँ।",
        target_concept="arrival with sweets",
        decibels=88.0,
        pitch_hz=230.0,
    )
    assert result["fluency_score"] >= 85
    assert result["respect_marker_used"] is not None
    assert result["is_golden_diya_unlocked"] is True
    assert result["unlocked_artifact_id"] == "golden-diya"
    assert result["xp_awarded"] == 100


def test_evaluate_turn_endpoint():
    payload = {
        "spoken_text": "नमस्ते नानी! मैं कल आ रहा हूँ।",
        "decibels": 86.0,
        "pitch_hz": 220.0,
    }
    response = client.post("/api/voice/evaluate-turn", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["fluency_score"] >= 70
    assert "Natural Fluency" in data["feedback_summary"]


def test_prompt_metadata_endpoint():
    response = client.get("/api/voice/prompt-metadata/bollywood_kabhi_kabhi?speed=0.75")
    assert response.status_code == 200
    data = response.json()
    assert data["clip_id"] == "bollywood_kabhi_kabhi"
    assert data["playback_speed"] == 0.75
    assert data["effective_duration_sec"] > 5.0
