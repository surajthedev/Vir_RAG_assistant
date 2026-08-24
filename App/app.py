"""
app.py — Vir Campus Assistant (Streamlit UI)

HUM flow:
  1. Page loads → invisible face-api.js component fires
  2. Detects gender → posts result back to Python
  3. Vir sends "Hello Sir/Ma'am, how may I help you?" as the FIRST chat message
  4. Camera stopped immediately, no UI shown
"""

import uuid
import streamlit as st
import streamlit.components.v1 as components

from ui.api import upload_pdf, ask_question, get_suggestions
from services.hum_detector import hum_component_html, default_greeting

# --------------------------------------------------
# Page Config
# --------------------------------------------------
st.set_page_config(
    page_title="Vir — Campus Assistant",
    page_icon="🤖",
    layout="wide",
)

# --------------------------------------------------
# Session State Init
# --------------------------------------------------
defaults = {
    "session_id":          str(uuid.uuid4()),
    "messages":            [],
    "document_uploaded":   False,
    "document_name":       None,
    "chunks":              0,
    "suggested_questions": [],
    "followups":           [],
    "hum_done":            False,   # True once detection fired
    "hum_gender":          None,
    "hum_raw":             None,
    "greeted":             False,   # True once opening message added to chat
}
for k, v in defaults.items():
    if k not in st.session_state:
        st.session_state[k] = v


# --------------------------------------------------
# HUM — Invisible auto-detect (height=0, no UI)
# --------------------------------------------------
if not st.session_state.hum_done:
    hum_result = components.html(hum_component_html(), height=0, scrolling=False)
    if hum_result and isinstance(hum_result, dict) and hum_result != st.session_state.hum_raw:
        st.session_state.hum_raw    = hum_result
        st.session_state.hum_done   = True
        st.session_state.hum_gender = hum_result.get("gender")   # "Man" | "Woman" | None
        st.rerun()


# --------------------------------------------------
# Inject Vir's opening greeting as the first chat message (runs once)
# --------------------------------------------------
if not st.session_state.greeted:
    gender = st.session_state.hum_gender
    if gender == "Man":
        opening = "Hello Sir! 👋 How may I help you today?"
    elif gender == "Woman":
        opening = "Hello Ma'am! 👋 How may I help you today?"
    else:
        # Default shown immediately on load before detection completes,
        # OR if camera was denied / no face detected.
        opening = "Hello! 👋 How may I help you today?"

    st.session_state.messages.append({"role": "assistant", "content": opening})
    st.session_state.greeted = True


# --------------------------------------------------
# Helper — process a question
# --------------------------------------------------
def process_question(question: str):
    st.session_state.messages.append({"role": "user", "content": question})
    with st.spinner("Vir is thinking..."):
        response = ask_question(
            question=question,
            filename="",
            history=st.session_state.messages[-6:],
            session_id=st.session_state.session_id,
        )
    answer    = response.get("answer",    "⚠️ No response received from server.")
    followups  = response.get("followups", [])
    debug      = response.get("debug",     {})

    st.session_state.followups = followups
    st.session_state.messages.append({"role": "assistant", "content": answer})

    if debug:
        tools  = debug.get("tools_used", [])
        rounds = debug.get("rounds", "")
        if tools or rounds:
            st.caption(f"🔧 Tools: `{', '.join(tools) or 'fast-path'}` · Rounds: `{rounds}`")


# --------------------------------------------------
# Sidebar
# --------------------------------------------------
with st.sidebar:
    st.title("🤖 Vir")
    st.caption(f"Session: `{st.session_state.session_id[:8]}…`")
    st.markdown("---")

    st.subheader("Upload Document")
    uploaded_file = st.file_uploader(
        "Choose a PDF, DOCX, CSV or TXT",
        type=["pdf", "csv", "docx", "txt"],
    )
    if uploaded_file is not None:
        if st.button("📤 Upload & Index", use_container_width=True):
            with st.spinner("Indexing document..."):
                resp = upload_pdf(uploaded_file)
                if resp.status_code == 200:
                    data = resp.json()
                    st.session_state.document_uploaded  = True
                    st.session_state.document_name      = data["filename"]
                    st.session_state.chunks             = data["chunks_stored"]
                    sug = get_suggestions(data["filename"])
                    st.session_state.suggested_questions = (
                        sug.json().get("suggested_questions", [])
                        if sug.status_code == 200 else []
                    )
                    st.success("Document indexed!")
                    st.rerun()
                else:
                    st.error(resp.text)

    st.markdown("---")
    st.subheader("Status")
    if st.session_state.document_uploaded:
        st.success("🟢 Document indexed this session")
        st.write(f"📄 **{st.session_state.document_name}**")
        st.write(f"🧩 Chunks: {st.session_state.chunks}")
    else:
        st.info("🟡 Using knowledge from past uploads")

    if st.button("🗑️ Clear Conversation", use_container_width=True):
        # Full reset — next load will detect + greet fresh
        for k, v in defaults.items():
            st.session_state[k] = v
        st.session_state.session_id = str(uuid.uuid4())
        st.rerun()

    if st.session_state.suggested_questions:
        st.markdown("---")
        st.subheader("💡 Suggested Questions")
        for i, q in enumerate(st.session_state.suggested_questions):
            if st.button(q, key=f"suggestion_{i}", use_container_width=True):
                process_question(q)
                st.rerun()


# --------------------------------------------------
# Main Chat Area
# --------------------------------------------------
st.title("💬 Vir — Campus Assistant")
st.caption("Ask about students, faculty, regulations, marks, attendance, navigation, and more.")

# Chat history (first message is always Vir's greeting)
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# Follow-up chips
if (
    st.session_state.followups
    and st.session_state.messages
    and st.session_state.messages[-1]["role"] == "assistant"
):
    st.markdown("### Continue Exploring")
    cols = st.columns(len(st.session_state.followups))
    for col, q in zip(cols, st.session_state.followups):
        with col:
            if st.button(q, key=f"followup_{q}", use_container_width=True):
                process_question(q)
                st.rerun()

# Chat input
prompt = st.chat_input("Ask anything about PT Lee CNCET...")
if prompt:
    process_question(prompt)
    st.rerun()
