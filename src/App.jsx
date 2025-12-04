import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClassificationPage from "./pages/ClassificationPage";
import StatisticsPage from "./pages/StatisticsPage";
import LibraryPage from "./pages/LibraryPage";
import BestPracticesPage from "./pages/BestPracticesPage";
import ReferencesPage from "./pages/ReferencesPage";
import "./index.css";
import logoDark from "./assets/arcworld-logo-dark.svg";

function App() {
  return (
    <div className="app">
      <header className="top-bar">
        <div className="logo-wrap">
          <img src={logoDark} alt="ARC-World logo" className="logo-img" />
        </div>

        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/library">Library</NavLink>
          <NavLink to="/classification">Classification</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
          <NavLink to="/best-practices">Best Practices</NavLink>
          <NavLink to="/references">References</NavLink>
        </nav>
      </header>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/classification" element={<ClassificationPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/best-practices" element={<BestPracticesPage />} />
          <Route path="/references" element={<ReferencesPage />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>ARC-World - prototype for research on software-based artworks.</p>
      </footer>
    </div>
  );
}

export default App;
