import React from "react";
import P5Background from "../components/P5Background";

function HomePage() {
  return (
    <div className="home-hero">
      <P5Background />
      <div className="home-title">
        <h1>ARC-World</h1>
        <p>
          A prototype web platform for exploring and characterizing
          software-based artworks.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
