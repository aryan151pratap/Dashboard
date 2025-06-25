import { useState } from "react";

function Bar() {
  const [buttons, setButtons] = useState(["connect", "close"]);

  return (
    <>
      <div className="w-full h-fit fixed top-0 left-0 flex gap-2 p-2 bg-zinc-200/80 z-10">
        {buttons.map((i, index) => (
          <button
            key={index}
            className="capitalize font-semibold text-white bg-zinc-500 px-2 py-1 border-b-4 border-r-2 border-zinc-700 rounded-r-sm rounded-b-sm"
          >
            {i}
          </button>
        ))}
      </div>

      <div className="h-screen pt-14 w-10 bg-zinc-200">
        <p>hello</p>
      </div>
    </>
  );
}

export default Bar;
