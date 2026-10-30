"""Bhasha Setu (भाषा सेतु) — AI & Voice Microservice Entrypoint."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import evaluation, voice_analysis, websocket_drill

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Conversational AI, speech cadence analysis, and real-time Bolna voice agent backend.",
)

# Allow Cross-Origin Requests from Expo Mobile App and Web Simulator
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount modular routers
app.include_router(evaluation.router)
app.include_router(voice_analysis.router)
app.include_router(websocket_drill.router)


@app.get("/")
def root_health_check():
    """Health check endpoint indicating active voice agents and service status."""
    return {
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "online",
        "active_recall_rule": "100% active production (zero multiple-choice guessing)",
        "available_agents": ["CRICKET_AGENT", "NANI_BOSS_AGENT"],
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)

