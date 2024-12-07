import "./App.css";
import { useState, useEffect } from "react";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

console.log(apiUrl);

function App() {
  //Use the useState hook to store the items
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  console.log(newItem);

  // Use the useEffect hook to load the items from the server
  useEffect(() => {
    const loadItems = async () => {
      const response = await fetch(`${apiUrl}`);
      if (response.ok) {
        const items = await response.json();
        setItems(items);
      }
    };
    loadItems();
  }, []);

  //Build API to store the items, connect to the API and store the items on the server, using the fetch API
  const postItem = async () => {
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newItem }),
    });
    if (response.ok) {
      const item = await response.json();
      setItems([...items, item]);
    }
  };

  //Build API to remove the items, connect to the API and remove the items on the server, using the fetch API
  const removeItem = async (index) => {
    const response = await fetch(`${apiUrl}/${items[index].id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const newItems = items.filter((item, i) => i !== index);
      setItems(newItems);
    }
  };
  
  return (
    <>
      <div className="border-solid border-2">
        <h1 className="m-6 p-6 text-center text-5xl">CHRISTMAS WISHLIST</h1>
      </div>
      <div className="flex justify-center m-4">
        <div className="flex flex-col justify-center w-1/2">
          <div className="flex justify-center m-4">
            <input
              type="text"
              className="border-solid border-2 border-gray-400 p-2 w-1/2"
              placeholder="Add a new item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button
              className="border-solid border-2 border-gray-400 p-2"
              onClick={() => postItem({ newItem })}
            >
              Add
            </button>
          </div>
          {items.length === 0 ? (
            <div className="flex justify-center">
              <p>No items</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <ul className="border-solid border-2 border-gray-400 w-1/2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="border-solid border-2 border-gray-400 p-2"
                  >
                    {item.name}
                    <button onClick={() => removeItem(index)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
