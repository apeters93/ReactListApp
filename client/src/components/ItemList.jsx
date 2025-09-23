import styled from "styled-components";
import "../App.css";

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const ItemList = ({ items, onDelete }) => {
  return (
    <>
      {items.map((item, index) => (
        <ul className="item-list" key={index}>
          <li>{item.name}</li>
          <DeleteButton onClick={() => onDelete(item.id)}>Delete</DeleteButton>
        </ul>
      ))}
    </>
  );
};

export default ItemList;
