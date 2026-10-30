"""Unit tests for Cricket Commentary and Nani Boss Agents."""
import pytest
from agents.cricket_agent import CricketAgent
from agents.nani_agent import NaniAgent


def test_cricket_agent_matched():
    agent = CricketAgent()
    result = agent.process_turn("आख़िरी गेंद पर शानदार छक्का!", decibels=92.0)
    assert result["agent"] == "CRICKET_AGENT"
    assert result["stadium_roar_percent"] == 92
    assert result["is_matched"] is True
    assert result["xp_awarded"] == 35
    assert result["cadence"] == "Crisp & Exuberant"


def test_cricket_agent_unmatched():
    agent = CricketAgent()
    result = agent.process_turn("धीमी गेंद फेंकी", decibels=70.0)
    assert result["is_matched"] is False
    assert result["xp_awarded"] == 15


def test_nani_agent_turn():
    agent = NaniAgent()
    result = agent.process_turn("नमस्ते नानी! मैं कल सुबह मिठाई लेकर आ रहा हूँ।", decibels=88.0)
    assert result["agent"] == "NANI_BOSS_AGENT"
    assert result["respect_detected"] is True
    assert result["golden_diya_awarded"] is True
    assert "खीर" in result["reply_voice_note"]["text_hi"]
