import React from "react";
import artworksData from "../data/artworks.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// Generic function to count occurrences of a classification field
function getCountsForField(fieldName) {
  const counts = {};

  artworksData.forEach((art) => {
    const values = art.classification?.[fieldName] || [];
    values.forEach((v) => {
      if (!v) return;
      counts[v] = (counts[v] || 0) + 1;
    });
  });

  // Convert to an array of objects for Recharts
  return Object.entries(counts).map(([value, count]) => ({
    value,
    label: value.replace(/_/g, " "),
    count,
  }));
}

function StatsChart({ title, fieldName, barColor }) {
  const data = getCountsForField(fieldName);
  const height = Math.max(240, data.length * 32);

  return (
    <div className="stats-card">
      <h3 className="stats-card-title">{title}</h3>

      {data.length === 0 ? (
        <p className="stats-empty">No values found for {fieldName}.</p>
      ) : (
        <div className="stats-chart-wrapper" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis
                type="number"
                tick={{ fill: "#000000ff", fontSize: 12 }}
                stroke="#000000ff"
              />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fill: "#e24532", fontSize: 12 }}
                width={140}
                stroke="#000000ff"
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(249, 255, 228, 0.95)",
                  border: "1px solid rgba(120,130,210,0.8)",
                  borderRadius: 8,
                  color: "#000000ff",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="count" fill={barColor} radius={[4, 4, 4, 4]}>
                <LabelList
                  dataKey="count"
                  position="right"
                  fill="#f5f5ff"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function StatisticsPage() {
  return (
    <section id="statistics" className="section">
      <div className="section-inner">
        <h2 className="section-title">Dataset Statistics</h2>
        <p className="section-subtitle">
          Overview of how often different values of the framework appear across
          the {artworksData.length} annotated artworks.
        </p>

        <div className="stats-grid">
          <StatsChart
            title="Material and Processes - Frequency"
            fieldName="material_and_processes"
            barColor="#1f77b4"
          />

          <StatsChart
            title="Interaction - Frequency"
            fieldName="interaction"
            barColor="#2ca02c"
          />

          <StatsChart
            title="Outcome - Frequency"
            fieldName="outcome"
            barColor="#ffbf00"
          />
        </div>
      </div>
    </section>
  );
}

export default StatisticsPage;
