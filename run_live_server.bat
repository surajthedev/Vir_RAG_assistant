@echo off
title Vir Campus Assistant - Live Server Launcher
color 0B

echo ============================================================
echo   VIR CAMPUS ASSISTANT -- RAG & FULL-STACK AI PLATFORM
echo   P.T. Lee Chengalvaraya Naicker College of Engineering
echo ============================================================
echo.

set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

:: Check if Python virtualenv exists
if exist "%SCRIPT_DIR%.venv\Scripts\activate.bat" (
    echo [OK] Found Python virtual environment in .venv
    set "PYTHON_EXE=%SCRIPT_DIR%.venv\Scripts\python.exe"
) else (
    echo [INFO] .venv not found in root, searching system python...
    set "PYTHON_EXE=python"
)

:: 1. Start FastAPI Backend Server
echo [1/2] Launching FastAPI RAG Backend on http://127.0.0.1:8000 ...
start "Vir AI - FastAPI Backend (Port 8000)" cmd /k "cd /d "%SCRIPT_DIR%App" && "%PYTHON_EXE%" -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

:: Give backend a couple seconds to bind
timeout /t 2 /nobreak >nul

:: 2. Start Vite React Frontend
echo [2/2] Launching Vite React Frontend on http://localhost:3000 ...
start "Vir AI - React Web UI (Port 3000)" cmd /k "cd /d "%SCRIPT_DIR%Ui Anti" && npm run dev"

:: Open Browser
timeout /t 3 /nobreak >nul
echo.
echo ============================================================
echo   Both services are now running!
echo   Frontend: http://localhost:3000
echo   Backend API: http://127.0.0.1:8000
echo   Interactive Docs: http://127.0.0.1:8000/docs
echo ============================================================
echo.

start http://localhost:3000
