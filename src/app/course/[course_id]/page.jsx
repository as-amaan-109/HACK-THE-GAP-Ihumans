"use client";



import CourseDetailsCard from "@/app/components/ui/CourseDetailsCard";
import Loading from "@/app/loading";
import { useCourse } from "@/firebase/courses/read";
import { useParams } from "next/navigation";
import React from "react";

const CoursePage = () => {
  const { course_id } = useParams();
  const { data: course, error, isLoading } = useCourse({ id: course_id });
  console.log('data',course);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div className="text-red-500 p-2 ">{error?.message}</div>;
  }
  return (
    <div className="w-full p-1">
      {/* CoursePage {course_id}, {JSON.stringify(course)} */}
       <CourseDetailsCard courseData={course} />;

    </div>
  );
};

export default CoursePage;
