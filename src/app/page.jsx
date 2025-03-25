"use client";

import Image from "next/image";
import Header from "./components/Header";
import { Search } from "lucide-react";
import CoursesGridView from "./components/CoursesGridView";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header />
      <section className="w-full bg-fixed bg-[url('https://i.ibb.co/DPBgHTG5/Screenshot-2025-03-12-000505.png')] h-[400px] bg-no-repeat bg-cover bg-top">
        <div className="flex flex-col justify-center items-center w-full h-[100%] bg-black bg-opacity-35">
          <h1 className="text-white text-xl backdrop-blur-md px-4 py-1 rounded-full font-semibold">
            All the Skills you need in one place
          </h1>
          <form className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="search for course"
              className="ps-9 text-lg rounded-full px-3 py-2 bg-white border shadow-lg outline-none w-11/12 md:w-96"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </section>
      <CoursesGridView search={search} />
    </>
  );
}
