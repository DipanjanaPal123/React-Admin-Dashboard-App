import React, { useState, useEffect } from "react";
import ThemeToggle from "./components/ThemeToggle";
import Table from "./components/Table";
import Charts from "./components/Charts";
import Calendar from "./components/Calendar";
import KanbanBoard from "./components/KanbanBoard";

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="app-container">
      <header>
        <h1>React Admin Dashboard App</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>

      <main>
        <section className="dashboard-grid">
          <div className="card">
            <h2>Data Table</h2>
            <Table />
          </div>

          <div className="card">
            <h2>Charts</h2>
            <Charts />
          </div>

          <div className="card">
            <h2>Calendar</h2>
            <Calendar />
          </div>

          <div className="card kanban-card">
            <h2>Kanban Board</h2>
            <KanbanBoard />
          </div>
        </section>
      </main>
    </div>
  );
}
