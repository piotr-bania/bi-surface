from pydantic import BaseModel

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