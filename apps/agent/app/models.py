from typing import Literal
from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: Literal["online"]
    service: str
    version: str


class OperatingSystemInfo(BaseModel):
    name: str
    release: str
    version: str
    architecture: str


class CpuInfo(BaseModel):
    name: str
    physical_cores: int
    logical_cores: int


class MemoryInfo(BaseModel):
    total_bytes: int


class SystemResponse(BaseModel):
    hostname: str
    operating_system: OperatingSystemInfo
    cpu: CpuInfo
    memory: MemoryInfo
    boot_time: float


class TelemetryResponse(BaseModel):
    cpu_usage_percent: float
    memory_used_bytes: int
    memory_available_bytes: int
    memory_usage_percent: float
    uptime_seconds: float