from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import HealthResponse

app = FastAPI(
    title="BI Surface Agent",
    description="Local system visibility API for BI Surface.",
    version="0.1.0",
)

allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/api/v1/health", response_model=HealthResponse)
def get_health() -> HealthResponse:
    return HealthResponse(
        status="online",
        service="BI Surface Agent",
        version="0.1.0",
    )