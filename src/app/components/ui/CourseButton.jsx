"use client";

import { useEnrolledCourse } from "@/firebase/enrollcourse/read";
import { enrollToCourse } from "@/firebase/enrollcourse/write";
import { createFork } from "@/firebase/fork/write";
import { Button } from "@heroui/react";
import { Edit, Play, BookOpen, GitBranch } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CourseButton = ({ courseId, instructureUid }) => {
  const user = useSelector((state) => state?.user);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useEnrolledCourse({
    uid: user?.uid,
    courseId: courseId,
  });

  const handleEnrollNow = async () => {
    if (!user) {
      toast.error("Please Login First");
      return;
    }
    try {
      setIsLoading(true);
      await enrollToCourse({ courseId: courseId, uid: user.uid });
      toast.success("Enrolled to course");
    } catch (error) {
      console.log(error);
      toast.error("Error in Enrolling to Course");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFrok = async()=>{
    try {
      const result = await createFork({courseId:courseId,uid:user?.uid})
      toast.success("Created Frok Successfully :",result)
      // console.log(result)
    } catch (error) {
      console.log(error)
      toast.error(error?.message || "Error Creating Frok")
    }finally{

    }
  }
  // Style constants
  const baseButtonClasses = "flex items-center justify-center gap-2 font-medium transition-all duration-300 shadow-md hover:shadow-lg rounded-lg";
  const primaryButtonClasses = `${baseButtonClasses} bg-purple-400 hover:bg-purple-500 text-white px-6 py-3`;
  const secondaryButtonClasses = `${baseButtonClasses} bg-transparent border border-purple-400 text-purple-500 hover:bg-purple-50 px-4 py-2`;

  if (user?.uid === instructureUid) {
    return (
      <div className="flex flex-col sm:flex-row gap-1 w-full">
        <Link href={`/my-courses/update-course?id=${courseId}`} className="w-full sm:w-auto">
          <Button className={secondaryButtonClasses}>
            <Edit size={18} className="mr-1" />
            Edit
          </Button>
        </Link>
        <Link href={`/enrolled-courses/${courseId}`} className="w-full sm:w-auto flex-1">
          <Button className={primaryButtonClasses}>
            <Play size={18} className="mr-1" />
            Learn Now
          </Button>
        </Link>
      </div>
    );
  }

  if (data) {
    return (
      <div className="md:flex gap-2">
      <Link href={`/enrolled-courses/${courseId}`} className="w-full sm:w-auto">
        <Button className={`${primaryButtonClasses} w-full`}>
          <BookOpen size={20} className="mr-2" />
          Learn
        </Button>
      </Link>
      {/* <Link href={`/enrolled-courses/${courseId}`} className="w-full sm:w-auto"> */}
        <Button className={`${secondaryButtonClasses} w-full sm:w-auto`} onPress={handleFrok} isDisabled={isLoading} isLoading={isLoading}>
          <GitBranch size={20} className="mr-2" />
          Fork
        </Button>
      {/* </Link> */}
      </div>
    );
  }

  return (
    <Button 
      onPress={handleEnrollNow} 
      disabled={isLoading} 
      className={`${primaryButtonClasses} w-full relative overflow-hidden`}
    >
      {isLoading ? (
        <>
          <span className="absolute inset-0 bg-purple-500 opacity-50"></span>
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
              fill="none"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Enrolling...
        </>
      ) : (
        "Enroll Now"
      )}
    </Button>
  );
};

export default CourseButton;