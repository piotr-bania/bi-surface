import time
import psutil

from app.models import TelemetryResponse

def collect_telemetry() -> TelemetryResponse:
    memory = psutil.virtual_memory()
    boot_time = psutil.boot_time()
    uptime_seconds = time.time() - boot_time

    return TelemetryResponse(
        cpu_usage_percent=psutil.cpu_percent(interval=None),
        memory_used_bytes=memory.used,
        memory_available_bytes=memory.available,
        memory_usage_percent=memory.percent,
        uptime_seconds=uptime_seconds,
    )