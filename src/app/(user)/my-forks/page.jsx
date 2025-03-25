import MyCoursesDisplay from "@/app/components/MyCoursesDisplay";
import MyForksDisplay from "@/app/components/MyForksDisplay";
import Loading from "@/app/loading";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const MyForks = () => {
  return (
    <>
      <div className="bg-white rounded-md mx-auto  w-full py-2  px-2 md:p-6 lg:px-10">
        <div className="flex items-center justify-between">
          <div className="text-purple-500 text-lg">My Forked Courses</div>
        </div>
          <hr className="my-2" />
          <div>
            <MyForksDisplay/>
          </div>
      </div>
    </>
  );
};

export default MyForks;