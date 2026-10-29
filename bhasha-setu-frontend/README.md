# 🌉 Bhasha Setu (भाषा सेतु) — Frontend Mobile App

> **The Language Bridge: Connecting Script to Spontaneous Speech**  
> *A Zen-minimalist Indian voice & active-recall language learning game built with React Native, TypeScript, and Expo SDK 58.*

---

## 📖 Overview

**Bhasha Setu (भाषा सेतु)** is an Android-first mobile application designed to bridge the gap between knowing Hindi script and speaking spontaneously in real-world Indian cultural settings.

### 🎯 Core UX Philosophy
* **100% Active Recall & Spoken Production:** $0\%$ multiple-choice guessing buttons, $0\%$ passive word banks.
* **Target Aesthetic:** Zen Minimalist Game UI — Warm Cream background, Terracotta & Ochre accents, Sage-Teal primary actions, and deep Espresso typography.

---

## 📱 The 6 Core Screen Flows

### 1. Screen 0 — Zen Loading & Brand Bridge (`SplashLoadingScreen.tsx`)
* Centered elevated white disc ($190\text{px} \times 190\text{px}$) with the signature **`अ ⌒ A`** bridge mark over 7-bar soundwaves.
* Dual-tone typography: **भाषा सेतु • Bhasha Setu**.
* Smooth $0\% \rightarrow 100\%$ preloading animation with live decibel-driven soundwave bouncing.

### 2. Screen 1 — Zen Setu Quest Map (`QuestMapScreen.tsx`)
* **Live HUD:** Shows continuous streaks (`🔥 7d Streak`) and experience points (`⚡ 480 XP`).
* **Active Recall Hero Card:** Features the **4-Artifact Shelf**:
  * 🎙️ `Vintage Mic` (Unlocked ✓ — Bollywood Studio)
  * 🏏 `Cricket Ball` (Unlocked ✓ — Cricket Commentary)
  * ☕ `Chai Kulhad` (Unlocked ✓ — Street Food Masterchef)
  * 🪔 `Golden Diya` (Locked 🔒 — Diwali Nani Boss Call)
* **The River Crossing Path Trail:**
  * **Level 1 (🎬 Mastered ★★★):** *Zen Bollywood Studio* (Dialogue & Enunciation).
  * **Level 2 (🏏 Mastered ★★★, Indented Right):** *Zen Cricket Commentary* (Fast-Action Sentence Framing).
  * **Level 3 (🍲 Active Playing):** *Street Food Masterchef* highlighted in Sage-Teal with `Play Quest • +50 XP →`.
  * **Boss Quest (🔒 Final Bridge):** *Diwali WhatsApp Call with Nani* (3-minute live dialogue flow).
* **Milestone Chest Bar:** Track progress towards $500\text{ XP}$ loot chests.
* **Bottom Tab Bar:** 3-tab navigation (`🧭 Quest Map`, `✨ Artifacts`, `👤 Profile`).

### 3. Screen 2 — Zen Bollywood Studio (`BollywoodStudioScreen.tsx`)
* **Prompt Card:** Plays 1976 classic melody (`0:05`, $0.75\times$ speed toggle).
* **Fill-in-the-Blank:** $\text{कभी कभी मेरे [ \_\_\_\_\_\_\_ ] में ख़्याल आता है}$ (*"Sometimes a thought comes into my [blank]"*).
* **Active Recall Input:** Type the missing word **`दिल`** using the custom virtual keyboard.
* **Docked CTA:** `Check Answer • +20 XP →` docked strictly above the keyboard with phonetic hint toggle.

### 4. Screen 3 — Zen Cricket Commentary (`CricketCommentaryScreen.tsx`)
* **Stadium Roar Meter:** Live gauge bar measuring $92\%$ Wankhede Decibels with a terracotta-to-teal linear gradient.
* **Fast-Paced Drill:** Match thriller commentary prompt: $\text{आख़िरी गेंद पर शानदार छक्का!}$ (*"Aakhiri gend par shaandaar chhakka!"*).
* **Daily Flip Idiom:** 📍 *"आख़िरी मिनट पर" • At the last minute*.
* **Live Voice Capture:** $90\%$ clarity badge, 7-bar animated waveform, captured quote, and detected pitch readout (*"Crisp & Exuberant"*).
* **Spoken & Silent Controls:** $64\text{px}$ circular terracotta microphone button (tap/hold) paired with a public silent fallback toggle (`⌨️ Can't speak right now? Type instead`).

### 5. Screen 4 — Zen Street Food Masterchef (`StreetFoodMasterchefScreen.tsx`)
* **Counter Banner:** $\text{Pani Puri Cart • Old Delhi}$ 🏪 with order tracker.
* **Spoiler-Free Request:** $52\text{px}$ terracotta speaker button with $0.8\times$ slow toggle: $\text{भैया, पानी पूरी थोड़ा [ \_\_\_\_\_ ] और कम मीठा बनाना।}$.
* **Devanagari Typing:** Active input for **`तीखा`** with inline backspace `⌫`.
* **Docked CTA:** `Serve Order →` placed directly above the dedicated Hindi consonant & matra keyboard.

### 6. Screen 5 — Boss Level: Diwali Call with Nani (`DiwaliNaniBossScreen.tsx`)
* **WhatsApp Voice Canvas:** Live audio conversation powered by Bolna Voice AI simulation.
  * **Turn 1 (Nani):** $\text{“नमस्ते बेटा! दिवाली की बहुत-बहुत शुभकामनाएँ। घर कब आ रहे हो?”}$
  * **Turn 2 (User):** $\text{“नमस्ते नानी! मैं कल सुबह मिठाई लेकर आ रहा हूँ।”}$ with detailed fluency metrics: `✓✓ 96% Natural Fluency | Respectful Tone ('आप')`.
  * **Turn 3 (Nani):** $\text{“वाह! मैं तुम्हारी मनपसंद खीर बना के रखूँगी। 🪔”}$.
* **Golden Diya Loot Card:** Celebratory victory card awarding $+100\text{ Cultural XP}$ with native WhatsApp Status sharing.
* **Bottom Chat Bar:** Pill input with emoji + $48\text{px}$ mic button.

---

## 🎨 Visual Design Tokens (`src/theme/zenTheme.ts`)

| Token Name | Hex Value | Usage |
| :--- | :--- | :--- |
| `bgCream` | `#FAF6F0` | Warm cream screen background |
| `cardWhite` | `#FFFFFF` | Elevated prompt and chat cards |
| `surfaceSand` | `#F5EBE1` | Keyboard container, outgoing chat bubbles, secondary pills |
| `surfaceInput` | `#FDF6EE` | Active Devanagari input containers |
| `surfaceMint` | `#EBF5F3` | XP reward pills, clarity badges |
| `terracotta` | `#8C4A08` | Microphone buttons, audio play buttons, streak markers |
| `ochreAccent` | `#C46215` | Logo Devanagari `अ`, section overlines, progress indicators |
| `sageTeal` | `#3B9B8E` | Primary action CTA buttons, logo Latin `A`, active borders |
| `espressoText` | `#2C1A0E` | Headings, primary Hindi text, bridge arch |
| `mutedBrown` | `#7A6455` | English translations, timestamps, subtitles |
| `borderWarm` | `#EAE0D5` | $1\text{px}$ dividers and card outlines |
| `goldStar` | `#F39C12` | $3\text{-Star}$ mastery ratings |
| `successGreen` | `#27AE60` | Online status dot, artifact checkmarks, respectful tone badges |

---

## 🛠️ Architecture & Directory Structure

```text
bhasha-setu-frontend/
├── assets/
│   ├── images/
│   │   ├── logo-bridge-mark.png         # 'अ ⌒ A' bridge over 7-bar waveform
│   │   ├── logo-circle-badge.png        # Circular in-app header badge
│   │   └── nani-avatar.png              # Boss Level contact avatar
│   └── audio/                           # Audio sound effects & clips
│
├── src/
│   ├── app/                             # Expo Router file-based routes
│   │   ├── _layout.tsx                  # Stack navigation wrapper
│   │   ├── index.tsx                    # SplashLoadingScreen route
│   │   ├── quest-map.tsx                # QuestMapScreen route
│   │   ├── bollywood-studio.tsx         # BollywoodStudioScreen route
│   │   ├── cricket-commentary.tsx       # CricketCommentaryScreen route
│   │   ├── street-food.tsx              # StreetFoodMasterchefScreen route
│   │   └── diwali-nani-boss.tsx         # DiwaliNaniBossScreen route
│   │
│   ├── components/                      # Modular UI Component Library
│   │   ├── buttons/
│   │   │   ├── DockedTealButton.tsx     # Full-width Sage-Teal CTA button
│   │   │   ├── TerracottaMicButton.tsx  # Circular 64px / 48px mic button with ripple
│   │   │   ├── AudioSpeedPills.tsx      # Audio player with 0.75x / 0.8x / 1.0x toggles
│   │   │   └── PublicSilentTogglePill.tsx# "Can't speak right now? Type instead"
│   │   │
│   │   ├── chat/
│   │   │   ├── StadiumRoarMeterCard.tsx # 92% Wankhede Decibels gradient gauge
│   │   │   ├── LiveVoiceCaptureCard.tsx # 7-bar animated wave + pitch analysis
│   │   │   ├── DailyFlipBanner.tsx      # Cultural idiom banner
│   │   │   ├── WhatsAppVoiceBubble.tsx  # WhatsApp audio player bubble
│   │   │   └── GoldenDiyaLootCard.tsx   # Milestone trophy card with status sharing
│   │   │
│   │   ├── dashboard/
│   │   │   ├── ActiveRecallHeroCard.tsx # 100% Active Recall card + 4-item shelf
│   │   │   ├── RiverCrossingTrail.tsx   # S-curve river crossing path header
│   │   │   ├── QuestNodeCard.tsx        # Mastered, Active, and Locked quest cards
│   │   │   └── MilestoneChestBar.tsx    # 500 XP milestone bar
│   │   │
│   │   ├── inputs/
│   │   │   ├── ActiveDevanagariInput.tsx# Input box with blinking cursor and backspace
│   │   │   └── DevanagariKeyboard.tsx   # Custom 4-row Hindi virtual keyboard
│   │   │
│   │   └── menu/
│   │       ├── BrandLogoBadge.tsx       # Circular logo badge & 7-bar SoundwaveBars
│   │       ├── TopScreenBar.tsx         # Top bar with back navigation & avatars
│   │       ├── SubHeaderHUD.tsx         # Lesson titles, streak pills, XP badges
│   │       └── BottomTabBar.tsx         # 3-tab navigation (Quest Map, Artifacts, Profile)
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts                # Outbound answer checking & audio sessions
│   │   │   └── server.ts                # Turn feedback & fluency normalizers
│   │   ├── services/
│   │   │   ├── audioMeterService.ts     # Amplitude meter & 7-bar wave generator
│   │   │   ├── hapticsService.ts        # Expo Haptics on keypress & victory unlocks
│   │   │   ├── offlineCacheService.ts   # Persistent lesson progress cache
│   │   │   └── shareStatusService.ts    # ViewShot & native WhatsApp sharing
│   │   └── websockets/
│   │       ├── user_services.ts         # Upstream audio chunk & text emitter
│   │       └── server_services.ts       # Downstream ASR transcript & audio listener
│   │
│   ├── screens/                         # The 6 finalized screen views
│   ├── store/
│   │   └── useFrontendStore.ts          # Zustand state (XP, streaks, chat history)
│   └── theme/
│       └── zenTheme.ts                  # Centralized color tokens, spacing & radius
│
├── app.json                             # Android package: com.bhashasetu.app
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v20+ recommended)
* [Expo Go](https://expo.dev/go) on an Android phone, or Android Studio / Emulator

### 1. Install Dependencies
```bash
cd bhasha-setu-frontend
npm install
```

### 2. Start the Development Server
```bash
npx expo start
```

* **On Android Device:** Open the **Expo Go** app and scan the QR code displayed in the terminal.
* **On Android Emulator:** Press `a` in the terminal to launch directly on your emulator.

### 3. Run Typecheck
```bash
npx tsc --noEmit
```

---

## ⚡ Tech Stack

* **Framework:** [React Native](https://reactnative.dev/) (v0.88.1)
* **SDK:** [Expo](https://expo.dev/) (v58.0.21) + [Expo Router](https://docs.expo.dev/router/introduction/) (v58.0.28)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand)
* **Animations & Visuals:** `react-native-reanimated`, `expo-linear-gradient`, `react-native-svg`
* **Hardware & Audio:** `expo-audio`, `expo-haptics`, `react-native-view-shot`, `expo-sharing`
