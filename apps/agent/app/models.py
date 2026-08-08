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
    usage_percent: float


class MemoryInfo(BaseModel):
    total_bytes: int
    available_bytes: int
    used_bytes: int
    usage_percent: float


class SystemResponse(BaseModel):
    hostname: str
    operating_system: OperatingSystemInfo
    cpu: CpuInfo
    memory: MemoryInfo
    boot_time: float
    uptime_seconds: float