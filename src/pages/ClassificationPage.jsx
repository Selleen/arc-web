import React, { useState } from "react";

function ClassificationPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    setResult(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8000/classify", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <h2>Artwork Classification</h2>
      <p>
        Upload a single <code>.js</code>, <code>.html</code> (p5.js / Processing)
        file to classify it with the LLM.
      </p>

      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept=".js,.jsx,.ts,.tsx,.html,.pde"
          onChange={handleFileChange}
        />

        <button
          type="submit"
          className="action-button"
          disabled={!file || loading}
        >
          {loading ? "Running model..." : "Run classification"}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {result && (
        <div className="classification-result">
          <h3>Model output</h3>
          <p>
            <strong>File:</strong> {result.file_name}
          </p>

          <div className="tags">
            <strong>Material &amp; Processes:</strong>{" "}
            {result.material_and_processes?.length
              ? result.material_and_processes.join(", ")
              : "—"}
          </div>

          <div className="tags">
            <strong>Interaction:</strong>{" "}
            {result.interaction?.length
              ? result.interaction.join(", ")
              : "—"}
          </div>

          <div className="tags">
            <strong>Outcome:</strong>{" "}
            {result.outcome?.length
              ? result.outcome.join(", ")
              : "—"}
          </div>
        </div>
      )}
    </section>
  );
}

export default ClassificationPage;
