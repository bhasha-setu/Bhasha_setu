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

