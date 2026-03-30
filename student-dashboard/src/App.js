import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as chartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

chartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [averages, setAverages] = useState(null);
  const [top5, setTop5] = useState([]);

  useEffect(() => {
    fetch("https://student-api-joho.onrender.com/average")
      .then(res => res.json())
      .then(data => setAverages(data));

    fetch("https://student-api-joho.onrender.com/top5student")
      .then(res => res.json())
      .then(data => setTop5(data));
  }, []);

  const chartData = averages && {
    labels: Object.keys(averages),
    datasets: [{
      label: "Average Scores",
      data: Object.values(averages),
      backgroundColor: ["#a855f7", "#6366f1", "#818cf8"],
      borderRadius: 8,
      borderSkipped: false,
    }]
  };

  const options = {
    plugins: {
      legend: {
        labels: { color: darkMode ? "white" : "#1e1b4b" }
      }
    },
    scales: {
      x: { ticks: { color: darkMode ? "white" : "#1e1b4b" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: darkMode ? "white" : "#1e1b4b" }, grid: { color: "rgba(255,255,255,0.1)" } }
    }
  };

  // Glass card style
  const glassCard = {
    background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.25)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    padding: "20px",
  };

  const bg = darkMode
    ? "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
    : "linear-gradient(135deg, #667eea, #764ba2)";

  return (
    <div style={{ fontFamily: "Arial", minHeight: "100vh", background: bg, padding: "30px", transition: "all 0.4s ease" }}>

      {/* Dark/Light Toggle */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "10px 20px",
            borderRadius: "30px",
            border: "2px solid rgba(255,255,255,0.4)",
            cursor: "pointer",
            background: "rgba(255,255,255,0.15)",
            color: "white",
            fontWeight: "bold",
            backdropFilter: "blur(10px)",
            fontSize: "14px",
            transition: "all 0.3s ease"
          }}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "white", fontSize: "2.2rem", margin: 0, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
          🎓 Student Performance Dashboard
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "8px" }}>
          Powered by Python Flask + React
        </p>
      </div>

      {/* Average Score Cards */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
        {averages && Object.entries(averages).map(([subject, score]) => (
          <div key={subject} style={{ ...glassCard, textAlign: "center", minWidth: "150px" }}>
            <h2 style={{ color: "white", margin: 0, fontSize: "2rem" }}>{score}</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", margin: "6px 0 0", textTransform: "capitalize" }}>{subject} avg</p>
          </div>
        ))}
      </div>

      {/* Top 5 Table */}
      <div style={{ maxWidth: "750px", margin: "0 auto 40px", ...glassCard }}>
        <h2 style={{ color: "white", marginTop: 0 }}>🏆 Top 5 Math Scorers</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(168,85,247,0.6)", color: "white" }}>
              <th style={{ padding: "12px", borderRadius: "8px 0 0 8px" }}>Rank</th>
              <th style={{ padding: "12px" }}>Gender</th>
              <th style={{ padding: "12px" }}>Math</th>
              <th style={{ padding: "12px" }}>Reading</th>
              <th style={{ padding: "12px", borderRadius: "0 8px 8px 0" }}>Writing</th>
            </tr>
          </thead>
          <tbody>
            {top5.map((student, index) => (
              <tr key={index} style={{
                textAlign: "center",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                transition: "background 0.2s"
              }}>
                <td style={{ padding: "12px" }}>#{index + 1}</td>
                <td style={{ padding: "12px" }}>{student.gender}</td>
                <td style={{ padding: "12px", color: "#a855f7", fontWeight: "bold" }}>{student['math score']}</td>
                <td style={{ padding: "12px" }}>{student['reading score']}</td>
                <td style={{ padding: "12px" }}>{student['writing score']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar Chart */}
      {chartData && (
        <div style={{ maxWidth: "650px", margin: "0 auto 40px", ...glassCard }}>
          <Bar data={chartData} options={options} />
        </div>
      )}

      {/* Footer */}
      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", marginTop: "10px" }}>
        Built by Ayush Dubey | Flask + React + Pandas 🚀
      </p>

    </div>
  );
}

export default App;