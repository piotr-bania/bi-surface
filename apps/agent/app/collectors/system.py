import socket
import platform
import psutil

from app.models import SystemResponse

def collect_system() -> SystemResponse:
    physical_cores = psutil.cpu_count(logical=False)
    logical_cores = psutil.cpu_count(logical=True)
    memory = psutil.virtual_memory()
    boot_time = psutil.boot_time()

    return SystemResponse(
        hostname=socket.gethostname(),
        operating_system={
            "name": platform.system(),
            "release": platform.release(),
            "version": platform.version(),
            "architecture": platform.machine(),
        },
        cpu={
            "name": platform.processor() or "Unknown",
            "physical_cores": physical_cores or 0,
            "logical_cores": logical_cores or 0,
        },
        memory={
            "total_bytes": memory.total,
        },
        boot_time=boot_time,
    )