import MyCoursesDisplay from "@/app/components/MyCoursesDisplay";
import Loading from "@/app/loading";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const MyCourses = () => {
  return (
    <>
      <div className="bg-white rounded-md mx-auto  w-full py-2  px-2 md:p-6 lg:px-10">
        <div className="flex items-center justify-between">
          <div className="text-purple-500 text-lg">My Courses</div>
          <div>
            <Link
              href={`/my-courses/create-course`}
              className="flex items-center text-purple-400 px-4 py-2 rounded-lg border border-purple-400 hover:bg-purple-500 hover:text-white transition-all ease-in"
            >
              <Plus />
              New Course
            </Link>
          </div>
        </div>
          <hr className="my-2" />
          <div>
            <MyCoursesDisplay/>
          </div>
      </div>
    </>
  );
};

export default MyCourses;
