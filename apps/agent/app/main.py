from fastapi import FastAPI

app = FastAPI(
    title="BI Surface Agent",
    description="Local system visibility API for BI Surface.",
    version="0.1.0",
)

@app.get("/api/v1/health")
def get_health() -> dict[str, str]:
    return {
        "status": "online",
        "service": "BI Surface Agent",
        "version": "0.1.0",
    }