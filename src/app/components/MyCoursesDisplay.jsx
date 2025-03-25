"use client";

import { useCourses } from "@/firebase/courses/read";
import React from "react";
import { useSelector } from "react-redux";
import Loading from "../loading";
import MyCourseCard from "./ui/MyCourseCard";

const MyCoursesDisplay = () => {
  const user = useSelector((state) => state?.user);
  const { data, error, isLoading } = useCourses({ uid: user?.uid });

  if (error) {
    return (
      <div className="p-2 text-red-400 bg-red-100 rounded-md">
        {error}
      </div>
    );
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      

      {data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data?.map((course) => (
            <MyCourseCard key={course?.courseId} courseData={course} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You Have Not Created Any Courses Yet.</p>
      )}
    </div>
  );
};

export default MyCoursesDisplay;
