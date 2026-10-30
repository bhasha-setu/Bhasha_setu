"""Unit tests for Active Recall Answer Evaluation."""
import pytest
from fastapi.testclient import TestClient
from main import app
from services.asr_service import ASRService

client = TestClient(app)


def test_root_health():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "CRICKET_AGENT" in data["available_agents"]


def test_normalize_devanagari():
    assert ASRService.normalize_devanagari("  दिल  ") == "दिल"
    assert ASRService.normalize_devanagari("“तीखा”!") == "तीखा"
    assert ASRService.normalize_devanagari("") == ""


def test_compare_words():
    assert ASRService.compare_words("दिल", "दिल") is True
    assert ASRService.compare_words("  तीखा  ", "तीखा") is True
    assert ASRService.compare_words("दिल", "मन") is False


def test_evaluate_answer_bollywood_correct():
    payload = {
        "level_id": "BOLLYWOOD",
        "typed_word": "दिल",
        "expected_word": "दिल",
    }
    response = client.post("/api/evaluation/check-answer", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_correct"] is True
    assert data["xp_awarded"] == 20
    assert data["combo_multiplier"] == 2


def test_evaluate_answer_streetfood_correct():
    payload = {
        "level_id": "STREET_FOOD",
        "typed_word": "तीखा",
        "expected_word": "तीखा",
    }
    response = client.post("/api/evaluation/check-answer", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_correct"] is True
    assert data["xp_awarded"] == 50


def test_evaluate_answer_incorrect():
    payload = {
        "level_id": "BOLLYWOOD",
        "typed_word": "मन",
        "expected_word": "दिल",
    }
    response = client.post("/api/evaluation/check-answer", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_correct"] is False
    assert data["xp_awarded"] == 0
    assert data["combo_multiplier"] == 1

