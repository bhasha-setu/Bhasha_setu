"""Cricket Commentary Live Drill Voice Agent (CRICKET_AGENT)."""
from typing import Dict, Any
from agents.base_agent import BaseAgent


class CricketAgent(BaseAgent):
    """Evaluates fast-action sentence framing and match thrill commentary cadence."""

    @property
    def agent_id(self) -> str:
        return "CRICKET_AGENT"

    TARGET_PHRASE: str = "आख़िरी गेंद पर शानदार छक्का!"

    def process_turn(self, input_text: str, decibels: float = 92.0) -> Dict[str, Any]:
        """Analyze excitement, decibels, and matched commentary keywords."""
        has_chhakka = "छक्का" in input_text
        has_shaandaar = "शानदार" in input_text

        # Compute roar meter percentage (simulates Wankhede decibel gauge)
        roar_percent = int(min(99, max(60, decibels)))

        # Cadence check
        is_crisp = roar_percent >= 85 and (has_chhakka or has_shaandaar)
        xp_awarded = 35 if is_crisp else 15

        return {
            "agent": self.agent_id,
            "target_phrase": self.TARGET_PHRASE,
            "recognized_text": input_text,
            "stadium_roar_percent": roar_percent,
            "clarity_percent": 90 if is_crisp else 75,
            "cadence": "Crisp & Exuberant" if is_crisp else "Steady Pace",
            "xp_awarded": xp_awarded,
            "highlight_word": "छक्का!",
            "is_matched": is_crisp,
        }
