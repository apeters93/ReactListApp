import styled from "styled-components";
import "../App.css";

const AddButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
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
        <AddButton type="submit">Add Item</AddButton>
      </div>
    </form>
  );
};

export default InputItem;
