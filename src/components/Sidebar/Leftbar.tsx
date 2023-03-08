import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useState } from "react";
const Leftbar = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className={`mt-20 relative ${open ? "w-72" : "w-20"} duration-700`}>
        <h1>leftbar</h1>
        <BsArrowLeftShort
          onClick={() => setOpen(!open)}
          className={`bg-white text-dirkPurple text-3xl rounded-full absolute -right-1 top-9 border-2  cursor-pointer ${
            !open && "rotate-180"
          }`}
        />
      </div>
    </>
  );
};

export default Leftbar;
