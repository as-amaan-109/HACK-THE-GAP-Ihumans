"use client";

import CourseButton from "@/app/components/ui/CourseButton";
import CourseCard from "@/app/components/ui/CourseCard";
import Loading from "@/app/loading";
import { useCourse } from "@/firebase/courses/read";
import {  useEnrolledCourses } from "@/firebase/enrollcourse/read";
import Link from "next/link";
import { useSelector } from "react-redux";



const EnrolledCourses = () => {
  const user = useSelector((state) => state?.user);
  const { data, error, isLoading } = useEnrolledCourses({ uid: user?.uid });
  if(data){
    console.log(data)
  }
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
            <MyEnrolledCard key={course?.courseId} courseId={course.courseId} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You Have Not Created Any Courses Yet.</p>
      )}
    </div>
  );
};

export default EnrolledCourses;




const MyEnrolledCard = ({courseId}) => {
 const {data:course} = useCourse({id:courseId})

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform transition duration-300 ease-in-out">
      <Link href={`/course/${courseId}`}>
        <img
          src={course?.posterURL}
          alt={course?.courseTitle}
          className="h-48 w-full object-cover hover:opacity-80"
        />
      </Link>
      <div className="p-4">
        <Link href={`/course/${courseId}`}>
          <h2 className="font-semibold text-gray-800 hover:text-purple-600 transition duration-200 line-clamp-1">
            {course?.courseTitle}
          </h2>
        </Link>
        <div className="flex items-center justify-start mt-4 space-x-2 my-1">
          <img src={course?.instructurePhotoURL} className="w-5 h-5 rounded-full" />
          <p className="text-sm text-gray-600">{course?.instructureName}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-semibold">&#36;{course?.coursePrice}</div>
          <div className="text-gray-700 text-xs">{course?.category}</div>
        </div>
        <CourseButton instructureUid={course?.instructureUid} courseId={courseId} />
      </div>
    </div>
  );
};


