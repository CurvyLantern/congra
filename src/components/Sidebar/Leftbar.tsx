import React from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { HiChevronUpDown } from "react-icons/hi2";
// const data = ["nasim", "naim", "naimul", "naimul islam", "naimul islam nasim"];

const Leftbar = () => {
  const [open, setOpen] = useState(false);
  const [demoList, setDemoList] = useState("");
  const [query, setQuery] = useState("");

  const {
    isLoading,
    error,
    data: satellites,
  } = useQuery({
    queryKey: ["names"],

    queryFn: () =>
      fetch(`http://localhost:8000/v1/info/satellite/${query}`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) throw error;

  const handlechange = (value: string) => {
    setQuery(value);
  };

  return (
    <div className={` relative ${open ? "w-72" : "w-20"} duration-700 p-2`}>
      <h1 className="text-center">Satellite</h1>
      <BsArrowLeftShort
        onClick={() => setOpen(!open)}
        className={` mt-2 transition-transform duration-500  bg-white text-dirkPurple text-3xl rounded-full absolute right-0 top-9 border-2 cursor-pointer ${
          open ? "rotate-0" : "rotate-180"
        }`}
      />
      {/* search icon  */}

      <div className="relative">
        <Combobox onChange={setDemoList} value={demoList}>
          <div
            className={`flex items-center rounded-md ${
              open && "bg-lightWhite"
            }  mt-10 px-4 py-2`}
          >
            <BsSearch
              onClick={() => setOpen(!open)}
              className={`text-white text-2xl block float-left cursor-pointer `}
            />
            <Combobox.Input
              type="search"
              placeholder="search"
              className={` ml-2 text-base bg-transparent w-full text-white focus:outline-none ${
                !open && "hidden"
              }`}
              onChange={(e) => handlechange(e.target.value)}
            />
          </div>
          <Combobox.Button
            className={`absolute right-2 bottom-3 ${!open && "hidden"}`}
          >
            <HiChevronUpDown className={`aria-hidden:true`} />
          </Combobox.Button>
          <Combobox.Options
            className={` absolute w-full bg-white text-black p-2`}
          >
            {satellites.map((name, index) => (
              <Combobox.Option
                className={`bg-blue-400`}
                key={index}
                value={name}
              >
                {name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </div>

      {/* location icon  */}
      <div className="  mt-10 px-4 ">
        <FaMapMarkerAlt
          onClick={() => setOpen(!open)}
          className="text-white text-2xl block float-left"
        />
        <div
          className={`flex ${
            !open ? "opacity-0" : "opacity-100 transition-opacity duration-700"
          }`}
        >
          <input
            type="text"
            className="p-1 w-1/2 ml-2  bg-lightWhite text-white rounded-md focus:outline-none"
          />
          <span className=" relative ml-1 mr-1 top-1">to</span>
          <input
            type="text"
            className="w-1/2 bg-lightWhite text-white rounded-md focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
