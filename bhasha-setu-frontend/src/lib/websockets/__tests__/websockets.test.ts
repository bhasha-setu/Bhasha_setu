// src/lib/websockets/__tests__/websockets.test.ts
import { userSocketService } from '../user_services';
import { bindServerSocketEvents, DownstreamUIHandlers } from '../server_services';

class MockWebSocket {
  static OPEN = 1;
  readyState = MockWebSocket.OPEN;
  onmessage: ((event: any) => void) | null = null;
  send = jest.fn();
  close = jest.fn();
}

(global as any).WebSocket = MockWebSocket;

describe('Websockets Layer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userSocketService.disconnect();
  });

  it('connects and binds handlers to mock websocket', () => {
    const handlers: DownstreamUIHandlers = {
      onLiveTranscriptUpdate: jest.fn(),
      onIncomingVoiceBubble: jest.fn(),
    };

    userSocketService.connect('wss://test.bolna.ai/socket', handlers);
    expect(userSocketService).toBeDefined();
  });

  it('emitUserMicChunk sends json payload with user_audio, data, and db', () => {
    const handlers: DownstreamUIHandlers = {
      onLiveTranscriptUpdate: jest.fn(),
      onIncomingVoiceBubble: jest.fn(),
    };

    userSocketService.connect('wss://test.bolna.ai/socket', handlers);
    userSocketService.emitUserMicChunk('base64audiochunk', 88);

    const wsInstance = (userSocketService as any).ws;
    expect(wsInstance.send).toHaveBeenCalledTimes(1);

    const payload = JSON.parse(wsInstance.send.mock.calls[0][0]);
    expect(payload.event).toBe('user_audio');
    expect(payload.data).toBe('base64audiochunk');
    expect(payload.db).toBe(88);
  });

  it('emitSilentTextTurn sends json payload with user_text', () => {
    const handlers: DownstreamUIHandlers = {
      onLiveTranscriptUpdate: jest.fn(),
      onIncomingVoiceBubble: jest.fn(),
    };

    userSocketService.connect('wss://test.bolna.ai/socket', handlers);
    userSocketService.emitSilentTextTurn('नमस्ते नानी');

    const wsInstance = (userSocketService as any).ws;
    expect(wsInstance.send).toHaveBeenCalledTimes(1);

    const payload = JSON.parse(wsInstance.send.mock.calls[0][0]);
    expect(payload.event).toBe('user_text');
    expect(payload.text).toBe('नमस्ते नानी');
  });

  it('bindServerSocketEvents routes asr_partial event to onLiveTranscriptUpdate', () => {
    const mockWs = new MockWebSocket();
    const handlers: DownstreamUIHandlers = {
      onLiveTranscriptUpdate: jest.fn(),
      onIncomingVoiceBubble: jest.fn(),
    };

    bindServerSocketEvents(mockWs as any, handlers);

    const event = {
      data: JSON.stringify({
        event: 'asr_partial',
        text_hi: 'शानदार छक्का!',
        clarity_percent: 94,
      }),
    };

    mockWs.onmessage!(event);

    expect(handlers.onLiveTranscriptUpdate).toHaveBeenCalledWith('शानदार छक्का!', 94);
  });

  it('bindServerSocketEvents routes ai_voice_note event to onIncomingVoiceBubble', () => {
    const mockWs = new MockWebSocket();
    const handlers: DownstreamUIHandlers = {
      onLiveTranscriptUpdate: jest.fn(),
      onIncomingVoiceBubble: jest.fn(),
    };

    bindServerSocketEvents(mockWs as any, handlers);

    const event = {
      data: JSON.stringify({
        event: 'ai_voice_note',
        text_hi: 'नमस्ते बेटा!',
        text_en: 'Greetings son!',
        duration: '0:04',
        timestamp: '10:14 AM',
      }),
    };

    mockWs.onmessage!(event);

    expect(handlers.onIncomingVoiceBubble).toHaveBeenCalledWith(
      expect.objectContaining({
        hindiText: 'नमस्ते बेटा!',
        englishText: 'Greetings son!',
        duration: '0:04',
        timestamp: '10:14 AM',
      })
    );
  });

  it('safely handles non-JSON frames without throwing', () => {
    const mockWs = new MockWebSocket();
    const handlers: DownstreamUIHandlers = {
      onLiveTranscriptUpdate: jest.fn(),
      onIncomingVoiceBubble: jest.fn(),
    };

    bindServerSocketEvents(mockWs as any, handlers);

    expect(() => {
      mockWs.onmessage!({ data: 'NON-JSON PING FRAME' });
    }).not.toThrow();
  });
});
