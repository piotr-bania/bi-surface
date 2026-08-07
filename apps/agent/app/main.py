import platform
import socket
import psutil

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import HealthResponse, SystemResponse

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

@app.get("/api/v1/system", response_model=SystemResponse)
def get_system() -> SystemResponse:
    physical_cores = psutil.cpu_count(logical=False)
    logical_cores = psutil.cpu_count(logical=True)
    memory = psutil.virtual_memory()

    return SystemResponse(
        hostname=socket.gethostname(),
        operating_system=platform.system(),
        os_release=platform.release(),
        os_version=platform.version(),
        architecture=platform.machine(),
        processor=platform.processor() or "Unknown",
        physical_cores=physical_cores or 0,
        logical_cores=logical_cores or 0,
        memory_total_bytes=memory.total,
    )
