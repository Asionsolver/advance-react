import { useState } from "react";

export const ButtonCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <button
      className="bg-blue-500 text-white px-6 py-4 rounded"
      onClick={() => setCount(count + 1)}
    >
      Increment{" "}
      <span className="font-bold text-amber-500 px-3 py-3 bg-white rounded-full ml-4">
        {count}
      </span>
    </button>
  );
};
