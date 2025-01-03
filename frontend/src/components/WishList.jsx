const toys = [
  { name: "Water Gun" },
  { name: "Kite" },
  { name: "Lego Set" },
  { name: "Building Blocks" },
  { name: "Puzzle" },
  { name: "Board Game" },
  { name: "Action Figure" },
  { name: "Rubik's Cube" }
];


export default function Wishlist({
  items,
  value,
  setValue,
  postItem,
  removeItem,
}) {
  return (
    <div className="flex flex-col justify-center w-2/3 border p-2">
      {/* Input for adding a new wishlist item */}
      <div className="flex justify-center m-4">
        <input
          type="text"
          className="border-solid border-2 border-gray-400 p-2 w-1/2"
          placeholder="Add a new item"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="border-solid border-2 border-gray-400 p-2"
          onClick={() => postItem()}
        >
          Add
        </button>
      </div>

      {/* Mapped list of items */}
      {items.length === 0 ? (
        <div className="flex justify-center">
          <p>No items</p>
        </div>
      ) : (
        <>
      <ul role="list" className="divide-y divide-gray-100">
        {items.map((item, index) => (
          <li key={item.index} className="flex items-center justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4 items-center">
              <img alt="" src="/favicon.svg" className="size-12 flex-none rounded-full bg-gray-50" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">{item.name}</p>
                {/* <p className="mt-1 truncate text-xs/5 text-gray-500">{person.email}</p> */}
              </div>
            </div>
            <div>
              {/* TODO: build edit and complete buttons */}
            <button
              href="#"
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              href="#"
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => removeItem(index)}
            >
                 Remove
            </button>
            </div>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
      >
        Download Wishlist
      </a>
        </>
    )}
    
    </div>
  );
}
