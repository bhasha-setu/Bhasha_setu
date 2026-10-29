// src/lib/websockets/server_services.ts
export interface DownstreamUIHandlers {
  onLiveTranscriptUpdate: (partialHindi: string, clarityPercent: number) => void;
  onIncomingVoiceBubble: (bubble: {
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

