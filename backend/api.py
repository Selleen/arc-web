from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json
import subprocess
import re

app = FastAPI()

# Allow calls from your Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# BASE_DIR = backend/
BASE_DIR = Path(__file__).resolve().parent
# LLM_DIR = arc-web/LLM_architecture
LLM_DIR = BASE_DIR.parent / "LLM_architecture"

NEW_INPUT = LLM_DIR / "new_input.jsonl"
RESULT = LLM_DIR / "result.jsonl"


@app.post("/classify")
async def classify(file: UploadFile = File(...)):
    # 1) Read upload file
    content_bytes = await file.read()
    try:
        content = content_bytes.decode("utf-8")
    except UnicodeDecodeError:
        content = content_bytes.decode("latin-1")

    filename = Path(file.filename)
    stem = filename.stem
    ext = filename.suffix or ""

    # 2) Build record for new_input.jsonl
    record = {
        "ID": "A1",
        "Local": 0,
        "URL": None,
        "File_name": stem,
        "Extension": ext,
        "Content": content,
    }

    # 3) Write (overwrite) new_input.jsonl
    NEW_INPUT.write_text(
        json.dumps(record, ensure_ascii=False) + "\n",
        encoding="utf-8"
    )

    # 4) Run inference.py inside /LLM_architecture
    #subprocess.run(
    #    ["python", "inference.py"],
    #    cwd=str(LLM_DIR),
    #    check=True,
    #)

    # 5) Read result.jsonl (a single line)
    line = RESULT.read_text(encoding="utf-8").splitlines()[0]
    payload = json.loads(line)

    completion = payload.get("completion", "")

    # 6) We only keep the part before "Explanation:"
    core = completion.split("Explanation:")[0].strip()

    materials = []
    interactions = []
    outcomes = []

    import json as _json

    mat_match = re.search(r'(\[[^\]]*\])\s*,\s*"interaction"', core)
    int_match = re.search(r'"interaction":\s*(\[[^\]]*\])', core)
    out_match = re.search(r'"outcome":\s*(\[[^\]]*\])', core)

    if mat_match:
        try:
            materials = _json.loads(mat_match.group(1))
        except Exception:
            materials = []

    if int_match:
        try:
            interactions = _json.loads(int_match.group(1))
        except Exception:
            interactions = []

    if out_match:
        try:
            outcomes = _json.loads(out_match.group(1))
        except Exception:
            outcomes = []

    return {
        "file_name": file.filename,
        "material_and_processes": materials,
        "interaction": interactions,
        "outcome": outcomes,
    }
