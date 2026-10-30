"""ASR (Automatic Speech Recognition) & Devanagari Normalization Service."""
import re
import unicodedata
from typing import Dict, Any


class ASRService:
    """Handles Devanagari text normalization and speech recognition transcription simulation."""

    @staticmethod
    def normalize_devanagari(text: str) -> str:
        """Strip surrounding whitespaces, punctuation, and normalize unicode codepoints."""
        if not text:
            return ""
        # Normalize Unicode (NFC form)
        normalized = unicodedata.normalize("NFC", text.strip())
        # Strip English and Devanagari punctuation quotation marks
        cleaned = re.sub(r'[“”।,\.!\?\'"‘\s]+', " ", normalized).strip()
        return cleaned

    @classmethod
    def compare_words(cls, typed: str, expected: str) -> bool:
        """Normalized comparison of typed Hindi vs expected target word."""
        return cls.normalize_devanagari(typed) == cls.normalize_devanagari(expected)

    @classmethod
    def transcribe_audio_chunk(cls, base64_chunk: str, db: float = 85.0) -> Dict[str, Any]:
        """Process incoming 16kHz audio buffer and produce partial ASR with clarity score."""
        # Calculate dynamic clarity percentage based on decibels & chunk length
        length_factor = min(1.0, len(base64_chunk) / 500.0) if base64_chunk else 0.5
        clarity = int(min(99, max(75, (db * 0.7) + (length_factor * 25))))

        return {
            "status": "transcribed",
            "clarity_percent": clarity,
            "raw_length": len(base64_chunk),
        }

