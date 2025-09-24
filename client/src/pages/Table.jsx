import React, { useState } from "react";
// import styled from "styled-components";
import "../App.css";

const Table = () => {
  const [data] = useState([
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 24 },
    { id: 3, name: "Charlie", age: 35 },
  ]);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
