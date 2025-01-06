import "./App.css";
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Wishlist from "./components/WishList";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [token, setToken] = useState(() => {
    //initialize token from local storage
    const savedToken = localStorage.getItem("token");
    return savedToken ? JSON.parse(savedToken) : null;
  });
  const [items, setItems] = useState([]); // Stores the user's wishlist
  const [value, setValue] = useState(""); // Tracks new item input

  // Function to handle user logout

  const handleLogout = () => {
    setToken(null); // Clear the token to log out the user
    setItems([]); // Clear the wishlist
  };

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    if (token) {
      const loadItems = async () => {
        const response = await fetch(`${apiUrl}api/wishlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const items = await response.json();
          setItems(items);
        } else {
          alert("Failed to fetch wishlist. Please try again.");
        }
      };
      loadItems();
    }
  }, [token]);

  // Add a new item to the wishlist

  const postItem = async () => {
    if (!value.trim()) {
      alert("Item name cannot be empty!");
      return;
    }

    const response = await fetch(`${apiUrl}api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: value }),
    });

    if (response.ok) {
      const value = await response.json();
      setItems([...items, value]);
      setValue(""); // Clear the input field
    } else {
      alert("Failed to add item. Please try again.");
    }
  };

  // Remove an item from the wishlist

  const removeItem = async (index) => {
    const response = await fetch(`${apiUrl}api/wishlist/${items[index].id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const values = items.filter((item, i) => i !== index);
      setItems(values);
    } else {
      alert("Failed to remove item. Please try again.");
    }
  };

  //TODO: Add edit button to the Wishlist component

  const editItem = async (index) => {
    const response = await fetch(`${apiUrl}api/wishlist/${items[index].id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: value }),
    });

    if (response.ok) {
      const item = await response.json();
      const values = [...items];
      values[index] = item;
      setItems(values);
    } else {
      alert("Failed to edit item. Please try again.");
    }
  };

  return (
    <div>
      <Nav handleLogout={handleLogout} token={token} />
      <Logo />
      <main className="flex justify-center m-4">
        {!token ? (
          // Render Login Form when the user is not logged in
          <LoginForm setToken={setToken} />
        ) : (
          // Render Wishlist when the user is logged in
          <>
            <Wishlist
              items={items}
              value={value}
              setValue={setValue}
              postItem={postItem}
              removeItem={removeItem}
              editItem={editItem}
            />
          </>
        )}
      </main>
        <Footer />
    </div>
  );
}
