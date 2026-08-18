from pydantic import BaseModel

class TelemetryResponse(BaseModel):
    cpu_usage_percent: float
    memory_used_bytes: int
    memory_available_bytes: int
    memory_usage_percent: float
    uptime_seconds: float