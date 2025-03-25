"use client";

import { useCourse } from "@/firebase/courses/read";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  BookOpen,
  BrainCircuit,
  ConeIcon,
} from "lucide-react";
import MdChapterContent from "@/app/components/MdChapterContent";
import { Button } from "@heroui/react";
import PopupChatbot from "@/app/components/PopupChatbot";
import { regenerateChapterContents } from "@/models/regenerateChaptercontent";
import toast from "react-hot-toast";
import Link from "next/link";

const EnrolledCourse = () => {
  const { course_id } = useParams();
  const { data: course } = useCourse({ id: course_id });
  const [activeChapter, setActiveChapter] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [regenrationPrompt, setRegenerationPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // Set the first chapter as active when course data loads
    if (course?.courseChapters?.length && activeChapter === null) {
      setActiveChapter(course.courseChapters[0]);
    }
  }, [course, activeChapter]);

  // Scroll to top of content area when active chapter changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeChapter]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleChapterChange = (chapter) => {
    setActiveChapter(chapter);
    // For mobile, close drawer when selecting a chapter
    setIsDrawerOpen(false);
  };
  const handleRegerateChapterContents = async () => {
    setIsLoading(true);
    try {
      const { courseChapters, ...courseOverviewData } = course;
      const courseChapterTitles = courseChapters?.map(
        (chapter) => chapter?.title
      );
      // console.log({courseData:courseOverviewData,courseChaptersTitles:courseChapterTitles,currentChapter:activeChapter,prompt:regenrationPrompt})
      const res = await regenerateChapterContents({
        courseData: courseOverviewData,
        courseChaptersTitles: courseChapterTitles,
        currentChapter: activeChapter,
        prompt: regenrationPrompt,
      });
      const regeneratedContents = JSON.parse(await res);
      // console.log(regeneratedContents?.chapterContent)
      if (!regeneratedContents?.chapterContent) {
       throw new Error("Error Regenerating Course")
      }
      setActiveChapter((prevContent) => {
        return {
          prevContent,
          chapterContent: regeneratedContents?.chapterContent,
        };
      });
      toast.success("Courrse Regerated")
      setRegenerationPrompt("")
    } catch (error) {
      console.log("Error Regenrating Course Contents");
      toast.error("Failed to regerate",error?.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <PopupChatbot />
        {/* Header */}
        <div className="w-full p-4 bg-purple-600 text-white sticky top-0 z-40 flex justify-between items-center shadow-md">
          <Link href={`/course/${course_id}`} className="text-xl md:text-2xl font-semibold truncate">
            {course?.courseTitle}
          </Link>
          <button
            onClick={toggleDrawer}
            className="p-2 rounded-full hover:bg-purple-700 transition-colors md:hidden"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${
            isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleDrawer}
        >
          <div
            className={`w-4/5 max-w-sm h-full bg-white transition-transform duration-300 transform p-4 overflow-y-auto ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-purple-600">
                Chapters
              </h2>
              <button
                onClick={toggleDrawer}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            <ChaptersList
              chapters={course?.courseChapters}
              activeChapter={activeChapter}
              setActiveChapter={handleChapterChange}
              isMobile={true}
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden md:block w-full md:w-1/4 lg:w-1/5 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-purple-600 flex items-center gap-2">
                <BookOpen size={20} />
                <span>Chapters</span>
              </h2>
            </div>
            <ChaptersList
              chapters={course?.courseChapters}
              activeChapter={activeChapter}
              setActiveChapter={handleChapterChange}
            />
          </div>

          {/* Content Area */}
          <div ref={contentRef} className="flex-1 p-4 overflow-y-auto">
            {activeChapter ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">
                  {activeChapter.title}
                </h2>
                <div className="prose max-w-none">
                  {activeChapter.chapterContent ? (
                    <>
                      <MdChapterContent
                        chapterContent={activeChapter.chapterContent}
                      />
                      <hr className="my-4" />
                      <div>
                        <label className="block text-sm font-semibold text-purple-500 mb-2">
                          🔮 Dynamiclly Adjust With Ai
                        </label>
                        <textarea
                          name="aiPrompt"
                          value={regenrationPrompt}
                          onChange={(e) =>
                            setRegenerationPrompt(e.target.value)
                          }
                          rows="3"
                          placeholder="Describe What Adjustments you want in current Chapter Ex: want described in more detail / add more examples "
                          className="w-full p-4 border border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-purple-50/50 hover:bg-purple-50"
                        />
                        <Button
                          startContent={<BrainCircuit className="w-5 h-5" />}
                          color="secondary"
                          isLoading={isLoading}
                          isDisabled={isLoading}
                          variant="ghost"
                          onPress={handleRegerateChapterContents}
                          className="mt-3 bg-purple-100 text-purple-500 hover:bg-purple-200 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                        >
                          Renerate ✨
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-gray-100 rounded-lg text-gray-600">
                      This chapter has no content yet.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                Select a chapter to view its content
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default EnrolledCourse;

const ChaptersList = ({
  chapters,
  activeChapter,
  setActiveChapter,
  isMobile = false,
}) => {
  return (
    <div className={`${isMobile ? "space-y-2" : "divide-y divide-gray-200"}`}>
      {chapters?.length > 0 ? (
        chapters.map((chapter, index) => (
          <ChapterItem
            key={index}
            chapter={chapter}
            index={index}
            isActive={activeChapter?.title === chapter.title}
            onClick={() => setActiveChapter(chapter)}
            isMobile={isMobile}
          />
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">
          No chapters available
        </div>
      )}
    </div>
  );
};

const ChapterItem = ({ chapter, index, isActive, onClick, isMobile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const hasSubsections = chapter.subsections && chapter.subsections.length > 0;

  return (
    <div className={`${isMobile ? "mb-1" : ""}`}>
      <div
        className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
          isActive
            ? "bg-purple-100 text-purple-700 font-medium"
            : "hover:bg-gray-50"
        }`}
        onClick={onClick}
      >
        <div className="flex items-start space-x-2 min-w-0">
          <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-sm mt-0.5">
            {index + 1}
          </span>
          <span className="text-sm md:text-base break-words w-full">
            {chapter.title}
          </span>
        </div>
        {hasSubsections && (
          <button
            onClick={toggleExpand}
            className="p-1 rounded-full hover:bg-gray-200 flex-shrink-0 ml-2"
          >
            {isExpanded ? (
              <ChevronDown size={16} className="text-gray-600" />
            ) : (
              <ChevronRight size={16} className="text-gray-600" />
            )}
          </button>
        )}
      </div>

      {hasSubsections && isExpanded && (
        <div className="pl-8 pr-3 pb-2 bg-gray-50">
          {chapter.subsections.map((subsection, idx) => (
            <div
              key={idx}
              className="py-2 px-3 text-sm border-l-2 border-purple-200 my-1 cursor-pointer hover:bg-gray-100 rounded break-words"
            >
              {subsection.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
