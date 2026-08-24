from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.upload import router as upload_router
from routes.chat import router as chat_router
from routes.suggestions import router as suggestions_router
from config import GROQ_MODEL

app = FastAPI(
    title="Vir Campus Assistant RAG API",
    version="1.0.0"
)

# Enable CORS for local dev frontend (Vite, Streamlit, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "status": "online",
        "message": "Vir Campus Assistant Backend Running 🚀",
        "model": GROQ_MODEL
    }


@app.get("/health")
@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "online": True,
        "service": "Vir Campus Assistant RAG API",
        "version": "1.0.0",
        "model": GROQ_MODEL
    }


# Include routers for direct and /api prefixed routes
app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(suggestions_router)

# Also mount under /api prefix for proxy convenience
app.include_router(upload_router, prefix="/api")
app.include_router(chat_router, prefix="/api")
app.include_router(suggestions_router, prefix="/api")

