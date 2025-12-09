import React from "react";

function ArtworkCard({ artwork, onOpenDemo}) {
  
  const {
    material_and_processes = [],
    interaction = [],
    outcome = [],
  } = artwork.classification || {};
  const BLOCKED_TYPES = [
    "processed_audio",
    "processed_text",
    "processed_image",
  ];

  const hasBlockedMaterial = material_and_processes.some((m) =>
  BLOCKED_TYPES.includes(m)
  );
  const isHidden = artwork.hide === "yes" || artwork.hide === true;

  return (
    <div className="artwork-card">
      <h3>{artwork.title}</h3>
      <p className="artist">{artwork.artist}</p>

      
 {/* <p className="description">{artwork.description}</p>*/}

      <div className="tags">
        <strong>Material &amp; Processes:</strong>{" "}
        {material_and_processes.length > 0
          ? material_and_processes.join(", ")
          : "—"}
      </div>

      <div className="tags">
        <strong>Interaction:</strong>{" "}
        {interaction.length > 0 ? interaction.join(", ") : "—"}
      </div>

      <div className="tags">
        <strong>Outcome:</strong>{" "}
        {outcome.length > 0 ? outcome.join(", ") : "—"}
      </div>
 {/* <p className="llm-notes">
        <strong>LLM-based characterization:</strong> {artwork.llm_notes}
      </p> */}
      

      <div className="links">
        {artwork.repoUrl && artwork.repoUrl != "None" && (
          <a
            href={artwork.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="action-button"
          >
            Repository
          </a>
        )}

        {artwork.metadata.content && !hasBlockedMaterial && !isHidden && (
          <button
            type="button"
            className="action-button"
            onClick={onOpenDemo}
          >
            Live demo
          </button>
        )}
      </div>
    </div>
  );
}

export default ArtworkCard;
