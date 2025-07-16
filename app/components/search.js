"use client";

import Image from "next/image";
import { useState } from "react";
import SearchIcon from "../assets/images/header/search.png";

export default function Search() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", { category, query });
  };

  return (
    <>
      <div className="container mx-auto max-w-[1400px] flex items-center gap-[22px]">
        <form
          onSubmit={handleSearch}
          className="flex flex-row gap-5 bg-gray-100/15 px-4 py-1 rounded-xl"
        >
          {/* Input */}
          <input
            type="text"
            placeholder="Search your needs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="focus:outline-none focus:ring-0"
          />

          {/* Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=""
          >
            <option value="all">Web Developer</option>
            <option value="users">Users</option>
            <option value="products">Products</option>
            <option value="orders">Orders</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="bg-primary text-white p-[15px] rounded-full hover:bg-primary/90 transition"
          >
            <Image src={SearchIcon} alt="icon" />
          </button>
        </form>
        <div className="bg-primary px-[26px] py-[14px] rounded-full">
          <p className="text-[14px] font-semibold">Advanced Search</p>
        </div>
      </div>
    </>
  );
}
