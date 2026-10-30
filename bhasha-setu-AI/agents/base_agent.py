"""Base Conversational Agent Contract for Bolna Voice AI integration."""
from abc import ABC, abstractmethod
from typing import Dict, Any


class BaseAgent(ABC):
    """Abstract base class for domain-specialized conversational Hindi voice agents."""

    @property
    @abstractmethod
    def agent_id(self) -> str:
        """Unique agent identifier."""
        pass

    @abstractmethod
    def process_turn(self, input_text: str, decibels: float = 85.0) -> Dict[str, Any]:
        """Process incoming user turn and generate conversational response + evaluation."""
        pass
