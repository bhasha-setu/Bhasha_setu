# 🌉 Bhasha Setu (भाषा सेतु — The Language Bridge)

> **Connecting Script to Spontaneous Speech**  
> *A Zen-minimalist Indian voice & active-recall language learning application.*

---

## 📂 Repository Structure

* **[`bhasha-setu-frontend/`](./bhasha-setu-frontend):** Android mobile application built with React Native, TypeScript, and Expo SDK 58.
  * **100% Active Recall & Spoken Production:** 0% multiple-choice guessing buttons.
  * **6 Finalized Screen Flows:** Splash Loading Screen, Quest Map with River Crossing Path, Bollywood Studio Lyric Recall, Cricket Commentary Roar Drill, Street Food Masterchef Counter, and Diwali WhatsApp Call with Nani.
  * **Custom Devanagari Virtual Keyboard:** Tactile haptic keycaps designed for mobile Hindi typing with Bollywood and Street Food variants.
  * **Real-time Audio & Roar Gauge:** Dynamic decibel-driven soundwave meters, Stadium Roar Meter, and native WhatsApp milestone sharing.
  * **Testing:** 29 Jest test suites, 173 passed tests with 100% core logic coverage and strict TypeScript zero-error type-checking.

* **[`bhasha-setu-AI/`](./bhasha-setu-AI):** AI backend microservice, speech recognition (ASR) pipelines, and conversational voice agent integrations.
  * **FastAPI Microservice:** Asynchronous REST APIs for active recall answer validation and acoustic voice evaluation.
  * **Bolna Voice AI Integration:** WebSocket streaming for `CRICKET_AGENT` and `NANI_BOSS_AGENT`.
  * **Fluency & Respect Tone Scorer:** Evaluates Hindi pronunciation cadence, cultural respect markers (`आप`, `नमस्ते`, `जी`), and unlocks the Golden Diya reward.
  * **Testing:** Automated Pytest test suite with 15 passing tests for evaluation, agents, and WebSocket streaming.

---

## 🚀 Quick Start

### 1. Frontend Mobile App

```bash
cd bhasha-setu-frontend
npm install
npx expo start
```

Press `a` in the terminal to launch on an Android emulator, or scan the QR code with **Expo Go** on an Android device. Run tests with:
```bash
npm test
```

### 2. AI & Backend Service

```bash
cd bhasha-setu-AI
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Run tests with:
```bash
pytest -v
```

---

## 📋 Technical Requirements & Specifications

- [Frontend TRD](./bhasha-setu-frontend/docs/TRD.md)
- [Frontend Documentation](./bhasha-setu-frontend/README.md)
- [AI Service Documentation](./bhasha-setu-AI/README.md)
