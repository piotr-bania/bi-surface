import psutil

from app.models import ProcessInfo, ProcessesResponse

def collect_processes() -> ProcessesResponse:
    processes: list[ProcessInfo] = []
    
    full_count = 0
    partial_count = 0
    denied_count = 0

    denied_fields_counts: dict[str, int] = {}

    for process in psutil.process_iter():
        denied_fields: list[str] = []

        pid = process.pid

        try:
            ppid = process.ppid()
        except psutil.AccessDenied:
            ppid = None
            denied_fields.append("ppid")
        except psutil.NoSuchProcess:
            continue

        try:
            name = process.name()
        except psutil.AccessDenied:
            name = None
            denied_fields.append("name")
        except psutil.NoSuchProcess:
            continue

        try:
            username = process.username()
        except psutil.AccessDenied:
            username = None
            denied_fields.append("username")
        except psutil.NoSuchProcess:
            continue

        try:
            status = process.status()
        except psutil.AccessDenied:
            status = None
            denied_fields.append("status")
        except psutil.NoSuchProcess:
            continue

        try:
            cpu_percent = process.cpu_percent(interval=None)
        except psutil.AccessDenied:
            cpu_percent = None
            denied_fields.append("cpu_percent")
        except psutil.NoSuchProcess:
            continue

        try:
            memory_info = process.memory_info()
            memory_mb = memory_info.rss / 1024 ** 2
        except psutil.AccessDenied:
            memory_mb = None
            denied_fields.append("memory_mb")
        except psutil.NoSuchProcess:
            continue

        try:
            memory_percent = process.memory_percent()
        except psutil.AccessDenied:
            memory_percent = None
            denied_fields.append("memory_percent")
        except psutil.NoSuchProcess:
            continue

        try:
            threads = process.num_threads()
        except psutil.AccessDenied:
            threads = None
            denied_fields.append("threads")
        except psutil.NoSuchProcess:
            continue

        if len(denied_fields) == 0:
            access_status = "full"
            full_count += 1
        elif len(denied_fields) >= 7:
            access_status = "denied"
            denied_count += 1
        else:
            access_status = "partial"
            partial_count += 1

        for field in denied_fields:
            denied_fields_counts[field] = denied_fields_counts.get(field, 0) + 1

        processes.append(
            ProcessInfo(
                pid=pid,
                ppid=ppid,
                name=name,
                username=username,
                status=status,
                cpu_percent=cpu_percent,
                memory_mb=memory_mb,
                memory_percent=memory_percent,
                threads=threads,
                access_status=access_status,
                denied_fields=denied_fields,
            )
        )

    return ProcessesResponse(
        processes=processes,
        count=len(processes),
        access={
            "full": full_count,
            "partial": partial_count,
            "denied": denied_count,
        },
        denied_field_counts=denied_fields_counts,
    )