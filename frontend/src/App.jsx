import "./App.css";
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Wishlist from "./components/WishList";
import Logo from "./components/Logo";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [token, setToken] = useState(null); // Stores the JWT token
  const [items, setItems] = useState([]); // Stores the user's wishlist
  const [newItem, setNewItem] = useState(""); // Tracks new item input

  // Function to handle user logout
  const handleLogout = () => {
    setToken(null); // Clear the token to log out the user
    setItems([]); // Clear the wishlist
  };

  // Fetch the wishlist after the user logs in
  useEffect(() => {
    if (token) {
      const loadItems = async () => {
        const response = await fetch(`${apiUrl}/wishlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const items = await response.json();
          setItems(items);
        } else {
          alert("Failed to fetch wishlist. Please log in again.");
          handleLogout();
        }
      };
      loadItems();
    }
  }, [token]);

  // Add a new item to the wishlist
  const postItem = async () => {
    if (!newItem.trim()) {
      alert("Item name cannot be empty!");
      return;
    }

    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newItem }),
    });

    if (response.ok) {
      const item = await response.json();
      setItems([...items, item]);
      setNewItem(""); // Clear the input field
    } else {
      alert("Failed to add item. Please try again.");
    }
  };

  // Remove an item from the wishlist
  const removeItem = async (index) => {
    const response = await fetch(`${apiUrl}/wishlist/${items[index].id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const newItems = items.filter((item, i) => i !== index);
      setItems(newItems);
    } else {
      alert("Failed to remove item. Please try again.");
    }
  };

  //TODO: Add edit button to the Wishlist component
  const editItem = async (index) => {
    const response = await fetch(`${apiUrl}/wishlist/${items[index].id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newItem }),
    });

    if (response.ok) {
      const item = await response.json();
      const newItems = [...items];
      newItems[index] = item;
      setItems(newItems);
    } else {
      alert("Failed to edit item. Please try again.");
    }
  }

  return (
    <div>
      <Logo />
            <main className="flex justify-center m-4">
        {!token ? (
          // Render Login Form when the user is not logged in
          <LoginForm setToken={setToken} />
        ) : (
          // Render Wishlist when the user is logged in
          <Wishlist
            items={items}
            newItem={newItem}
            setNewItem={setNewItem}
            postItem={postItem}
            removeItem={removeItem}
          />
        )}
      </main>
    </div>
  );
}

