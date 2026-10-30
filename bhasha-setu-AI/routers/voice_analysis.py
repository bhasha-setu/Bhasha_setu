"""API Router: Voice Drill & Acoustic Analysis."""
from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional
from services.fluency_scorer import FluencyScorer
from services.audio_generator import AudioGenerator

router = APIRouter(prefix="/api/voice", tags=["Voice Analysis"])


class VoiceTurnRequest(BaseModel):
    spoken_text: str = Field(..., description="Captured Hindi speech transcript")
    target_concept: Optional[str] = "Hindi Fluency Drill"
    decibels: float = Field(85.0, description="Acoustic decibels detected")
    pitch_hz: float = Field(220.0, description="Fundamental pitch in Hertz")


class VoiceTurnResponse(BaseModel):
    fluency_score: int
    respect_marker_used: Optional[str]
    unlocked_artifact_id: Optional[str]
    xp_awarded: int
    is_golden_diya_unlocked: bool
    feedback_summary: str
    cadence_label: str


@router.post("/evaluate-turn", response_model=VoiceTurnResponse)
def evaluate_voice_turn(req: VoiceTurnRequest):
    """Calculates fluency score, cadence, and cultural respect for a spoken voice turn."""
    result = FluencyScorer.evaluate_spoken_turn(
        spoken_text=req.spoken_text,
        target_concept=req.target_concept or "",
        decibels=req.decibels,
        pitch_hz=req.pitch_hz,
    )
    return VoiceTurnResponse(**result)


@router.get("/prompt-metadata/{clip_id}")
def get_prompt_audio_metadata(clip_id: str, speed: float = 1.0):
    """Returns audio prompt metadata and speed adjusted durations (0.75x, 0.8x, 1.0x)."""
    return AudioGenerator.get_prompt_metadata(clip_id, speed)
