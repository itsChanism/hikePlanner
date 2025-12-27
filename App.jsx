import { useState } from "react";
import { TRAILS } from "./data/trails";
import { pickBestTrail } from "./logic/routePlanner";

function TrailMap({ trail }) {
  return (
    <svg width="600" height="300" style={{ background: "#0f172a", borderRadius: 12 }}>
      <polyline
        points={trail.geometry.map(p => `${p[0] * 60},${250 - p[1] * 20}`).join(" ")}
        fill="none"
        stroke={
          trail.difficulty === "hard"
            ? "#f97316"
            : trail.difficulty === "medium"
            ? "#38bdf8"
            : "#22c55e"
        }
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="20" y="30" fill="white" fontSize="16">
        {trail.name}
      </text>
    </svg>
  );
}

export default function App() {
  const [persona, setPersona] = useState("Challenger");
  const selected = pickBestTrail(TRAILS, persona);

  return (
    <div style={{ padding: 40, color: "white", fontFamily: "sans-serif" }}>
      <h1>HikeOS — Personalized Route Demo</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setPersona("Challenger")}>Challenger</button>{" "}
        <button onClick={() => setPersona("Explorer")}>Explorer</button>{" "}
        <button onClick={() => setPersona("Chiller")}>Chiller</button>
      </div>

      <TrailMap trail={selected} />

      <div style={{ marginTop: 20 }}>
        <p><b>Persona:</b> {persona}</p>
        <p><b>Distance:</b> {selected.length_km} km</p>
        <p><b>Elevation gain:</b> {selected.elevation_gain_m} m</p>
        <p><b>Safety score:</b> {selected.safety}</p>
      </div>
    </div>
  );
}