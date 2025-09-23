import React from "react";
import "../App.css";

const ItemList = ({ items, onDelete }) => {
  return (
    <>
      {items.map((item, index) => (
        <ul className="item-list" key={index}>
          <li>{item.name}</li>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </ul>
      ))}
    </>
  );
};

export default ItemList;
