import React from "react";
import references from "../data/references.json";


references.sort((a, b) => b.year - a.year);

function ReferencesPage() {
  return (
    <section id="references" className="section">
      <div className="section-inner">
        <h2 className="section-title">References</h2>
        <p className="section-subtitle">
          Articles on which this research is based.
        </p>

        <ol className="ref-list">
          {references.map((ref, idx) => (
            <li key={idx} className="ref-item">
              <span className="ref-authors">{ref.authors}. </span>

              <span className="ref-title">
                “{ref.title}”.
              </span>{" "}

              <span className="ref-year">
                {ref.year}.
              </span>{" "}

              {ref.url && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ref-url"
                >
                  {ref.url}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ReferencesPage;
