from typing import Literal
from pydantic import BaseModel

class HealthResponse(BaseModel):
    status: Literal["online"]
    service: str
    version: str