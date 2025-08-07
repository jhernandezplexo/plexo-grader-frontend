"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{ url: string; performance_score: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = "https://plexo-grader-backend.onrender.com";

  const handleScan = async () => {
    if (!url) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/scan?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (data.performance_score) {
        setResult(data);
      } else {
        setError("Failed to get performance score.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Plexo Grader</h1>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter your restaurant's website URL"
        style={{ padding: "0.5rem", width: "300px", marginRight: "1rem" }}
      />

      <button
        onClick={handleScan}
        style={{ padding: "0.5rem 1rem", backgroundColor: "#000", color: "#fff" }}
      >
        {loading ? "Scanning..." : "Scan"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Results for: {result.url}</h3>
          <p>Performance Score: <strong>{result.performance_score}</strong></p>
        </div>
      )}
    </main>
  );
}

