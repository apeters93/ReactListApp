import React from "react";
import styled from "styled-components";
import "../App.css";

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

const InputItem = ({ newItem, setNewItem, handleAddItem }) => {
  return (
    <form onSubmit={() => handleAddItem(newItem)}>
      <div className="input">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item name"
        ></input>
        <Button type="submit">Add Item</Button>
      </div>
    </form>
  );
};

export default InputItem;
