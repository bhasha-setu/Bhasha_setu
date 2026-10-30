"""WebSocket Router: Real-time Audio Streaming & Bolna Voice AI Agent Drills."""
import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from agents.cricket_agent import CricketAgent
from agents.nani_agent import NaniAgent
from services.asr_service import ASRService

router = APIRouter(prefix="/ws", tags=["Realtime Sockets"])

cricket_agent = CricketAgent()
nani_agent = NaniAgent()


@router.websocket("/drill")
async def websocket_drill_endpoint(websocket: WebSocket, agent: str = "CRICKET_AGENT"):
    """Handles bidirectional voice note streaming between the mobile client and Bolna Voice AI."""
    await websocket.accept()

    active_agent = cricket_agent if agent == "CRICKET_AGENT" else nani_agent

    try:
        while True:
            raw_data = await websocket.receive_text()
            try:
                msg = json.loads(raw_data)
            except json.JSONDecodeError:
                continue

            event_type = msg.get("event")

            # Handle user streaming mic audio chunk
            if event_type == "user_audio":
                audio_b64 = msg.get("data", "")
                db = float(msg.get("db", 85.0))
                asr_result = ASRService.transcribe_audio_chunk(audio_b64, db)

                # Stream partial ASR back to frontend (drives live waveform)
                await websocket.send_text(
                    json.dumps({
                        "event": "asr_partial",
                        "text_hi": "शानदार छक्का!",
                        "clarity_percent": asr_result["clarity_percent"],
                    })
                )

            # Handle silent text fallback ("Can't speak right now? Type instead")
            elif event_type == "user_text":
                user_text = msg.get("text", "")
                turn_result = active_agent.process_turn(user_text)

                # Return response note (Nani bubble or commentary feedback)
                if agent == "NANI_BOSS_AGENT":
                    reply = turn_result.get("reply_voice_note", {})
                    await websocket.send_text(
                        json.dumps({
                            "event": "ai_voice_note",
                            "text_hi": reply.get("text_hi", ""),
                            "text_en": reply.get("text_en", ""),
                            "duration": reply.get("duration", "0:04"),
                            "timestamp": reply.get("timestamp", "10:15 AM"),
                        })
                    )
                else:
                    await websocket.send_text(
                        json.dumps({
                            "event": "asr_partial",
                            "text_hi": user_text,
                            "clarity_percent": turn_result.get("clarity_percent", 90),
                        })
                    )

    except WebSocketDisconnect:
        pass
