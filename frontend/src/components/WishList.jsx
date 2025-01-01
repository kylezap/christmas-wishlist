const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
]

const toys = [
  { name: "Water Gun" },
  { name: "Building Blocks" },
  { name: "Kite" },
  { name: "Lego Set" },
  { name: "Building Blocks" },
  { name: "Puzzle" },
  { name: "Puzzle" },
  { name: "Board Game" },
  { name: "Action Figure" },
  { name: "Rubik's Cube" }
];


export default function Wishlist({
  items,
  newItem,
  setNewItem,
  postItem,
  removeItem,
}) {
  return (
    <div className="flex flex-col justify-center w-1/3 border p-2">
      <ul role="list" className="divide-y divide-gray-100">
        {toys.map((toy) => (
          <li key={toy.name} className="flex items-center justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img alt="" src="/favicon.svg" className="size-12 flex-none rounded-full bg-gray-50" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">{toy.name}</p>
                {/* <p className="mt-1 truncate text-xs/5 text-gray-500">{person.email}</p> */}
              </div>
            </div>
            <div>
              {/* TODO: build edit and complete buttons */}
            {/* <a
              href={person.href}
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Edit
            </a>
            <a
              href={person.href}
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Remove
            </a> */}
            </div>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
      >
        View all
      </a>
    </div>
    // <div className="flex flex-col justify-center w-1/2">
    //   {/* Input for adding a new wishlist item */}
    //   <div className="flex justify-center m-4">
    //     <input
    //       type="text"
    //       className="border-solid border-2 border-gray-400 p-2 w-1/2"
    //       placeholder="Add a new item"
    //       value={newItem}
    //       onChange={(e) => setNewItem(e.target.value)}
    //     />
    //     <button
    //       className="border-solid border-2 border-gray-400 p-2"
    //       onClick={postItem}
    //     >
    //       Add
    //     </button>
    //   </div>

    //   {/* Display the wishlist items */}
    //   {items.length === 0 ? (
    //     <div className="flex justify-center">
    //       <p>No items</p>
    //     </div>
    //   ) : (
    //     <div className="flex justify-center">
    //       <ul className="border-solid border-2 border-gray-400 w-1/2">
    //         {items.map((item, index) => (
    //           <li
    //             key={index}
    //             className="border-solid border-2 border-gray-400 p-2 flex justify-between"
    //           >
    //             {item.name}
    //             <button
    //               className="ml-4 text-red-500"
    //               onClick={() => removeItem(index)}
    //             >
    //               Remove
    //             </button>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </div>
  );
}
