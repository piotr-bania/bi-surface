from typing import Literal
from pydantic import BaseModel

ProcessAccessStatus = Literal[
    "full",
    "partial",
    "denied",
]

class ProcessInfo(BaseModel):
    pid: int
    ppid: int | None
    name: str | None
    username: str | None
    status: str | None

    cpu_percent: float | None
    memory_mb: float | None
    memory_percent: float | None
    threads: int | None

    access_status: ProcessAccessStatus
    denied_fields: list[str]

class ProcessAccessSummary(BaseModel):
    full: int
    partial: int
    denied: int

class ProcessesResponse(BaseModel):
    processes: list[ProcessInfo]
    count: int
    access: ProcessAccessSummary
    denied_field_counts: dict[str, int]