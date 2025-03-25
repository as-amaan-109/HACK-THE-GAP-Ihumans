"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import { BrainCircuit, Trash } from "lucide-react";
import MdEditor from "./Md";
import toast from "react-hot-toast";
import { generateChapterContent } from "@/models/generateChapterContent";

const EditChapters = ({
  courseData,
  chapter,
  courseChapters,
  ind,
  setCourseChapters,
}) => {
  const [chapterAiPrompt, setChapterAiPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to update chapter content
  const updateChapterContent = (index, content) => {
    setCourseChapters((prevChapters) => {
      const updatedChapters = [...prevChapters];
      updatedChapters[index] = {
        ...updatedChapters[index],
        chapterContent: content,
      };
      return updatedChapters;
    });
  };

  const handleGenerateContentWithAi = async () => {
    setIsLoading(true);
    console.log(
      courseData,
      courseChapters,
      chapter.title,
      chapter.description,
      chapterAiPrompt
    );
    try {
      const response = await generateChapterContent(
        courseData,
        courseChapters,
        chapter.title,
        chapter.description,
        chapterAiPrompt
      );
      const chapterCon = JSON.parse(await response);
      console.log(chapterCon);
      if (chapterCon.chapterContent) {
        updateChapterContent(ind, chapterCon.chapterContent);
        toast.success("Chapter Content Generated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Generate Content for Chapter");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteChapter = () => {
    setCourseChapters((prevData) =>
      prevData.filter((item) => item !== chapter)
    );
  };

  return (
    <div className="relative">
      {/* Delete Button */}
      <Button
        isIconOnly
        onPress={handleDeleteChapter}
        className="absolute top-0 right-0 bg-red-100 text-red-500 hover:bg-red-200 rounded-full p-2 shadow-md transition-all duration-300 transform hover:scale-110"
      >
        <Trash size={16} />
      </Button>

      {/* Accordion */}
      <Accordion variant="splitted" className="">
        <AccordionItem
          key={ind}
          aria-label={`Chapter ${ind + 1}`}
          title={
            <span className="text-lg font-semibold text-purple-500">
              {`${ind + 1}. ${chapter?.title || "Untitled Chapter"}`}
            </span>
          }
          subtitle={
            <span className="text-sm text-gray-600">
              {chapter?.description || "No description provided"}
            </span>
          }
          className="my-2" // Copied from second component
        >
          <div>
            <div>
              <label htmlFor="chapterAiPrompt">
                🔮 Generate Chapter Contents with Ai
              </label>
              <textarea
                id="chapterAiPrompt"
                rows="2" // Changed from 3 to match second component
                value={chapterAiPrompt}
                onChange={(e) => setChapterAiPrompt(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-purple-300 outline-none" // Copied from second component
                placeholder="Write short description of chapter you want to generate" // Updated placeholder text
              />
              <Button
                startContent={<BrainCircuit />}
                color="secondary"
                isLoading={isLoading}
                isDisabled={isLoading}
                variant="ghost"
                onPress={handleGenerateContentWithAi}
                className="my-1" // Copied from second component
              >
                Generate With Ai ✨
              </Button>
            </div>
            <MdEditor
              chapterContent={chapter?.chapterContent || ""}
              setChapterContent={(content) =>
                updateChapterContent(ind, content)
              }
            />
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default EditChapters;
