import React, { useState } from "react";

const data = [
  { id: 1, name: "Dipa", role: "Admin", age: 30 },
  { id: 2, name: "Raj", role: "Editor", age: 25 },
  { id: 3, name: "Priya", role: "Viewer", age: 35 },
  { id: 4, name: "Puja", role: "Editor", age: 28 },
];

export default function Table() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th onClick={() => requestSort("name")}>Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</th>
          <th onClick={() => requestSort("role")}>Role {sortConfig.key === "role" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</th>
          <th onClick={() => requestSort("age")}>Age {sortConfig.key === "age" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(({ id, name, role, age }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{role}</td>
            <td>{age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
