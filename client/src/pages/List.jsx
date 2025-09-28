import { useState, useEffect } from "react";
import "../App.css";
import ItemList from "../components/ItemList";
import InputItem from "../components/InputItem";
import axios from "axios";
// import _ from "lodash";

const List = () => {
  const [itemsArray, setItemsArray] = useState([]);
  const [newItem, setNewItem] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  // const apiUrl = import.meta.env.VITE_RAILS_API_URL;
  const railsApiUrl = import.meta.env.VITE_RAILS_API_URL;

  console.log("ItemsArray:", itemsArray);

  const person1 = {
    id: 2,
    name: "Andrew",
    items: [],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log("Data from server:", response);
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

  // Example function to create an item via Rails API
  const createItem = async (itemData) => {
    try {
      const response = await axios.post(`${railsApiUrl}/items`, {
        item: {
          name: itemData.name,
          person_id: itemData.personId,
          type: itemData.type,
        },
      });
      console.log("Item created:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating item:",
        error.response?.data || error.message
      );
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
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="card">
        <p>My List of Items: </p>
        <ItemList items={itemsArray} onDelete={handleDelete} />
        <InputItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleAddItem}
        />

        <p>Total number of items: {itemsArray.length}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>This creates an item via the Rails API: </div>
        <InputItem
          id="rails-input"
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={() =>
            createItem({
              name: newItem,
              personId: person1.id,
              type: "personal",
            })
          }
        />
      </div>
    </div>
  );
};

export default List;
