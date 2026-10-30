# 🤖 Bhasha Setu — AI & Voice Microservice

Backend intelligence, speech recognition (ASR), and conversational AI services (Bolna Voice AI, LLM evaluation pipelines) for **Bhasha Setu (भाषा सेतु)**.

---

## 🏗️ Architecture & Modules

* **`main.py`:** FastAPI application entrypoint with CORS, route mounts, and system health checks.
* **`config.py`:** Central configuration for acoustic sample rates (16kHz), Bolna WebSocket endpoint, and thresholds.
* **`agents/`:**
  * **`cricket_agent.py` (`CRICKET_AGENT`):** Stadium Roar Meter decibel gauge evaluator, Wankhede cadence scoring, excitement detection.
  * **`nani_agent.py` (`NANI_BOSS_AGENT`):** WhatsApp-style conversational voice agent for Diwali dialogue, respectful tone check (`आप`, `नमस्ते`, `जी`), and Golden Diya unlock.
* **`services/`:**
  * **`asr_service.py`:** Devanagari text normalization, punctuation stripping, and acoustic clarity computation.
  * **`fluency_scorer.py`:** Pronunciation scoring (0-100), natural cadence verification, and respect marker detection.
  * **`audio_generator.py`:** Dynamic speed adjustment (0.75x, 0.8x, 1.0x) and lesson prompt metadata.
* **`routers/`:**
  * **`evaluation.py`:** `POST /api/evaluation/check-answer` (Screen 2 `दिल`, Screen 4 `तीखा`).
  * **`voice_analysis.py`:** `POST /api/voice/evaluate-turn` & `GET /api/voice/prompt-metadata/{clip_id}`.
  * **`websocket_drill.py`:** WebSocket `/ws/drill?agent={AGENT_KEY}` for real-time bidirectional audio & text streams.

---

## 🚀 Quick Start

```bash
# 1. Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the FastAPI development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## 🧪 Testing

Run the automated test suite with pytest:

```bash
pytest -v
```

All 15 unit and integration tests verify Devanagari evaluation, fluency scoring, Bolna agents, and WebSocket streaming.
