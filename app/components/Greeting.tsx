import React, { useState } from "react";

const Greeting = ({ name }: { name: string }) => {
  const [world, setWorld] = useState("Cumilla");

  return (
    <>
      <h1>
        Hello, {name}! <br />
        From - {world}
      </h1>

      <div className="mt-10">
        <input
          className="border border-gray-300 p-2 rounded-md"
          type="text"
          onChange={(e) => setWorld(e.target.value)}
          placeholder="Enter location"
        />
      </div>
    </>
  );
};
export default Greeting;
