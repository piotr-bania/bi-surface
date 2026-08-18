from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.collectors import (
    collect_system,
    collect_telemetry,
    collect_processes,
)

from app.models import (
    HealthResponse,
    SystemResponse,
    TelemetryResponse,
    ProcessesResponse,
)

app = FastAPI(
    title="BI Surface Agent",
    description="Local system visibility API for BI Surface.",
    version="0.1.0",
)

allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://bi-surface.vercel.app",
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

@app.get("/api/v1/system", response_model=SystemResponse)
def get_system() -> SystemResponse:
    return collect_system()

@app.get("/api/v1/telemetry", response_model=TelemetryResponse)
def get_telemetry() -> TelemetryResponse:
    return collect_telemetry()

@app.get("/api/v1/processes", response_model=ProcessesResponse)
def get_processes() -> ProcessesResponse:
    return collect_processes()