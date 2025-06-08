import React, { useState } from "react";

const lineData = [
  { month: "Jan", sales: 30 },
  { month: "Feb", sales: 50 },
  { month: "Mar", sales: 45 },
  { month: "Apr", sales: 60 },
  { month: "May", sales: 70 },
  { month: "Jun", sales: 55 },
];

const pieData = [
  { category: "Admin", value: 3 },
  { category: "Editor", value: 5 },
  { category: "Viewer", value: 2 },
];

const COLORS = ["#4b7bec", "#20bf6b", "#fa8231"];

export default function Charts() {
  const [activeChart, setActiveChart] = useState("line");

  return (
    <div>
      <div className="chart-toggle">
        <button
          onClick={() => setActiveChart("line")}
          className={activeChart === "line" ? "active" : ""}
        >
          Line Chart
        </button>
        <button
          onClick={() => setActiveChart("pie")}
          className={activeChart === "pie" ? "active" : ""}
        >
          Pie Chart
        </button>
      </div>

      <div className="chart-container">
        {activeChart === "line" && (
          <svg viewBox="0 0 300 150" className="line-chart">
            {/* Axis */}
            <line x1="30" y1="10" x2="30" y2="130" stroke="#666" />
            <line x1="30" y1="130" x2="290" y2="130" stroke="#666" />
            {/* Points and lines */}
            {lineData.map((point, i) => {
              const x = 30 + (i * 45);
              const y = 130 - point.sales * 1.6;
              return (
                <React.Fragment key={point.month}>
                  {i > 0 && (
                    <line
                      x1={30 + (i - 1) * 45}
                      y1={130 - lineData[i - 1].sales * 1.6}
                      x2={x}
                      y2={y}
                      stroke="#4b7bec"
                      strokeWidth="2"
                    />
                  )}
                  <circle cx={x} cy={y} r="4" fill="#4b7bec" />
                  <text x={x - 10} y="145" fontSize="10" fill="#333">
                    {point.month}
                  </text>
                </React.Fragment>
              );
            })}
          </svg>
        )}

        {activeChart === "pie" && (
          <svg viewBox="0 0 150 150" className="pie-chart">
            {(() => {
              const total = pieData.reduce((acc, cur) => acc + cur.value, 0);
              let cumulativePercent = 0;

              return pieData.map((slice, index) => {
                const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                cumulativePercent += slice.value / total;
                const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

                const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;

                const pathData = [
                  `M 75 75`,
                  `L ${75 + startX * 75} ${75 + startY * 75}`,
                  `A 75 75 0 ${largeArcFlag} 1 ${75 + endX * 75} ${75 + endY * 75}`,
                  `Z`,
                ].join(" ");

                return (
                  <path key={index} d={pathData} fill={COLORS[index % COLORS.length]} />
                );
              });
            })()}
          </svg>
        )}
      </div>
    </div>
  );
}

// Helper function for pie slices
function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent - Math.PI / 2);
  const y = Math.sin(2 * Math.PI * percent - Math.PI / 2);
  return [x, y];
}
