import React from "react";

export function ArtworkDemo({ artwork }) {
  const code = artwork.metadata.content;

  if (!code) {
    return (
      <p style={{ color: "#ddd", fontSize: "0.9rem" }}>
        No live demo available for this artwork.
      </p>
    );
  }

  // Built a minimal HTML that loads p5 and your code
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: #000;
      }
      canvas {
        display: block;
      }
    </style>
  </head>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
    <script>
${code}
    </script>
  </body>
</html>
  `;

  return (
    <iframe
      title={`demo-${artwork.id}`}
      srcDoc={html}
      style={{
        width: "100%",
        height: "450px",
        border: "none",
        borderRadius: "12px",
        background: "#000",
      }}
    />
  );
}
