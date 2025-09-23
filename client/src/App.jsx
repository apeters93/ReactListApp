import { useState, useEffect } from "react";
import "./App.css";
import ItemList from "./components/ItemList";
import InputItem from "./components/InputItem";
import axios from "axios";
// import _ from "lodash";

function App() {
  const [itemsArray, setItemsArray] = useState([]);
  const [newItem, setNewItem] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  console.log("ItemsArray:", itemsArray);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log("Data from server:", response.data.stuff);
        setItemsArray(response.data.stuff);
      } catch (error) {
        console.error("Error fetching data from server:", error);
      }
    };
    fetchData();
  }, [apiUrl]);

  const handleAddItem = async (itemName) => {
    try {
      const response = await axios.post(`${apiUrl}/items`, {
        name: itemName,
      });

      console.log("Item added successfully:", response.data.item);
      // response.data.item contains: { id, name, created_at }
    } catch (error) {
      console.error(
        "Error adding item:",
        error.response?.data?.error || error.message
      );
      alert("Item name is required");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${apiUrl}/items/${itemId}`);
      setItemsArray((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error.response?.data?.error);
      alert("Failed to delete item");
    }
  };

  return (
    <>
      <div className="card">
        <p>My List of Items: </p>
        <ItemList items={itemsArray} onDelete={handleDelete} />
        <InputItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleAddItem}
        />
      </div>
    </>
  );
}

export default App;
