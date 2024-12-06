import "./App.css";
import { useState, useEffect } from "react";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

console.log(apiUrl);


function App() {
//Build API to store the items, connect to the API and store the items
//Use the useState hook to store the items
const [items, setItems] = useState([]);

console.log(items);

//Use the useEffect hook to load the items from the API
const loadItems = () => {
  fetch({apiUrl})
    .then((response) => response.json())
    .then((data) => setItems(data));
}

//Use the useEffect hook to save the items to the API
useEffect(() => {
  fetch({apiUrl}, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(items),
  });
}, [items]);

//Add a new item to the list
const addItem = (item) => {
  setItems([...items, item]);
}

//Remove an item from the list
const removeItem = (index) => {
  const newItems = items.filter((item, i) => i !== index);
  setItems(newItems);
}

//Mark an item as bought
const markAsBought = (index) => {
  const newItems = items.map((item, i) => {
    if (i === index) {
      return { ...item, bought: true };
    }
    return item;
  });
  setItems(newItems);
}

//Build the UI to display the items
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
          />
          <button className="border-solid border-2 border-gray-400 p-2" onClick={() => addItem()}>
            Add
          </button>
        </div>
        <div className="flex justify-center">
          <ul className="border-solid border-2 border-gray-400 w-1/2">
            {items.map((item, index) => (
              <li key={index} className="border-solid border-2 border-gray-400 p-2">
                {item.name}
                <button onClick={() => removeItem(index)}>Remove</button>
                <button onClick={() => markAsBought(index)}>Mark as bought</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </>
);
}



  // //Use localstorage to store the items
  // //Use the useState hook to store the items
  // const [items, setItems] = useState([]);

  // //Use the useEffect hook to load the items from localstorage
  // const loadItems = () => {
  //   const items = localStorage.getItem("items");
  //   if (items) {
  //     setItems(JSON.parse(items));
  //   }
  // }

  // //Use the useEffect hook to save the items to localstorage

  // useEffect(() => {
  //   localStorage.setItem("items", JSON.stringify(items));
  // }
  // , [items]);

  // //Add a new item to the list
  // const addItem = (item) => {
  //   setItems([...items, item]);
  // }

  // //Remove an item from the list
  // const removeItem = (index) => {
  //   const newItems = items.filter((item, i) => i !== index);
  //   setItems(newItems);
  // }
  
  // //Mark an item as bought
  // const markAsBought = (index) => {
  //   const newItems = items.map((item, i) => {
  //     if (i === index) {
  //       return { ...item, bought: true };
  //     }
  //     return item;
  //   });
  //   setItems(newItems);
  // }




//   return (
//     <>
//       <div className="border-solid border-2">
//         <h1 className="m-6 p-6 text-center text-5xl">CHRISTMAS WISHLIST</h1>
//       </div>
//       <div className="flex justify-center m-4">
//         <div className="flex flex-col justify-center w-1/2">
//           <div className="flex justify-center m-4">
//             <input
//               type="text"
//               className="border-solid border-2 border-gray-400 p-2 w-1/2"
//               placeholder="Add a new item"
//             />
//             <button className="border-solid border-2 border-gray-400 p-2">
//               Add
//             </button>
//           </div>
//           <div className="flex justify-center">
//             <ul className="border-solid border-2 border-gray-400 w-1/2">
//               <li className="border-solid border-2 border-gray-400 p-2">
//                 Item 1
//               </li>
//               <li className="border-solid border-2 border-gray-400 p-2">
//                 Item 2
//               </li>
//               <li className="border-solid border-2 border-gray-400 p-2">
//                 Item 3
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default App;
