"""Integration tests for WebSocket Bolna Voice AI drills."""
import json
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_websocket_cricket_user_audio():
    with client.websocket_connect("/ws/drill?agent=CRICKET_AGENT") as websocket:
        # Send user_audio chunk
        msg = {
            "event": "user_audio",
            "data": "b64pcmbytes==",
            "db": 92.0,
        }
        websocket.send_text(json.dumps(msg))

        # Receive streamed partial ASR
        response_text = websocket.receive_text()
        data = json.loads(response_text)
        assert data["event"] == "asr_partial"
        assert "छक्का" in data["text_hi"]
        assert data["clarity_percent"] >= 70


def test_websocket_nani_user_text():
    with client.websocket_connect("/ws/drill?agent=NANI_BOSS_AGENT") as websocket:
        # Send user_text (silent mode turn)
        msg = {
            "event": "user_text",
            "text": "नमस्ते नानी! कल आ रहा हूँ।",
        }
        websocket.send_text(json.dumps(msg))

        # Receive Nani voice note bubble
        response_text = websocket.receive_text()
        data = json.loads(response_text)
        assert data["event"] == "ai_voice_note"
        assert "खीर" in data["text_hi"]
        assert data["duration"] == "0:03"
