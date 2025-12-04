import React, { useState } from "react";
import artworksData from "../data/artworks.json";
import ArtworkCard from "./ArtworkCard";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { Modal } from "antd";
import { ArtworkDemo } from "./ArtworkDemoRegistry";

const MATERIAL_OPTIONS = [
  { value: "processed_audio", label: "Processed audio" },
  { value: "processed_image", label: "Processed image" },
  { value: "processed_text", label: "Processed text" },
  { value: "synthesized_sound", label: "Synthesized sound" },
  { value: "synthesized_image", label: "Synthesized image" },
  { value: "synthesized_text", label: "Synthesized text" },
  { value: "randomness", label: "Randomness" },
  { value: "interactions", label: "Interactions (code-level)" }
];

const INTERACTION_OPTIONS = [
  { value: "human_interaction", label: "Human interaction" },
  { value: "computer_interaction", label: "Computer interaction" },
  { value: "none", label: "None" },
];

const OUTCOME_OPTIONS = [
  { value: "visual", label: "Visual" },
  { value: "auditory", label: "Auditory" },
  { value: "physical", label: "Physical" },
  { value: "static", label: "Static" },
  { value: "time_based", label: "Time based" },
];

function ArtworksLibrary() {
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const [selectedInteractions, setSelectedInteractions] = useState([]);
  const [selectedOutcomes, setSelectedOutcomes] = useState([]);
  const [demoArtwork, setDemoArtwork] = useState(null);

  const filteredArtworks = artworksData.filter((art) => {
    // Extract the lists from classification
    const material =
      art.classification?.material_and_processes || [];
  
    const interactions =
      art.classification?.interaction || [];
  
    const outcomes =
      art.classification?.outcome || [];
  
    // Evaluate matches
    const materialOk =
      selectedMaterial.length === 0 ||
      selectedMaterial.every((m) => material.includes(m));
  
    const interactionsOk =
      selectedInteractions.length === 0 ||
      selectedInteractions.every((i) => interactions.includes(i));
  
    const outcomesOk =
      selectedOutcomes.length === 0 ||
      selectedOutcomes.every((o) => outcomes.includes(o));
  
    return materialOk && interactionsOk && outcomesOk;
  });


  return (
    <section id="library" className="library-section">
      <h2>Artworks Library</h2>
      <p>
        Explore a subset of p5.js artworks annotated with our framework.
        Use the filters to select combinations of material &amp; processes,
        interactions, and outcomes.
      </p>

      {/* FILTERS WITH ANTD DROPDOWN */}
      <div className="filters-row">
        <MultiSelectDropdown
          title="Material and Processes"
          options={MATERIAL_OPTIONS}
          selectedValues={selectedMaterial}
          setSelectedValues={setSelectedMaterial}
        />

        <MultiSelectDropdown
          title="Interactions"
          options={INTERACTION_OPTIONS}
          selectedValues={selectedInteractions}
          setSelectedValues={setSelectedInteractions}
        />

        <MultiSelectDropdown
          title="Outcomes"
          options={OUTCOME_OPTIONS}
          selectedValues={selectedOutcomes}
          setSelectedValues={setSelectedOutcomes}
        />
      </div>

      <div className="results-info">
        Showing {filteredArtworks.length} of {artworksData.length} artworks
      </div>

      <div className="artworks-grid">
        {filteredArtworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onOpenDemo={() => setDemoArtwork(artwork)}
          />
        ))}
      </div>
      <Modal
        open={!!demoArtwork}
        onCancel={() => setDemoArtwork(null)}
        footer={null}
        width="80vw"
        centered
        destroyOnClose
      >
        {demoArtwork && (
          <div className="demo-modal-content">
            <h3>{demoArtwork.title}</h3>
            <p className="artist">{demoArtwork.artist}</p>
        
            <div className="demo-canvas-wrapper">
              <ArtworkDemo artwork={demoArtwork} />
            </div>
          </div>
        )}
      </Modal>


    </section>
  );
}

export default ArtworksLibrary;
