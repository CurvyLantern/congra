import React from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";

import { useState } from "react";
const Leftbar = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div
        className={`mt-20 relative ${open ? "w-72" : "w-20"} duration-700 p-2`}
      >
        <h1 className="text-center">Satalite</h1>
        <BsArrowLeftShort
          onClick={() => setOpen(!open)}
          className={`bg-white text-dirkPurple text-3xl rounded-full absolute -right-1 top-9 border-2 border-white  cursor-pointer ${
            !open && "rotate-180"
          }`}
        />
        <div
          className={`flex items-center rounded-md ${
            open && "bg-lightWhite"
          }  mt-10 px-4 py-2`}
        >
          <BsSearch
            className={`text-white text-2xl block float-left cursor-pointer mr-2`}
          />
          <input
            type="search"
            placeholder="search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${
              !open && "hidden"
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default Leftbar;
