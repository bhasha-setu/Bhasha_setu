# 🌉 Bhasha Setu (भाषा सेतु) — Comprehensive Features & Module Specification

> **Document Version:** 2.0.0 • **Last Updated:** October 2026  
> **Repository:** `bhasha-setu/Bhasha_setu` • **Target Platforms:** Android, iOS, Modern Mobile & Web Browsers

---

## 📑 Table of Contents

1. [Executive Summary & Core Philosophy](#1-executive-summary--core-philosophy)
2. [Visual Design System & Zen Theme](#2-visual-design-system--zen-theme)
3. [End-to-End Screen Features & Workflows](#3-end-to-end-screen-features--workflows)
   - [Screen 0: Splash & Script-Bridge Loading](#screen-0-splash--script-bridge-loading)
   - [Screen 1: Zen Quest Map & River Crossing Trail](#screen-1-zen-quest-map--river-crossing-trail)
   - [Screen 2: Bollywood Studio — Lyric Recall Drill](#screen-2-bollywood-studio--lyric-recall-drill)
   - [Screen 3: Cricket Commentary — Wankhede Stadium Roar Drill](#screen-3-cricket-commentary--wankhede-stadium-roar-drill)
   - [Screen 4: Street Food Masterchef — Pani Puri Counter](#screen-4-street-food-masterchef--pani-puri-counter)
   - [Screen 5: Diwali Nani Boss — WhatsApp Voice Simulation](#screen-5-diwali-nani-boss--whatsapp-voice-simulation)
4. [Frontend Architecture & Module Directory (`bhasha-setu-frontend/`)](#4-frontend-architecture--module-directory)
   - [App Shell & Responsive Mockup Container](#41-app-shell--responsive-mockup-container)
   - [Screens Layer](#42-screens-layer)
   - [Inputs & Custom Devanagari Virtual Keyboards](#43-inputs--custom-devanagari-virtual-keyboards)
   - [Voice, Audio & Roar Visualization Components](#44-voice-audio--roar-visualization-components)
   - [HUD, Dashboard & Gamification Engine](#45-hud-dashboard--gamification-engine)
   - [State Store & Persistence](#46-state-store--persistence)
   - [Native Device Services Layer](#47-native-device-services-layer)
   - [API Client & WebSocket Network Engine](#48-api-client--websocket-network-engine)
5. [Backend AI Microservice Architecture & Module Directory (`bhasha-setu-AI/`)](#5-backend-ai-microservice-architecture--module-directory)
   - [FastAPI Microservice Core](#51-fastapi-microservice-core)
   - [Bolna Voice AI Agent Implementations](#52-bolna-voice-ai-agent-implementations)
   - [ASR & Speech Synthesis Engines](#53-asr--speech-synthesis-engines)
   - [Fluency, Cadence & Cultural Respect Analyzer](#54-fluency-cadence--cultural-respect-analyzer)
   - [REST & WebSocket Routers](#55-rest--websocket-routers)
6. [API Specifications & Wire Contracts](#6-api-specifications--wire-contracts)
7. [Verification, Quality Assurance & Test Matrix](#7-verification-quality-assurance--test-matrix)
8. [Commercial Readiness & Deployment Guide](#8-commercial-readiness--deployment-guide)

---

## 1. Executive Summary & Core Philosophy

**Bhasha Setu (भाषा सेतु — "The Language Bridge")** is an authentic Indian voice and active-recall language learning game targeting Android (built on Expo SDK 58, React Native 0.88.1, TypeScript strict, and FastAPI with Bolna Voice AI).

### 💡 Core Product Tenet: 100% Active Recall (0% Multiple Choice Guessing)
Traditional language apps rely on 4-button multiple choice guessing or word banks that trigger passive recognition rather than spontaneous speech production. Bhasha Setu strictly adheres to **100% Active Recall**:
- **Zero Multiple-Choice Buttons:** The learner must either **speak the words aloud into the microphone** or **type them character-by-character on a custom Devanagari keyboard**.
- **Real-Time Acoustic & Cultural Scoring:** Spoken input is analyzed for phonetic accuracy, speech cadence, and cultural etiquette markers (e.g., honorific `'आप'` vs. informal `'तू'`).
- **Tactile Immersion:** Native haptic pulses on every keypress, audio playback speed toggles (0.75x slow enunciation), and interactive WhatsApp audio chat bubbles.

---

## 2. Visual Design System & Zen Theme

The visual identity combines an **Indian Zen Minimalist** palette inspired by Jaipur terracotta pottery, Kerala riverways, and Diwali candlelight:

| Token Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| **`bgCream`** | `#FAF6F0` | Primary app background (warm soothing canvas) |
| **`cardWhite`** | `#FFFFFF` | Elevated card surfaces, dialogue bubbles, and input containers |
| **`surfaceSand`** | `#F5EBE1` | Secondary containers, HUD badges, and drawer surfaces |
| **`surfaceInput`** | `#FDF6EE` | Interactive text field backgrounds |
| **`surfaceMint`** | `#EBF5F3` | Feedback cards for mastered milestones |
| **`terracotta`** | `#8C4A08` | Primary Hindi brand accent and microphone CTA borders |
| **`ochreAccent`** | `#C46215` | S-curve river crossing path and progress indicators |
| **`sageTeal`** | `#3B9B8E` | Primary action buttons, docked submit buttons, and active tabs |
| **`espressoText`** | `#2C1A0E` | High-contrast body and heading typography |
| **`mutedBrown`** | `#7A6455` | Secondary captions, subheadings, and hint text |
| **`borderWarm`** | `#EAE0D5` | Clean card outlines and subtle dividers |
| **`goldStar`** | `#F39C12` | Milestone stars, Golden Diya reward highlights, and streak badges |
| **`successGreen`** | `#27AE60` | Correct answers, respect verification badges, and online indicators |

### 🖋️ Typography & Fonts
- **Latin Font:** `Plus Jakarta Sans` (weights: 400, 500, 600, 700, 800)
- **Devanagari Font:** `Noto Sans Devanagari` (weights: 400, 500, 600, 700, 800)
- **CSS Reset (`src/app/+html.tsx`):** Preloads Google Fonts with `crossorigin`, disables web scrollbars, and enforces mobile aspect scaling.

---

## 3. End-to-End Screen Features & Workflows

### Screen 0: Splash & Script-Bridge Loading (`/`)
* **Route:** `src/app/index.tsx` → `src/screens/SplashLoadingScreen.tsx`
* **Features:**
  * **Brand Bridge Logo:** Visual `अ ⌒ A` bridge glyph with dual-tone terracotta and ochre coloring.
  * **Animated Audio Visualizer:** 7-bar bouncing soundwave bar (`SoundwaveBars`) responding to voice frequencies.
  * **Dynamic Progress Loader:** Smooth 0% → 100% simulated loading sequence with status feedback ("Connecting speech engines...", "Ready to speak!").
  * **Skip Action:** "Enter Quest Map →" button allowing immediate navigation.
  * **Stack Transition:** Uses `router.replace('/quest-map')` to prevent the user from cycling back into the splash screen.

### Screen 1: Zen Quest Map & River Crossing Trail (`/quest-map`)
* **Route:** `src/app/quest-map.tsx` → `src/screens/QuestMapScreen.tsx`
* **Features:**
  * **Top HUD & SubHeader:** Shows current streak (`5 days`), XP (`1,420 XP`), and level progression.
  * **Active Recall Hero Card:** Daily motivational card highlighting the 100% active recall mission and dynamic shelf displaying unlocked cultural artifacts.
  * **River Crossing S-Curve Path:** Visualized 4-stage river crossing trail with dashed connectors and checkpoint flag badges.
  * **Interactive Quest Level Nodes (`QuestNodeCard`):**
    * *Level 1 (Mastered):* 🎬 Zen Bollywood Studio (+20 XP, 3 stars)
    * *Level 2 (Mastered):* 🏏 Zen Cricket Commentary (+30 XP, 3 stars)
    * *Level 3 (Current / In Progress):* 🍲 Street Food Masterchef (+40 XP, active highlight)
    * *Level 4 (Boss Fight):* 🪔 Diwali WhatsApp Call with Nani (+50 XP, Golden Diya reward)
  * **Milestone Chest Bar:** Progress tracker indicating unlocked chests and bonus XP.
  * **Bottom Tab Bar (`BottomTabBar`):** 3-tab navigation switching between Quest Map, Artifacts Modal, and Profile Modal.

### Screen 2: Bollywood Studio — Lyric Recall Drill (`/bollywood-studio`)
* **Route:** `src/app/bollywood-studio.tsx` → `src/screens/BollywoodStudioScreen.tsx`
* **Scenario:** "Complete the iconic lyric from the 1976 classic *Kabhi Kabhie*."
* **Features:**
  * **Audio Speed Pills (`AudioSpeedPills`):** Audio player with 1.0x, 0.8x, and 0.75x speed pills for slow phonetic enunciation.
  * **Fill-in-the-Blank Lyric Card:** Real-time visual slot displaying `कभी कभी मेरे [ _ _ _ _ ] में ख़्याल आता है`.
  * **Phonetic Hint Accordion:** Expandable hint ("Phonetic clue: Rhymes with 'Bill', starts with 'द' (meaning heart)").
  * **Active Devanagari Input:** Clean elevated input box showing typed characters with single-tap backspace and clear buttons.
  * **Custom Bollywood Devanagari Keyboard:** 4-row mobile keyboard containing keycaps for consonants (`क, ख, ग, च...`), matras (`ा, ि, ी, ु, ू, े, ै`), and special characters.
  * **Docked Action Button:** Sage teal button docked above the keyboard triggering instant answer validation.

### Screen 3: Cricket Commentary — Wankhede Stadium Roar Drill (`/cricket-commentary`)
* **Route:** `src/app/cricket-commentary.tsx` → `src/screens/CricketCommentaryScreen.tsx`
* **Scenario:** "Shout the commentary line when Virat Kohli hits the winning six at Wankhede Stadium!"
* **Features:**
  * **Wankhede Stadium Roar Meter (`StadiumRoarMeterCard`):** Dynamic gradient decibel gauge reaching **92% Roar Volume** with a pulsing stadium crowd icon (`🏏`).
  * **Live Voice Capture Card (`LiveVoiceCaptureCard`):** Displays real-time audio waveform with 7 pulsing terracotta bars during microphone recording.
  * **Terracotta Mic Button (`TerracottaMicButton`):** Large circular microphone CTA with haptic click response.
  * **Public / Silent Mode Toggle (`PublicSilentTogglePill`):** Allows commuters on the Mumbai local train or office workers to toggle from microphone to text fallback without breaking active recall.
  * **Acoustic Cadence Evaluation:** Evaluates spoken phrase *"गेंद सीमा रेखा के पार, शानदार छक्का!"* (Ball over the boundary, fantastic six!).

### Screen 4: Street Food Masterchef — Pani Puri Counter (`/street-food`)
* **Route:** `src/app/street-food.tsx` → `src/screens/StreetFoodMasterchefScreen.tsx`
* **Scenario:** "Order your custom pani puri plate at the street vendor cart in rapid-fire Hindi."
* **Features:**
  * **Audio Vendor Prompt:** Street vendor voice saying: *"भैया, तीखा पानी पूरी चाहिए या मीठा?"* (Brother, do you want spicy or sweet water?).
  * **Audio Speed Pills:** Slow down fast Mumbai street hindi to 0.8x or 0.75x.
  * **Target Word Slot:** Prompts learner for active recall of `तीखा` (Spicy).
  * **Street Food Keyboard Variant:** Custom 6-column grid with matras and instant haptic feedback.
  * **Masterchef Feedback Banner:** Displays instant reward breakdown (+40 XP) with seamless transition to the next stage.

### Screen 5: Diwali Nani Boss — WhatsApp Voice Simulation (`/diwali-nani-boss`)
* **Route:** `src/app/diwali-nani-boss.tsx` → `src/screens/DiwaliNaniBossScreen.tsx`
* **Scenario:** "Your grandmother (Nani) calls you on WhatsApp for Diwali. Greet her respectfully before the crackers start!"
* **Features:**
  * **WhatsApp Chat Canvas:** Authentic WhatsApp conversation layout with encrypted call badge, date separator, and Nani contact header.
  * **Nani Voice Audio Bubble (`WhatsAppVoiceBubble`):** Realistic green chat bubble with playback scrubber, duration `0:14`, and Nani's Hindi prompt: *"बेटा, दिवाली की तैयारी कैसी चल रही है? घर कब आओगे?"*.
  * **Voice Response Capture:** User records their reply via microphone or types in silent mode.
  * **Cultural Respect Analyzer:** Scans input for honorific markers (`'आप'`, `'नमस्ते'`, `'प्रणाम'`, `'जी'`). If learner uses informal `'तू'`, polite guidance appears.
  * **Golden Diya Loot Card (`GoldenDiyaLootCard`):** Unlocks the legendary Golden Diya artifact with 3-star rating, festive glow, and congratulatory banner.
  * **Native WhatsApp Status Sharing (`shareStatusService`):** One-tap button to share your milestone directly to WhatsApp Status.

---

## 4. Frontend Architecture & Module Directory

The frontend is organized into modular directories under `bhasha-setu-frontend/src/`:

```
bhasha-setu-frontend/src/
├── app/                        # Expo Router file-based route definitions
│   ├── _layout.tsx             # Responsive smartphone frame & root stack
│   ├── +html.tsx               # Web HTML root with Google Fonts & CSS resets
│   ├── index.tsx               # Route -> SplashLoadingScreen
│   ├── quest-map.tsx           # Route -> QuestMapScreen
│   ├── bollywood-studio.tsx    # Route -> BollywoodStudioScreen
│   ├── cricket-commentary.tsx  # Route -> CricketCommentaryScreen
│   ├── street-food.tsx         # Route -> StreetFoodMasterchefScreen
│   └── diwali-nani-boss.tsx    # Route -> DiwaliNaniBossScreen
├── components/                 # Reusable UI component modules
│   ├── buttons/                # Buttons, speed pills, mic CTAs, silent toggles
│   ├── chat/                   # WhatsApp bubbles, roar meters, voice cards, loot cards
│   ├── dashboard/              # River trail, quest nodes, chest bars, modals
│   ├── inputs/                 # Custom Devanagari virtual keyboards & text fields
│   └── menu/                   # Top app bars, sub-headers, bottom tab bar, logo badges
├── lib/                        # Services, API clients, and network logic
│   ├── api/                    # REST client & mock server utilities
│   ├── services/               # Haptics, audio player, decibel meter, status share
│   └── websockets/             # Real-time WebSocket streaming client
├── screens/                    # Standalone screen implementations
├── store/                      # Zustand frontend global state & persistence
└── theme/                      # Zen color tokens, spacing, typography & radii
```

### 4.1. App Shell & Responsive Mockup Container
* **`src/app/_layout.tsx`:**
  * Detects viewport dimensions using `useWindowDimensions()`.
  * If running on **desktop web** (`width > 540px`), wraps the app inside an authentic **smartphone frame mockup** (412px wide, curved bezel, dynamic island, status bar with live time, Wi-Fi, 5G, and battery indicators).
  * Houses a top preview header with quick-nav pills for immediate screen switching.
  * If running on **mobile** (`width <= 540px`), renders full-screen edge-to-edge with native safe areas.
* **`src/app/+html.tsx`:**
  * Global HTML entrypoint loading Google Fonts (`Noto Sans Devanagari` and `Plus Jakarta Sans`).
  * Sets mobile viewport meta tags, removes desktop scrollbars, and applies font inheritance.

### 4.2. Screens Layer
* **`src/screens/SplashLoadingScreen.tsx`:** Loading screen with progress animation and audio waves.
* **`src/screens/QuestMapScreen.tsx`:** Hub screen displaying the River Crossing trail, streak HUD, and modals.
* **`src/screens/BollywoodStudioScreen.tsx`:** 1976 classic lyric fill-in-blank drill.
* **`src/screens/CricketCommentaryScreen.tsx`:** Live voice commentary and stadium roar meter.
* **`src/screens/StreetFoodMasterchefScreen.tsx`:** Rapid-fire street food ordering drill.
* **`src/screens/DiwaliNaniBossScreen.tsx`:** WhatsApp conversational boss encounter with Nani.

### 4.3. Inputs & Custom Devanagari Virtual Keyboards
* **`src/components/inputs/DevanagariKeyboard.tsx`:**
  * Tactile virtual keyboard supporting two specialized variants:
    * `variant="bollywood"`: Full Hindi alphabet, matras, anusvara (`ं`), chandrabindu (`ँ`), space, and clear.
    * `variant="streetfood"`: 6-column grid optimized for food vocabulary (`क, ख, ग, च, ज, ट...`).
  * Triggers native haptics on every touch.
* **`src/components/inputs/ActiveDevanagariInput.tsx`:**
  * Clean display field showing current typed letters with cursor indicator and quick-clear controls.

### 4.4. Voice, Audio & Roar Visualization Components
* **`src/components/chat/LiveVoiceCaptureCard.tsx`:** Real-time visual recording card showing active decibel levels.
* **`src/components/chat/WhatsAppVoiceBubble.tsx`:** Authentic WhatsApp audio player bubble with play/pause and duration indicator.
* **`src/components/chat/StadiumRoarMeterCard.tsx`:** Gradient decibel gauge showing roar intensity up to 92%.
* **`src/components/menu/BrandLogoBadge.tsx` (`SoundwaveBars`):** Reusable multi-bar bouncing soundwave component supporting `'sm'`, `'md'`, and `'lg'` sizes.

### 4.5. HUD, Dashboard & Gamification Engine
* **`src/components/dashboard/RiverCrossingTrail.tsx`:** S-curve visual path connecting Quest stages 1 through 4.
* **`src/components/dashboard/QuestNodeCard.tsx`:** Level cards showing completion state, star ratings, and lock status.
* **`src/components/dashboard/MilestoneChestBar.tsx`:** Visual progress bar leading to the reward chest.
* **`src/components/dashboard/ActiveRecallHeroCard.tsx`:** Highlight card showcasing unlocked artifacts.
* **`src/components/chat/GoldenDiyaLootCard.tsx`:** Celebratory reward card unlocked upon completing the Nani boss fight.
* **`src/components/dashboard/ArtifactsModal.tsx` & `ProfileModal.tsx`:** Interactive bottom-sheet modals for user inventory and stats.

### 4.6. State Store & Persistence
* **`src/store/useFrontendStore.ts`:**
  * Built on **Zustand** with synchronous persistence via **MMKV** (`offlineCacheService`).
  * Tracks: `xp`, `streak`, `currentLevel`, `unlockedArtifacts`, and `isAudioMuted`.
  * Actions: `addXp()`, `completeLevel()`, `incrementStreak()`, `unlockArtifact()`, `toggleMute()`.

### 4.7. Native Device Services Layer
* **`src/lib/services/hapticsService.ts`:** Wraps `expo-haptics` with fallback protection for web and unsupported devices.
  * Methods: `triggerKeycapHaptic()`, `triggerSuccessHaptic()`, `triggerWarningHaptic()`.
* **`src/lib/services/audioPlayerService.ts`:** Controls playback of prompt audio files and simulated speeds.
* **`src/lib/services/audioMeterService.ts`:** Computes live decibel levels and pitch cadence from microphone streams.
* **`src/lib/services/shareStatusService.ts`:** Invokes native `expo-sharing` to share milestone cards directly to WhatsApp Status.
* **`src/lib/services/offlineCacheService.ts`:** High-speed key-value storage adapter for local offline caching.

### 4.8. API Client & WebSocket Network Engine
* **`src/lib/api/client.ts`:** Typed HTTP client communicating with the AI microservice endpoints.
* **`src/lib/websockets/websockets.ts`:** WebSocket streaming client for real-time bi-directional voice drills.

---

## 5. Backend AI Microservice Architecture & Module Directory

The AI microservice is located in `bhasha-setu-AI/` and runs on **FastAPI** with Python 3.10+:

```
bhasha-setu-AI/
├── agents/                     # Conversational Voice AI Agent logic
│   ├── base_agent.py           # Abstract agent class with turn orchestration
│   ├── cricket_agent.py        # Cricket Commentary Bolna Agent
│   └── nani_agent.py           # Diwali Nani Boss Bolna Agent
├── routers/                    # REST and WebSocket endpoints
│   ├── evaluation.py           # Active recall answer evaluation
│   ├── voice_analysis.py       # Speech cadence & respect tone analysis
│   └── websocket_drill.py      # Real-time WebSocket audio streaming
├── services/                   # Business logic and speech engines
│   ├── asr_service.py          # Automatic Speech Recognition (Hindi ASR)
│   ├── audio_generator.py      # Speech synthesis & prompt generator
│   └── fluency_scorer.py       # Cadence, pronunciation & respect marker scoring
├── tests/                      # Automated Pytest test suites
├── config.py                   # Pydantic environment settings
├── main.py                     # Microservice entrypoint & CORS middleware
└── requirements.txt            # Python dependencies
```

### 5.1. FastAPI Microservice Core
* **`main.py`:** Initializes the FastAPI application, mounts CORS middleware for mobile and web simulators, and mounts modular routers.
* **`config.py`:** Uses Pydantic `BaseSettings` to manage environment variables (`BOLNA_API_KEY`, `DEEPGRAM_API_KEY`, `AUDIO_SAMPLE_RATE`).

### 5.2. Bolna Voice AI Agent Implementations
* **`CRICKET_AGENT` (`agents/cricket_agent.py`):**
  * Models a high-energy Hindi cricket commentator at Wankhede Stadium.
  * Prompt: Expects enthusiastic shouts of *"छक्का"* or *"गेंद सीमा रेखा के पार"*.
  * Evaluates acoustic energy and returns crowd cheer responses.
* **`NANI_BOSS_AGENT` (`agents/nani_agent.py`):**
  * Models an affectionate yet traditional Indian grandmother calling on WhatsApp.
  * Prompt: Greets the learner and asks about Diwali preparations.
  * Enforces the **Cultural Etiquette Rule**: Checks for honorific markers (`'आप'`, `'नमस्ते'`).

### 5.3. ASR & Speech Synthesis Engines
* **`services/asr_service.py`:**
  * Normalizes Devanagari text (removes trailing nuktas, normalizes whitespace, standardizes matras).
  * Converts audio PCM buffers to Hindi transcripts.
* **`services/audio_generator.py`:**
  * Generates audio waveforms and prompt audio buffers for streaming to the mobile client.

### 5.4. Fluency, Cadence & Cultural Respect Analyzer
* **`services/fluency_scorer.py`:**
  * **`detect_respect_markers(text)`:** Identifies honorific words (`'आप'`, `'नमस्ते'`, `'प्रणाम'`, `'जी'`) vs. informal words (`'तू'`, `'तेरे'`).
  * **`evaluate_spoken_turn(audio_energy, transcript, expected_phrase)`:**
    * Computes phonetic match percentage.
    * Evaluates speech cadence (syllables per second).
    * Calculates respect score (0.0 to 1.0).
    * Generates actionable pedagogical feedback.

### 5.5. REST & WebSocket Routers
* **`routers/evaluation.py`:** Handles `/api/evaluate/answer` for Bollywood and Street Food active recall typing drills.
* **`routers/voice_analysis.py`:** Handles `/api/voice/analyze-turn` and `/api/voice/prompt-metadata`.
* **`routers/websocket_drill.py`:** WebSocket endpoint `/ws/drill/{drill_type}` for low-latency streaming of audio frames and instant evaluation.

---

## 6. API Specifications & Wire Contracts

### 6.1. Active Recall Answer Evaluation
* **Endpoint:** `POST /api/evaluate/answer`
* **Request Payload:**
```json
{
  "drill_type": "BOLLYWOOD",
  "user_text": "दिल",
  "expected_text": "दिल",
  "difficulty": "medium"
}
```
* **Response Payload:**
```json
{
  "is_correct": true,
  "confidence_score": 1.0,
  "xp_awarded": 20,
  "feedback_hindi": "शानदार! बिल्कुल सही उत्तर।",
  "feedback_english": "Splendid! Exact active recall match.",
  "normalized_user_text": "दिल"
}
```

### 6.2. Spoken Turn & Respect Tone Analysis
* **Endpoint:** `POST /api/voice/analyze-turn`
* **Request Payload:**
```json
{
  "drill_type": "NANI_BOSS",
  "transcript": "नमस्ते नानी जी, आप कैसी हैं? मैं कल आ रहा हूँ।",
  "audio_duration_seconds": 3.2,
  "average_db": -18.5
}
```
* **Response Payload:**
```json
{
  "fluency_score": 94,
  "respect_score": 1.0,
  "respect_markers_found": ["नमस्ते", "नानी जी", "आप"],
  "informal_markers_found": [],
  "unlock_golden_diya": true,
  "pedagogical_tip": "Perfect cultural etiquette! Nani gives you her blessings."
}
```

### 6.3. Real-Time WebSocket Streaming
* **Endpoint:** `WS /ws/drill/cricket`
* **Client Frame (JSON or Binary PCM):**
```json
{
  "action": "audio_frame",
  "sequence": 14,
  "data_base64": "..."
}
```
* **Server Response Frame:**
```json
{
  "status": "evaluated",
  "roar_percentage": 92,
  "stadium_reaction": "CHOWKA_CHHAKKA",
  "xp_earned": 30
}
```

---

## 7. Verification, Quality Assurance & Test Matrix

The entire application is covered by unit, integration, and type-safety suites:

| Suite | Technology | Test Files | Total Tests | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Unit & Component** | Jest + React Native Testing Library | 29 suites | **173 tests** | 🟢 **100% Passed** |
| **Frontend Static Type Check** | TypeScript Strict (`tsc --noEmit`) | Entire codebase | 0 errors | 🟢 **100% Clean** |
| **AI Backend Microservice** | Pytest + AnyIO + FastAPI TestClient | 4 test files | **15 tests** | 🟢 **100% Passed** |
| **Total Test Count** | — | **33 suites** | **188 tests** | 🟢 **All Passing** |

---

## 8. Commercial Readiness & Deployment Guide

### Running Locally

#### 1. AI Voice Microservice
```bash
cd bhasha-setu-AI
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
*Swagger docs available at: `http://localhost:8000/docs`*

#### 2. Frontend Mobile App
```bash
cd bhasha-setu-frontend
npm install
npx expo start --web
```
*Interactive web preview available at: `http://localhost:8081`*

### Production Build Commands
- **Android APK / AAB:** `cd bhasha-setu-frontend && npx expo run:android --variant release`
- **Dockerized AI Backend:** `cd bhasha-setu-AI && docker build -t bhasha-setu-ai:latest .`

