"""Diwali WhatsApp Phone Call with Nani Agent (NANI_BOSS_AGENT)."""
from typing import Dict, Any, List
from agents.base_agent import BaseAgent
from services.fluency_scorer import FluencyScorer


class NaniAgent(BaseAgent):
    """Conversational boss agent for Diwali dialogue with respectful tone checks."""

    @property
    def agent_id(self) -> str:
        return "NANI_BOSS_AGENT"

    # Conversational script progression
    CONVERSATION_TURNS: List[Dict[str, str]] = [
        {
            "nani_hi": "नमस्ते बेटा! दिवाली की बहुत-बहुत शुभकामनाएँ। घर कब आ रहे हो?",
            "nani_en": "Greetings son! Happy Diwali. When are you coming home?",
            "expected_context": "coming tomorrow with sweets",
        },
        {
            "nani_hi": "वाह! मैं तुम्हारी मनपसंद खीर बना के रखूँगी। 🪔",
            "nani_en": "Wonderful! I will prepare your favorite kheer.",
            "expected_context": "thank you and diwali celebration",
        },
    ]

    def process_turn(self, input_text: str, decibels: float = 85.0) -> Dict[str, Any]:
        """Evaluate user response to Nani and provide grandmotherly reply voice note."""
        evaluation = FluencyScorer.evaluate_spoken_turn(
            spoken_text=input_text,
            target_concept="sweets and arrival",
            decibels=decibels,
        )

        # Generate Nani's responsive turn
        if "कल" in input_text or "मिठाई" in input_text or "आ रहा" in input_text:
            reply_hi = "वाह! मैं तुम्हारी मनपसंद खीर बना के रखूँगी। 🪔"
            reply_en = "Wonderful! I will prepare your favorite kheer."
        else:
            reply_hi = "शाबाश बेटा! सब तुम्हारा इंतज़ार कर रहे हैं।"
            reply_en = "Well done son! Everyone is waiting for you."

        return {
            "agent": self.agent_id,
            "user_evaluation": evaluation,
            "reply_voice_note": {
                "id": f"nani_reply_{int(decibels * 100)}",
                "text_hi": reply_hi,
                "text_en": reply_en,
                "duration": "0:03",
                "timestamp": "10:15 AM",
            },
            "respect_detected": evaluation["respect_marker_used"] is not None,
            "golden_diya_awarded": evaluation["is_golden_diya_unlocked"],
        }
