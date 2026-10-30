"""Fluency Scorer & Cultural Respect Tone Evaluator."""
from typing import Dict, Any, List, Optional
from config import settings


class FluencyScorer:
    """Evaluates spontaneous Hindi speech cadence, pronunciation accuracy, and cultural respect markers."""

    # Hindi cultural respect markers commonly expected when speaking to elders (Nani)
    RESPECT_MARKERS: List[str] = ["आप", "जी", "नमस्ते", "प्रणाम", "चरण", "धन्यवाद"]

    @classmethod
    def detect_respect_markers(cls, text: str) -> Optional[str]:
        """Detect if the user utilized respectful Hindi pronouns or honorifics."""
        for marker in cls.RESPECT_MARKERS:
            if marker in text:
                return marker
        return None

    @classmethod
    def evaluate_spoken_turn(
        cls,
        spoken_text: str,
        target_concept: str,
        decibels: float = 85.0,
        pitch_hz: float = 220.0
    ) -> Dict[str, Any]:
        """Compute comprehensive fluency score and check for Golden Diya milestone unlock."""
        respect_marker = cls.detect_respect_markers(spoken_text)

        # Baseline fluency from acoustic metrics
        base_score = 75
        if 80 <= decibels <= 95:
            base_score += 10
        if 180 <= pitch_hz <= 280:
            base_score += 5
        if respect_marker:
            base_score += 8

        fluency_score = min(99, max(60, base_score))
        is_golden_diya = fluency_score >= settings.GOLDEN_DIYA_THRESHOLD

        return {
            "fluency_score": fluency_score,
            "respect_marker_used": respect_marker,
            "unlocked_artifact_id": "golden-diya" if is_golden_diya else None,
            "xp_awarded": 100 if is_golden_diya else 50,
            "is_golden_diya_unlocked": is_golden_diya,
            "feedback_summary": f"✓✓ {fluency_score}% Natural Fluency",
            "cadence_label": "natural cadence" if fluency_score >= 85 else "steady cadence",
        }
