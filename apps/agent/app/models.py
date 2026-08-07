from typing import Literal
from pydantic import BaseModel

class HealthResponse(BaseModel):
    status: Literal["online"]
    service: str
    version: str

class SystemResponse(BaseModel):
    hostname: str
    operating_system: str
    os_release: str
    os_version: str
    architecture: str
    processor: str
    physical_cores: int
    logical_cores: int
    memory_total_bytes: int