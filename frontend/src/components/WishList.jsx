
export default function Wishlist({
  items,
  value,
  setValue,
  postItem,
  removeItem,
  editItem,
}) {
  return (
    <div className="flex flex-col justify-center w-2/3 border p-2">
      {/* Input for adding a new wishlist item */}
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <h3 className="text-base font-semibold text-gray-900">My List</h3>
          <p className="mt-1 text-sm text-gray-500">
            Click the add button to add a new item to your list.
          </p>
        </div>
      <div className="flex justify-center m-4">
        <input
          type="text"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          placeholder="Add a new item"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
        <div className="ml-4 mt-4 shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={postItem}
          >
            Add
          </button>
        </div>
      </div>
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
              className="m-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              href="#"
              className="m-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
