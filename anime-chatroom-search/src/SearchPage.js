// src/SearchPage.js
import React, { useState } from "react";

function SearchPage({ onSuccess }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (input === "741258") {
      onSuccess();
    } else {
      setError("error");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontFamily: "Arial", color: "#4285f4", fontSize: 60, marginBottom: 30 }}>Goolge</h1>
      <form onSubmit={handleSearch} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="password"
          value={input}
          onChange={e => { setInput(e.target.value); setError(""); }}
          placeholder="请输入搜索内容"
          style={{ width: 300, height: 40, fontSize: 18, borderRadius: 20, border: "1px solid #ccc", padding: "0 20px" }}
        />
        <button type="submit" style={{ marginTop: 20, width: 120, height: 40, borderRadius: 20, background: "#4285f4", color: "#fff", border: "none", fontSize: 18 }}>搜索</button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </form>
    </div>
  );
}

export default SearchPage;