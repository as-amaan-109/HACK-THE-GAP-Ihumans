"use client";

import React from "react";
import { useSelector } from "react-redux";
import Loading from "../loading";

import { useAllForkedCourses } from "@/firebase/fork/read";
import MyCourseCard from "./ui/MyCourseCard";
import FrokedCourse from "./ForkedCourse";

const MyForksDisplay = () => {
  const user = useSelector((state) => state?.user);
  const { data, error, isLoading } = useAllForkedCourses({ uid: user?.uid });
  if (data) {
    console.log(data);
  }
  if (error) {
    return (
      <div className="p-2 text-red-400 bg-red-100 rounded-md">{error}</div>
    );
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-2">
       {!data?.length && <div className="text-2xl text-red-400 text-center w-full"> No forks Found</div>}
      {data?.length && data?.map((fork,ind)=><FrokedCourse key={ind} courseData={fork}/>)}
    </div>
  );
};

export default MyForksDisplay;
