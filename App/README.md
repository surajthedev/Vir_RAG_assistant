# 📄 Vir Campus AI Assistant (`App/`)

**Vir Assistant** is an agentic AI campus assistant and indoor navigation system built for **P.T. Lee Chengalvaraya Naicker College of Engineering and Technology (PT Lee CNCET)**.

It combines **Agentic Tool-Calling Reasoning (Groq LLM)**, **Dense Vector Retrieval (Qdrant + Jina AI v3)**, **Secure Tabular Analytics (SQLite with 3-Layer SQL Lockdown)**, and **Topological Campus Navigation** into a high-performance conversational application.

---

## 🌟 Key Capabilities

### 1. 🧠 Agentic Reasoning Loop (`services/agent.py`)
- Replaced hard-coded regex routing with an autonomous LLM reasoning loop (`run_agent`).
- The model analyzes the query, plans execution, and invokes appropriate tools across multiple reasoning rounds:
  - **`vector_search(query, top_k)`**: Semantic search over institutional regulations, prospectus, policies, transport schedules, and syllabi.
  - **`sql_query(question)`**: Natural-language-to-SQL engine over student records, marks, attendance, and faculty directories.
  - **`find_path(source, destination)`**: Turn-by-turn indoor campus walking directions.
  - **`list_rooms(query)`** & **`get_room_info(room_id)`**: Room and facility lookups.
- Supports **Hybrid Multi-Tool Reasoning** (e.g., retrieving student performance from SQL and explaining academic regulation rules from documents in a single turn).

### 2. ⚡ Zero-Overhead Fast-Path (`services/fast_path.py`)
- Sub-millisecond regex classifier for unambiguous patterns (e.g., bare 12-digit registration numbers like `511523205001` or direct navigation requests), bypassing the agent loop for instant response.

### 3. 🔒 3-Layer SQL Security Lockdown (`services/sql_engine.py`)
- **Layer 1 (Token Verification)**: Enforces `SELECT` or read-only `WITH` as the opening keyword.
- **Layer 2 (AST & Regex Pattern Scan)**: Blocks destructive keywords (`DELETE`, `DROP`, `UPDATE`, `ALTER`, `INSERT`, `TRUNCATE`, CTE bypasses) anywhere in the query.
- **Layer 3 (Database Engine Pragma)**: Enforces `PRAGMA query_only = ON` on SQLite connections as defense-in-depth.

### 4. 📚 Vector Retrieval with Source Citations (`services/retriever.py`, `services/agent_tools.py`)
- Powered by **Jina AI Embeddings v3** (1024-dimensional dense vectors) and **Qdrant Vector Database**.
- Chunks preserve document metadata (filename, page numbers).
- Responses include transparent **Source Citations** (e.g., `**Sources:** Academic Regulations 2021.pdf (p. 15, 28)`).

### 5. 🛡️ Resilience & Production Hardening
- **Tenacity Retry with Exponential Backoff**: Wraps Groq LLM completions and Jina embedding requests to handle rate limits (`429`) and server errors (`5xx`) seamlessly.
- **Batched Ingestion**: 100-chunk batches for Jina embeddings and 50-point batches for Qdrant upserts to prevent timeouts on large documents.
- **Session Memory (`services/session_store.py`)**: Persistent SQLite-backed conversational history across multi-turn sessions.

---

## 🏗️ System Architecture

```
                                  User Request / Prompt
                                            │
                                            ▼
                                  FastAPI (POST /chat)
                                            │
                                            ▼
                                 ┌────────────────────┐
                                 │   fast_path.py     │
                                 │ (Regex Classifier) │
                                 └──────────┬─────────┘
                                            │
                    ┌───────────────────────┴───────────────────────┐
                    ▼ (Bare RegNo / Direct Nav)                     ▼ (Complex / General)
          ┌───────────────────┐                           ┌───────────────────┐
          │ Fast-Path Direct  │                           │   Agentic Loop    │
          │ (SQL / Nav Route) │                           │(services/agent.py)│
          └─────────┬─────────┘                           └─────────┬─────────┘
                    │                                               │
                    │               ┌───────────────────────────────┴───────────────────────────────┐
                    │               ▼                               ▼                               ▼
                    │      ┌─────────────────┐             ┌─────────────────┐             ┌─────────────────┐
                    │      │  vector_search  │             │    sql_query    │             │ Navigation Tools│
                    │      │(Qdrant + Jina v3│             │ (SQLite app.db) │             │ (Campus Graph)  │
                    │      └────────┬────────┘             └────────┬────────┘             └────────┬────────┘
                    │               │                               │                               │
                    │               └───────────────────────┬───────┴───────────────────────────────┘
                    │                                       │ (Tool Results / Multi-Round)
                    │                                       ▼
                    │                            ┌─────────────────────┐
                    │                            │   Final Synthesis   │
                    │                            │      (Groq LLM)     │
                    │                            └──────────┬──────────┘
                    │                                       │
                    └───────────────────────┬───────────────┘
                                            │
                                            ▼
                             ┌─────────────────────────────┐
                             │ Response with Citations,    │
                             │ Follow-ups & Session Memory │
                             └─────────────────────────────┘
```

---

## 📂 Project Structure

```
App/
├── config.py                 # Environment variables and system settings
├── main.py                   # FastAPI application entry point
├── app.py                    # Streamlit conversational web UI with streaming
├── ingest_sqlite.py          # SQLite database builder & normalized views generator
├── ingest_pdfs.py            # Batch PDF extractor & Qdrant vector indexer
├── requirements.txt          # Python dependencies
│
├── routes/
│   ├── chat.py               # POST /chat endpoint (Fast-path + Agentic loop)
│   ├── upload.py             # POST /upload endpoint (Document indexing)
│   └── suggestions.py        # POST /suggestions endpoint (Document query hints)
│
├── services/
│   ├── agent.py              # Core multi-turn agentic reasoning loop
│   ├── agent_tools.py        # Tool schemas and execution dispatcher
│   ├── fast_path.py          # Low-latency regex query classifier
│   ├── session_store.py      # SQLite-backed persistent multi-turn session storage
│   ├── sql_engine.py         # 3-layer hardened SQL generator & executor
│   ├── retriever.py          # Semantic vector retrieval & context assembly
│   ├── embeddings.py         # Jina AI Embeddings v3 client with batching & retries
│   ├── vectordb.py           # Qdrant client, batched upsert, collection management
│   ├── llm.py                # Retried Groq LLM API wrapper
│   ├── map_tools.py          # Indoor campus navigation & room lookup tool bindings
│   ├── followups.py          # Dynamic follow-up question generator
│   ├── extractor.py          # PDF, DOCX, CSV, TXT text extractors
│   └── chunker.py            # Recursive document chunking engine
│
├── tests/
│   ├── test_agent.py         # Pytest unit tests (FastPath, SQL Security) & E2E accuracy suite
│   ├── test_rag_accuracy.py  # Benchmark test runner
│   └── test_vectordb.py      # Qdrant connection validation
│
└── data/
    ├── app.db                # Consolidated SQLite Database
    ├── sessions.db           # Persistent multi-turn session memory
    ├── uploads/              # Uploaded documents and datasets
    └── qdrant_db/            # Local disk Qdrant fallback store
```

---

## ⚡ Setup & Installation

### 1. Environment Setup

```bash
cd App
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure `.env`

Create `App/.env` with your API credentials:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
JINA_API_KEY=your_jina_api_key
QDRANT_URL=https://your-cluster.qdrant.io   # Optional: local fallback if omitted
QDRANT_API_KEY=your_qdrant_api_key
```

### 3. Ingest Data

```bash
# Ingest structured academic data into SQLite
python ingest_sqlite.py

# Ingest all campus PDF regulations, prospectuses, and schedules into Qdrant
python ingest_pdfs.py
```

### 4. Run Tests

```bash
# Run unit tests (Fast-path + SQL Security):
python -m pytest tests/test_agent.py::TestFastPath tests/test_agent.py::TestSQLSecurity -v

# Run full live accuracy test suite:
python tests/test_agent.py
```

### 5. Launch the Application

```bash
# 1. Start FastAPI Backend (Terminal 1):
uvicorn main:app --reload --port 8000

# 2. Start Streamlit Frontend (Terminal 2):
streamlit run app.py
```

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| **Agent & LLM Engine** | Groq Cloud API (`openai/gpt-oss-20b` / `llama-3.3-70b-versatile`) | Multi-round tool calling & natural language response generation |
| **Embeddings** | Jina AI (`jina-embeddings-v3`) | 1024-dimensional dense semantic vectors with batch processing |
| **Vector Database** | Qdrant (Cloud / Local) | Fast cosine distance semantic retrieval |
| **Structured Database** | SQLite (`data/app.db`) | Normalized academic records, marks, attendance, and analytics views |
| **Session Memory** | SQLite (`data/sessions.db`) | Persistent multi-turn conversation storage per session UUID |
| **Resilience** | `tenacity` | Exponential backoff retry on API rate limits and connection drops |
| **Backend Framework** | FastAPI + Uvicorn | High-throughput asynchronous REST API |
| **Frontend Framework** | Streamlit | Conversational chat interface with simulated token streaming |
| **Indoor Pathfinding** | Dijkstra's Graph Algorithm | Multi-floor campus routing and shortest path calculation |
