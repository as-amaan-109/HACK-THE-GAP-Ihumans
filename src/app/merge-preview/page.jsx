"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ChaptersList } from "../(user)/fork-preview/[forkedcourse_id]/page";
import { BookOpen, Menu, X } from "lucide-react";
import { useMergeRequest } from "@/firebase/merge/read";
import MdChapterContent from "../components/MdChapterContent";
import Loading from "../loading";

const MergePreviewPage = () => {
  // Move all hooks to the top
  const searchParams = useSearchParams();
  const course_id = searchParams.get("cid");
  const merge_request_id = searchParams.get("mrid");
  const { data: course, error, isLoading } = useMergeRequest({
    courseId: course_id,
    mergeRequestId: merge_request_id,
  });
  const [activeChapter, setActiveChapter] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const contentRef = useRef(null);

  // Define useEffect hooks
  useEffect(() => {
    // Set the first chapter as active when course data loads
    if (course?.courseChapters?.length && activeChapter === null) {
      setActiveChapter(course.courseChapters[0]);
    }
  }, [course, activeChapter]);

  useEffect(() => {
    // Scroll to top of content area when active chapter changes
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeChapter]);

  // Define functions after hooks
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleChapterChange = (chapter) => {
    setActiveChapter(chapter);
    setIsDrawerOpen(false); // Close drawer on mobile after selection
  };

  // Conditional rendering after hooks
  if (error) {
    return (
      <div className="w-full text-red-400 bg-red-50 p-4 rounded-lg shadow-sm border border-red-200 text-center">
        <span className="font-medium">Error Fetching Merge Requests:</span>{" "}
        {error?.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-12">
        <Loading />
      </div>
    );
  }

  // Main render
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-full p-4 bg-purple-600 text-white sticky top-0 z-40 flex justify-between items-center shadow-md">
        <h1 className="text-xl md:text-2xl font-semibold truncate">
          {course?.courseTitle}
        </h1>
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
                  <MdChapterContent
                    chapterContent={activeChapter.chapterContent}
                  />
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
  );
};

export default MergePreviewPage;