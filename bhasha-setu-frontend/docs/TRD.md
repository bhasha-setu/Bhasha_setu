# Bhasha Setu — React Native Frontend Technical Requirements Document (TRD)

* **Project Name:** Bhasha Setu (भाषा सेतु — The Language Bridge)
* **Scope:** Frontend Mobile Application Only (React Native + TypeScript + Expo)
* **Target Aesthetic:** Zen Minimalist Game UI (Warm Cream, Terracotta-Ochre, Sage-Teal, Espresso Typography)
* **Core UX Rule:** $100\%$ Active Recall & Spoken Production ($0\%$ Multiple-Choice Buttons or Word Banks)

---

## 1. Frontend Visual Design System & Tokens (`src/theme/zenTheme.ts`)

All frontend components and screens strictly consume centralized design tokens extracted from the finalized 6-screen UI flow.

### 1.1 Color Tokens
| Token Name | Hex Value | Frontend UI Usage |
| :--- | :--- | :--- |
| `bgCream` | `#FAF6F0` | Primary screen background across all 6 screens |
| `cardWhite` | `#FFFFFF` | Elevated cards (Lyric card, Order card, Incoming WhatsApp bubble) |
| `surfaceSand` | `#F5EBE1` | Secondary pills, keyboard container, Outgoing user voice bubble |
| `surfaceInput` | `#FDF6EE` | Active Devanagari text input box & inner voice player pill |
| `surfaceMint` | `#EBF5F3` | `+35 XP` pill & active fluency badges |
| `terracotta` | `#8C4A08` | Circular mic buttons, audio play buttons, WhatsApp share CTA |
| `ochreAccent` | `#C46215` | Devanagari `अ` in logo, section overlines, progress bar fill |
| `sageTeal` | `#3B9B8E` | Primary action buttons (`Play Quest`, `Check Answer`, `Serve Order`), Latin `A` in logo |
| `espressoText` | `#2C1A0E` | Primary Hindi Devanagari & Latin headings, bridge arch line |
| `mutedBrown` | `#7A6455` | English translation subtexts, timestamps, helper labels |
| `borderWarm` | `#EAE0D5` | $1\text{ px}$ card outlines and dividers |
| `goldStar` | `#F39C12` | $3\text{-Star}$ mastery ratings and streak icons |
| `successGreen` | `#27AE60` | Online status dot, artifact checkmarks, `Respectful Tone ('आप')` text |

### 1.2 Gradients & Progress Fills
* **Loading & Roar Meter Bar Gradient:** Linear horizontal gradient from `#C46215` (Ochre-Terracotta) $\rightarrow$ `#3B9B8E` (Sage-Teal).
* **Border Radius Scale:**
  * `radius.sm`: $8\text{ px}$ (Devanagari keyboard keycaps)
  * `radius.md`: $16\text{ px}$ (Lesson cards, input containers, chat bubbles)
  * `radius.lg`: $22\text{ px}$ (Active quest cards, milestone loot cards)
  * `radius.pill`: $999\text{ px}$ (Primary CTA buttons, audio pills, HUD badges)

---

## 2. Frontend Directory Architecture

The React Native project is organized around modular UI folders inside `src/components/` and frontend networking/hardware adapters inside `src/lib/`.

```text
bhasha-setu-frontend/
├── assets/
│   ├── images/
│   │   ├── logo-bridge-mark.png            # 'अ ⌒ A' bridge over 7-bar waveform
│   │   ├── logo-circle-badge.png           # Circular in-app header badge
│   │   └── nani-avatar.png                 # Boss Level 4 contact avatar
│   └── audio/                              # Local UI sound effects & cached demo audio
│
├── src/
│   ├── components/                         # Reusable UI Component Library
│   │   ├── dashboard/
│   │   │   ├── ActiveRecallHeroCard.tsx    # "100% ACTIVE RECALL" + 4 Artifact icons
│   │   │   ├── RiverCrossingTrail.tsx      # Dashed S-curve path & Stage 3 of 4 header
│   │   │   ├── QuestNodeCard.tsx           # Mastered, Active, and Locked Boss cards
│   │   │   └── MilestoneChestBar.tsx       # "Unlocks at 500 XP (20 XP away)" footer
│   │   │
│   │   ├── menu/
│   │   │   ├── TopScreenBar.tsx            # Back arrow, BHASHA SETU overline, screen title
│   │   │   ├── SubHeaderHUD.tsx            # Circular logo badge, lesson title, XP/Streak pills
│   │   │   ├── BrandLogoBadge.tsx          # Circular 'अ ⌒ A' avatar & 7-bar SoundwaveBars
│   │   │   └── BottomTabBar.tsx            # Quest Map, Artifacts, Profile navigation bar
│   │   │
│   │   ├── buttons/
│   │   │   ├── DockedTealButton.tsx        # Full-width Sage-Teal CTA docked ABOVE keyboard
│   │   │   ├── TerracottaMicButton.tsx     # Circular 64px/48px mic button (Tap / Hold)
│   │   │   ├── AudioSpeedPills.tsx         # "Play melody (0:05)" + "0.75x / 0.8x" pills
│   │   │   └── PublicSilentTogglePill.tsx  # "Can't speak right now? Type instead" button
│   │   │
│   │   ├── inputs/
│   │   │   ├── ActiveDevanagariInput.tsx   # Spoiler-free input field + backspace/cursor
│   │   │   └── DevanagariKeyboard.tsx      # Custom Hindi matra & consonant virtual grid
│   │   │
│   │   └── chat/
│   │       ├── StadiumRoarMeterCard.tsx    # "92% Wankhede Decibels" gauge bar
│   │       ├── LiveVoiceCaptureCard.tsx    # "90% Clear • natural cadence" + 7-bar wave
│   │       ├── DailyFlipBanner.tsx         # "आख़िरी मिनट पर • At the last minute" card
│   │       ├── WhatsAppVoiceBubble.tsx     # Incoming (white) & Outgoing (sand) voice bubbles
│   │       └── GoldenDiyaLootCard.tsx      # Trophy card + "Share Milestone to WhatsApp Status"
│   │
│   ├── lib/                                # Frontend Networking, Socket & Hardware Layer
│   │   ├── api/
│   │   │   ├── client.ts                   # Outbound HTTP requests from UI components
│   │   │   └── server.ts                   # Frontend response normalizers & webhook state listeners
│   │   ├── websockets/
│   │   │   ├── user_services.ts            # Upstream socket emitter (Mic chunks, Barge-in, Text)
│   │   │   └── server_services.ts          # Downstream socket listener (AI audio, Live ASR text)
│   │   └── services/
│   │       ├── audioMeterService.ts        # Client mic decibel & pitch reader for UI animations
│   │       ├── hapticsService.ts           # Tactile vibrations on key press & star unlocks
│   │       ├── offlineCacheService.ts      # MMKV local storage for offline lesson state
│   │       └── shareStatusService.ts       # Captures view shot for WhatsApp Status sharing
│   │
│   ├── screens/                            # The 6 Core App Screens
│   │   ├── SplashLoadingScreen.tsx         # Screen 0: Zen Loading Screen (98% Ready to speak!)
│   │   ├── QuestMapScreen.tsx              # Screen 1: Zen Setu Quest Map (Home)
│   │   ├── BollywoodStudioScreen.tsx       # Screen 2: Zen Bollywood Studio (Lyric Typing)
│   │   ├── CricketCommentaryScreen.tsx     # Screen 3: Zen Cricket Commentary (Voice Drill)
│   │   ├── StreetFoodMasterchefScreen.tsx  # Screen 4: Zen Street Food Masterchef (Order Input)
│   │   └── DiwaliNaniBossScreen.tsx        # Screen 5: Boss Level: Diwali Call With Nani
│   │
│   ├── store/
│   │   └── useFrontendStore.ts             # Zustand state (Active Screen, XP, Streak, Chat History)
│   └── theme/
│       └── zenTheme.ts                     # Centralized colors, spacing, typography
└── App.tsx
```

---

## 3. Screen-by-Screen UI & State Specifications (`src/screens/`)

### 3.1 Screen 0: `SplashLoadingScreen.tsx` (Zen Loading Screen)
* **Visual Layout:**
  * Centered elevated white circle ($190\text{ px} \times 190\text{ px}$) with a $5\text{ px}$ warm sand border (`#F1E6D8`), displaying the `अ ⌒ A` bridge mark, 7-bar soundwave, and `सेतु • BHASHA SETU`.
  * Dual-tone heading: `भाषा सेतु` (`#2C1A0E`) `• Bhasha Setu` (`#C46215`).
  * Subtitle: `The Language Bridge` and tagline: `Connecting Script to Spontaneous Speech`.
  * Center animated `<SoundwaveBars size="lg" />` ($7$ bars).
  * Bottom rounded card (`#F3ECE2`) with spinner icon, `Ready to speak!`, percentage readout (`98%`), and a horizontal gradient progress bar.
* **Frontend State & Transition:**
  * Animates progress from $0\% \rightarrow 100\%$ while preloading custom fonts and cached audio assets, then automatically navigates to `QuestMapScreen`.

### 3.2 Screen 1: `QuestMapScreen.tsx` (1. Zen Setu Quest Map)
* **Visual Layout:**
  * **Top Bar:** Mini circular badge, `BHASHA SETU / Zen Setu Quest Map`, and right streak pill (`🔥 7`).
  * **Sub-HUD Row:** Circular `अ ⌒ A` badge, `BHASHA SETU / Quest Map`, `🔥 7d Streak` pill, and `⚡ 480 XP` pill.
  * **Hero Card (`ActiveRecallHeroCard.tsx`):**
    * Teal header badge: `● 100% ACTIVE RECALL`.
    * Body copy: *"Bridge from script to spontaneous speech. Craft complete Hindi thoughts natively."*
    * **Artifact Shelf ($4$ items):** `Vintage Mic` (unlocked ✓), `Cricket Ball` (unlocked ✓), `Chai Kulhad` (unlocked ✓), and `Golden Diya` (locked 🔒).
  * **Trail Section (`The River Crossing Path • Stage 3 of 4`):**
    1. **Level 1 Card:** `LEVEL 1 • MASTERED` (`★ ★ ★`), `Zen Bollywood Studio`, *"Dialogue & Spontaneous Enunciation"*.
    2. **Level 2 Card (Indented Right):** `LEVEL 2 • MASTERED` (`★ ★ ★`), `Zen Cricket Commentary`, *"Fast-Action Sentence Framing"*.
    3. **Level 3 Active Card (Highlighted Teal Border):** `ACTIVE QUEST • NOW PLAYING` (`+50 XP`), `Level 3: Street Food Masterchef`, *"Order authentic chaat and negotiate portions using zero English crutches"*, and a full-width Sage-Teal CTA button: `Play Quest • +50 XP →`.
    4. **Boss Quest Card:** `BOSS QUEST • FINAL BRIDGE` (`🔒 Locked`), `Diwali WhatsApp Call with Nani`, *"Master 3-Minute Live Dialogue Flow"*.
  * **Footer:** `Milestone Chest — Unlocks at 500 XP (20 XP away)` and bottom 3-tab bar (`Quest Map`, `Artifacts`, `Profile`).

### 3.3 Screen 2: `BollywoodStudioScreen.tsx` (2. Zen Bollywood Studio)
* **Visual Layout:**
  * **Top Bar & HUD:** Back arrow, `Zen Bollywood Studio`, circular `अ ⌒ A` badge, `Lesson 1 • Bollywood Lyrics (2 of 3)`, `🔥 +20 XP • 2x Combo` pill, and a $66\%$ terracotta progress bar.
  * **Lyric Prompt Card:**
    * Top audio row: `🔊 Play melody (0:05)` pill, `🐢 0.75x` slow toggle pill, and `🎵 1976 CLASSIC` label.
    * Center Devanagari verse: `कभी कभी मेरे _ _ _ _ _ _ _ में ख़्याल आता है`.
    * Italic English translation: `"Sometimes a thought comes into my [blank]"`.
    * Hint toggle: `💡 Show hint` (reveals phonetic clue without auto-filling the answer).
  * **Input Section:** `ACTIVE DEVANAGARI INPUT` card with rounded input box (`Type missing word...`).
  * **Docked Action & Keyboard:**
    * Full-width Sage-Teal button `Check Answer • +20 XP →` positioned **strictly above** `<DevanagariKeyboard />`.
    * Custom 4-row Devanagari keyboard (`ि, ी, ु, ू, े, ै, ा, ं, ्` + consonants + `स्पेस (Space)` + `⌫`).

### 3.4 Screen 3: `CricketCommentaryScreen.tsx` (3. Zen Cricket Commentary)
* **Visual Layout:**
  * **Top Bar & HUD:** Back arrow, `Zen Cricket Commentary`, circular `अ ⌒ A` badge, `LIVE HINDI VOICE DRILL / Cricket Commentary`, and `👑 Over 19.6` pill.
  * **Stadium Roar Meter Card:**
    * Header: `📊 Stadium Roar Meter` and `92% Wankhede Decibels`.
    * Gradient progress bar ($92\%$ filled) with sub-labels `Gully Whispers` and `Match-Winning Decibels 🔥`.
  * **Center Commentary Prompt:**
    * Pill badge: `MATCH THRILLER • FINAL BALL`.
    * Large Devanagari text: `आख़िरी गेंद पर शानदार छक्का!` and romanized subtext `"Aakhiri gend par shaandaar chhakka!"`.
    * Audio button: `🔊 Listen pronunciation`.
  * **Daily Flip Banner:** `💡 Daily Flip` — `"आख़िरी मिनट पर" • At the last minute`.
  * **Live Voice Capture Card:**
    * Top status: `● 90% Clear • natural cadence` and `+35 XP` mint badge.
    * Center 7-bar terracotta-and-teal voice waveform.
    * Captured speech box: `“...गेंद पर शानदार छक्का!”` (with `छक्का!` highlighted in Sage-Teal) and subtitle `Microphone detected pitch: Crisp & Exuberant`.
  * **Bottom Controls:**
    * Circular terracotta mic button ($64\text{ px}$), `Tap to speak`, subtitle `Hold cadence steady like Ravi Shastri`.
    * Public fallback pill: `⌨️ Can't speak right now? Type instead`.

### 3.5 Screen 4: `StreetFoodMasterchefScreen.tsx` (4. Zen Street Food Masterchef)
* **Visual Layout:**
  * **Top Bar & Sub-bar:** Back arrow, `Zen Street Food Masterchef`, `🍴 Street Food Kitchen • Order 3 of 5`, `🔥 Streak: 3` pill, and $60\%$ progress bar.
  * **Location Banner:** Circular `अ ⌒ A` badge, `CUSTOMER AT COUNTER / Pani Puri Cart • Old Delhi`, and stall icon.
  * **Customer Request Card (Spoiler-Free):**
    * Label: `Listen to the customer's request`.
    * Large circular terracotta speaker button ($52\text{ px}$) paired with a `🐢 0.8x` slow toggle pill.
    * Hindi prompt sentence with an **unspoiled blank box**: `भैया, पानी पूरी थोड़ा [ _ _ _ _ _ ] और कम मीठा बनाना।`
    * English subtext: `"Make the Pani Puri a little [spicy] and less sweet."`
  * **Active Devanagari Input Card:** Displays user-typed characters (`तीखा|`) with an inline backspace icon (`⌫`).
  * **Docked Action & Keyboard:**
    * Full-width Sage-Teal button `Serve Order →` docked **strictly above** the Devanagari keyboard (`देवनागरी कीबोर्ड` / `हिन्दी इनपुट` header + key grid + `Space` + `Clear`).

### 3.6 Screen 5: `DiwaliNaniBossScreen.tsx` (5. Boss Level: Diwali Call with Nani)
* **Visual Layout:**
  * **Top Bar & Contact Header:** Back arrow, `Boss Level: Diwali Call With Nani`. Below it, a white contact card with Nani's circular avatar + green online dot, `नानी (Nani)` + `Live` badge, `Powered by Bolna Voice AI`, and the circular `अ ⌒ A` badge.
  * **Sub-Banner:** `🏠 Boss Level: Diwali Phone Call with Nani` (`★ ★ ★`).
  * **WhatsApp-Style Voice Chat Canvas:**
    1. **Incoming Bubble #1 (Left, White Card):** Brown play button, 7-bar waveform, `0:04`, Devanagari transcript `“नमस्ते बेटा! दिवाली की बहुत-बहुत शुभकामनाएँ। घर कब आ रहे हो?”`, English subtext, `10:14 AM`.
    2. **Outgoing User Bubble #2 (Right, Warm Sand Card):** Teal play button, 7-bar waveform, `0:05`, Devanagari transcript `“नमस्ते नानी! मैं कल सुबह मिठाई लेकर आ रहा हूँ।”`, English subtext, inner white pill `✓✓ 96% Natural Fl... | Respectful Tone ('आप')`, and `10:15 AM ✓✓`.
    3. **Incoming Bubble #3 (Left, White Card):** `“वाह! मैं तुम्हारी मनपसंद खीर बना के रखूँगी। 🪔”`, English subtext `"Wonderful! I will prepare your favorite kheer."`, `10:15 AM`.
  * **Golden Diya Milestone Card:**
    * Trophy icon, `Golden Diya Unlocked!`, `+100 Cultural XP • Conversational Mastery`.
    * Full-width terracotta pill button: `🔗 Share Milestone to WhatsApp Status`.
    * Next Quest teaser row: `Next Quest: Bargaining at Jaipur Bazaar →`.
  * **Bottom Chat Input Bar:** White pill input (`😊 Type or hold mic to speak H... 📎`) + circular terracotta mic button ($48\text{ px}$).

---

## 4. Frontend `src/lib/` Specification (`api/`, `websockets/`, `services/`)

Even in a frontend-only codebase, `src/lib/` is divided into `api/client.ts`, `api/server.ts`, `websockets/user_services.ts`, and `websockets/server_services.ts` so UI components never manage raw network payloads or audio buffers directly.

### 4.1 `src/lib/api/client.ts` (Outbound UI Requests)
```typescript
// src/lib/api/client.ts
export const ApiClient = {
  // Evaluates typed Devanagari answers on Screen 2 (दिल) & Screen 4 (तीखा)
  async checkDevanagariAnswer(levelId: string, typedWord: string, expectedWord: string) {
    const isNormalizedMatch = typedWord.trim() === expectedWord.trim();
    return {
      isCorrect: isNormalizedMatch,
      xpAwarded: levelId === 'BOLLYWOOD' ? 20 : 50,
      comboMultiplier: 2,
    };
  },

  // Requests audio playback URL or plays local cached asset at 1.0x / 0.75x / 0.8x
  async playPromptAudio(clipId: string, speed: 1.0 | 0.8 | 0.75 = 1.0) {
    return { clipId, playbackRate: speed, status: 'playing' };
  },

  // Initiates Bolna Voice AI session for Screen 3 & Screen 5
  async initBolnaClientSession(agentKey: 'CRICKET_AGENT' | 'NANI_BOSS_AGENT') {
    return {
      sessionId: `session_${Date.now()}`,
      wsEndpoint: `wss://api.bolna.ai/v1/ws?agent=${agentKey}`,
    };
  },
};
```

### 4.2 `src/lib/api/server.ts` (Frontend Response Normalizer & Mock/Webhook Adapter)
Formats incoming server/extraction payloads into ready-to-render React Native UI state props for Screen 5's fluency badges and loot cards.

```typescript
// src/lib/api/server.ts
export interface RawServerEvaluation {
  fluency_score: number;
  respect_marker_used: string | null;
  unlocked_artifact_id: string | null;
}

export const ApiServerAdapter = {
  formatVoiceTurnFeedback(raw: RawServerEvaluation) {
    return {
      fluencyLabel: `✓✓ ${raw.fluency_score}% Natural Fluency`,
      respectLabel: raw.respect_marker_used
        ? `Respectful Tone ('${raw.respect_marker_used}')`
        : null,
      isGoldenDiyaUnlocked: raw.fluency_score >= 85,
      xpEarned: raw.fluency_score >= 85 ? 100 : 50,
    };
  },
};
```

### 4.3 `src/lib/websockets/user_services.ts` (Upstream UI $\rightarrow$ Socket Emitter)
Called by `<TerracottaMicButton />` and `<PublicSilentTogglePill />` when the user speaks or types.

```typescript
// src/lib/websockets/user_services.ts
import { bindServerSocketEvents, DownstreamUIHandlers } from './server_services';

class UserSocketServices {
  private ws: WebSocket | null = null;

  connect(wsUrl: string, uiHandlers: DownstreamUIHandlers) {
    this.ws = new WebSocket(wsUrl);
    bindServerSocketEvents(this.ws, uiHandlers);
  }

  // Emits 16kHz base64 PCM audio chunks while mic button is active
  emitUserMicChunk(base64Chunk: string, decibels: number) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event: 'user_audio', data: base64Chunk, db: decibels }));
    }
  }

  // Emits text when user taps "Can't speak right now? Type instead"
  emitSilentTextTurn(hindiText: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event: 'user_text', text: hindiText }));
    }
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
  }
}

export const userSocketService = new UserSocketServices();
```

### 4.4 `src/lib/websockets/server_services.ts` (Downstream Socket $\rightarrow$ UI State Listener)
Updates the live green-ink Devanagari words on Screen 3 (`“...गेंद पर शानदार छक्का!”`) and appends Nani's voice bubbles on Screen 5.

```typescript
// src/lib/websockets/server_services.ts
export interface DownstreamUIHandlers {
  onLiveTranscriptUpdate: (partialHindi: string, clarityPercent: number) => void;
  onIncomingVoiceBubble: ( bubble: {
    id: string;
    hindiText: string;
    englishText: string;
    duration: string;
    timestamp: string;
  }) => void;
}

export function bindServerSocketEvents(ws: WebSocket, handlers: DownstreamUIHandlers) {
  ws.onmessage = (e: WebSocketMessageEvent) => {
    try {
      const msg = JSON.parse(e.data);
      if (msg.event === 'asr_partial') {
        handlers.onLiveTranscriptUpdate(msg.text_hi, msg.clarity_percent || 90);
      } else if (msg.event === 'ai_voice_note') {
        handlers.onIncomingVoiceBubble({
          id: String(Date.now()),
          hindiText: msg.text_hi,
          englishText: msg.text_en,
          duration: msg.duration || '0:04',
          timestamp: msg.timestamp || '10:15 AM',
        });
      }
    } catch {
      // Ignore malformed non-JSON frames
    }
  };
}
```

### 4.5 Frontend Device Services (`src/lib/services/`)
* **`audioMeterService.ts`:** Computes real-time microphone amplitude to drive the 7-bar `<SoundwaveBars />` heights and the $0\% \rightarrow 92\%$ **Stadium Roar Meter** width animation.
* **`hapticsService.ts`:** Wraps `expo-haptics` to trigger a light keycap tap on every `<DevanagariKeyboard />` press and a success vibration when unlocking the **Golden Diya**.
* **`offlineCacheService.ts`:** MMKV local storage for offline lesson state.
* **`shareStatusService.ts`:** Uses `react-native-view-shot` to snapshot `<GoldenDiyaLootCard />` and open the native WhatsApp Status share sheet.

---

## 5. Frontend Component Props Contract (`src/components/`)

| Component | File Path | Required Props |
| :--- | :--- | :--- |
| `<BrandLogoBadge />` | `components/menu/BrandLogoBadge.tsx` | `size?: number` (default $40\text{ px}$) |
| `<SoundwaveBars />` | `components/menu/BrandLogoBadge.tsx` | `size?: 'sm' \| 'lg'`, `isAnimating?: boolean` |
| `<DevanagariKeyboard />` | `components/inputs/DevanagariKeyboard.tsx` | `ctaLabel: string`, `onKeyPress: (ch: string) => void`, `onBackspace: () => void`, `onClear?: () => void`, `onSubmit: () => void` |
| `<StadiumRoarMeterCard />` | `components/chat/StadiumRoarMeterCard.tsx` | `decibelPercent: number` (e.g., $92$) |
| `<WhatsAppVoiceBubble />` | `components/chat/WhatsAppVoiceBubble.tsx` | `sender: 'nani' \| 'user'`, `duration: string`, `hindiText: string`, `englishSubtext: string`, `fluencyScore?: number`, `respectWord?: string`, `timestamp: string` |

