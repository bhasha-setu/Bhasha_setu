// src/lib/websockets/user_services.ts
import { bindServerSocketEvents, DownstreamUIHandlers } from './server_services';
import { WS_BASE_URL, DEFAULT_USER_ID } from '../api/client';

class UserSocketServices {
  private ws: WebSocket | null = null;
  private currentUrl: string | null = null;
  private handlers: DownstreamUIHandlers | null = null;

  connect(
    wsUrl = `${WS_BASE_URL}?agent=CRICKET_AGENT&userId=${DEFAULT_USER_ID}`,
    uiHandlers: DownstreamUIHandlers
  ) {
    this.currentUrl = wsUrl;
    this.handlers = uiHandlers;
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

  // Emits real-time stadium roar audio frame
  emitAudioFrame(sequence: number, decibels: number) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ action: 'audio_frame', sequence, db: decibels }));
    }
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
    this.currentUrl = null;
    this.handlers = null;
  }
}

export const userSocketService = new UserSocketServices();
