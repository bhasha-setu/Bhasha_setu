"""Bhasha Setu AI & Voice Services Configuration."""
from pydantic import BaseModel


class Settings(BaseModel):
    APP_NAME: str = "Bhasha Setu AI & Voice Service"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = True
    BOLNA_WS_ENDPOINT: str = "wss://api.bolna.ai/v1/ws"
    AUDIO_SAMPLE_RATE: int = 16000
    AUDIO_CHANNELS: int = 1
    GOLDEN_DIYA_THRESHOLD: int = 85
    HOST: str = "0.0.0.0"
    PORT: int = 8000


settings = Settings()
