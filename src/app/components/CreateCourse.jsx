"use client";

import { Accordion, AccordionItem, Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createCourse } from "@/firebase/courses/write";
import { useSelector } from "react-redux";
import CustomBtn from "./CustomBtn";
import { useRouter, useSearchParams } from "next/navigation";
import { Brain, BrainCircuit, Trash } from "lucide-react";
import { generateCourse } from "@/models/generateCourse";
import EditChapters from "./EditChapters";
import MdEditor from "./Md";
import AddChapter from "./AddChapter";
import { categoriesList, courseLang, courseLevel } from "@/constants/constants";

const CreateCourse = () => {
  const user = useSelector((state) => state.user);
  const [courseChapters, setCourseChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [data, setData] = useState({
    courseTitle: "",
    shortDescription: "",
    category: "",
    level: "",
    language: "",
    coursePrice: "",
    description: "",
    posterURL: "",
    isForked: false,
    forkedFrom: null,
    mergeRequests: [],
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const gCourse = searchParams.get("c");

  console.log(gCourse);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !data?.courseTitle ||
      !data?.shortDescription ||
      !data?.category ||
      !data?.level ||
      !data?.language ||
      !data?.coursePrice ||
      !data?.description ||
      !data?.posterURL
    ) {
      toast.error("Please Fill Form Completely, there are missing Fields");
      return;
    }

    setIsLoading(true);
    try {
      const courseId = await createCourse({
        data: data,
        courseChapters: courseChapters,
        instructureUid: user?.uid,
        instructureName: user?.displayName,
        instructurePhotoURL: user?.photoURL,
        instructureEmail: user?.email,
      });
      toast.success(`Course Created Successfully (ID: ${courseId})`);
      router.push("/my-courses");
    } catch (error) {
      toast.error(error?.message || "Failed to create course");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateWithAi = async () => {
    setIsLoading(true);
    try {
      const response = await generateCourse(data, aiPrompt);
      const resData = JSON.parse(await response);
      if (resData.course_analysis) {
        const {
          courseTitle,
          shortDescription,
          category,
          level,
          language,
          coursePrice,
          description,
          chapters,
        } = resData.course_analysis;

        setData((prevData) => ({
          ...prevData,
          courseTitle,
          shortDescription,
          category,
          level,
          language,
          coursePrice,
          description,
        }));
        setCourseChapters(chapters);
        toast.success("Course Generated");
      }
    } catch (error) {
      toast.error("Error Generating course with AI");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (gCourse) {
      setAiPrompt(`generate course on ${gCourse}`);
    }
  }, [gCourse]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-6 md:p-8 transform transition-all hover:shadow-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-500 bg-clip-text">
            Craft Your Course
          </h1>
          <Button
            color="secondary"
            variant="shadow"
            onPress={handleSubmit}
            isLoading={isLoading}
            disabled={isLoading}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Create
          </Button>
        </div>

        <hr className="mb-8 border-purple-200" />

        {/* Form */}
        <div className="space-y-8">
          {/* Course Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Course Title
            </label>
            <input
              required
              type="text"
              name="courseTitle"
              value={data.courseTitle}
              onChange={handleInputChange}
              placeholder="Enter Course Title"
              className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
            />
          </div>

          {/* Poster Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Poster Image URL
            </label>
            <input
              required
              type="text"
              name="posterURL"
              value={data.posterURL}
              onChange={handleInputChange}
              placeholder="Paste Poster Image URL"
              className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
            />
            {data?.posterURL && (
              <img
                src={data.posterURL}
                alt="Poster Preview"
                className="mt-4 w-56 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
                onError={() => toast.error("Invalid poster URL")}
              />
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Short Description
            </label>
            <input
              required
              type="text"
              name="shortDescription"
              value={data.shortDescription}
              onChange={handleInputChange}
              placeholder="Enter Short Description"
              className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
            />
          </div>

          {/* Category, Level, Language */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Category
              </label>
              <select
                required
                name="category"
                value={data.category}
                onChange={handleInputChange}
                className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
              >
                <option value="">Select Category</option>
                {categoriesList.map((cat, ind) => (
                  <option value={cat} key={ind}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Level
              </label>
              <select
                required
                name="level"
                value={data.level}
                onChange={handleInputChange}
                className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
              >
                <option value="">Select Level</option>
                {courseLevel.map((level, ind) => (
                  <option value={level} key={ind}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Language
              </label>
              <select
                required
                name="language"
                value={data.language}
                onChange={handleInputChange}
                className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
              >
                <option value="">Select Language</option>
                {courseLang.map((lang, ind) => (
                  <option value={lang} key={ind}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Course Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Course Price
            </label>
            <input
              required
              type="number"
              name="coursePrice"
              value={data.coursePrice}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || (Number(value) >= 0 && !isNaN(value))) {
                  handleInputChange(e);
                }
              }}
              placeholder="Enter Price"
              className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
              min="0"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Course Description
            </label>
            <textarea
              required
              name="description"
              value={data.description}
              onChange={handleInputChange}
              rows="6"
              placeholder="Write your course description here..."
              className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
            />
          </div>

          {/* AI Prompt */}
          <div>
            <label className="block text-sm font-semibold text-purple-500 mb-2">
              🔮 Generate with AI
            </label>
            <textarea
              name="aiPrompt"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows="3"
              placeholder="Describe the course you want to generate..."
              className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
            />
            <Button
              startContent={<BrainCircuit className="w-5 h-5" />}
              color="secondary"
              isLoading={isLoading}
              isDisabled={isLoading}
              variant="ghost"
              onPress={handleGenerateWithAi}
              className="mt-3 bg-purple-100 text-purple-500 hover:bg-purple-200 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Generate with AI ✨
            </Button>
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="max-w-4xl mx-auto bg-transparent mt-8">
        {courseChapters.map((chapter, ind) => (
          <EditChapters
            key={ind}
            chapter={chapter}
            ind={ind}
            courseData={data}
            courseChapters={courseChapters}
            setCourseChapters={setCourseChapters}
          />
        ))}
        <AddChapter
          courseChapters={courseChapters}
          setCourseChapters={setCourseChapters}
        />
      </div>
    </div>
  );
};

export default CreateCourse;
