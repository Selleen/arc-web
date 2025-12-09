// src/components/P5Background.jsx
import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { darkflowers2Sketch } from "../p5/darkflowers2Sketch";

function P5Background() {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("P5Background useEffect - creating p5 instance");
    const p5Instance = new p5((p) => darkflowers2Sketch(p, containerRef.current), containerRef.current);

    return () => {
      console.log("🧹 Cleaning p5 instance");
      p5Instance.remove();
    };
  }, []);

  return <div className="p5-background" ref={containerRef} />;
}

export default P5Background;
