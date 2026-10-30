"""API Router: Active Recall Answer Evaluation."""
from fastapi import APIRouter
from pydantic import BaseModel, Field
from services.asr_service import ASRService

router = APIRouter(prefix="/api/evaluation", tags=["Evaluation"])


class EvaluateAnswerRequest(BaseModel):
    level_id: str = Field(..., description="Level identifier: 'BOLLYWOOD' or 'STREET_FOOD'")
    typed_word: str = Field(..., description="User-typed Devanagari string from mobile keyboard")
    expected_word: str = Field(..., description="Expected target Devanagari answer")


class EvaluateAnswerResponse(BaseModel):
    is_correct: bool
    typed_normalized: str
    expected_normalized: str
    xp_awarded: int
    combo_multiplier: int
    feedback_message: str


@router.post("/check-answer", response_model=EvaluateAnswerResponse)
def check_devanagari_answer(req: EvaluateAnswerRequest):
    """Evaluates typed Devanagari answers for Screen 2 (दिल) and Screen 4 (तीखा)."""
    is_match = ASRService.compare_words(req.typed_word, req.expected_word)
    xp = 20 if req.level_id.upper() == "BOLLYWOOD" else 50
    awarded_xp = xp if is_match else 0

    msg = (
        f"शाबाश! '{req.expected_word}' सही उत्तर है।"
        if is_match
        else f"दोबारा प्रयास करें! सही उत्तर '{req.expected_word}' था।"
    )

    return EvaluateAnswerResponse(
        is_correct=is_match,
        typed_normalized=ASRService.normalize_devanagari(req.typed_word),
        expected_normalized=ASRService.normalize_devanagari(req.expected_word),
        xp_awarded=awarded_xp,
        combo_multiplier=2 if is_match else 1,
        feedback_message=msg,
    )

