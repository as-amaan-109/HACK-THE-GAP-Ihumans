"use client";

import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const AddChapter = ({ courseChapters, setCourseChapters }) => {
  const [chapter, setChapter] = useState({
    title: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setChapter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddChapter = () => {
    setCourseChapters((prevChapters) => [...prevChapters, chapter]);
    setChapter({
      title: "",
      description: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-8 my-8 transform transition-all hover:shadow-2xl">
      <h2 className="text-xl md:text-2xl font-bold text-purple-500 mb-6">
        Add a New Chapter
      </h2>
      <div className="space-y-6">
        {/* Chapter Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Chapter Title
          </label>
          <input
            type="text"
            name="title"
            value={chapter.title}
            onChange={handleOnChange}
            placeholder="Enter Chapter Title"
            className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
          />
        </div>

        {/* Chapter Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Chapter Description
          </label>
          <input
            type="text"
            name="description"
            value={chapter.description}
            onChange={handleOnChange}
            placeholder="Enter Chapter Description"
            className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
          />
        </div>

        {/* Add Button */}
        <Button
          startContent={<Plus className="w-5 h-5" />}
          color="secondary"
          onPress={handleAddChapter}
          className="w-full md:w-auto bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Add Chapter
        </Button>
      </div>
    </div>
  );
};

export default AddChapter;