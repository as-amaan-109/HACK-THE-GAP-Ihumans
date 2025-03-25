// "use client"
// import { getAllCourses } from "@/firebase/courses/read.server";
// import React, { useEffect, useState } from "react";
// import CourseCard from "./ui/CourseCard";
// import { useAllCourses } from "@/firebase/courses/read";
// import Loading from "../loading";

// const CoursesGridView = () => {
//   const {data:courses,error,isLoading} = useAllCourses();
//   if(error){
//     return <div className="text-red-400 w-full text-center">Error Fetching Courses {error?.message}</div>
//   }
//   if(isLoading){
//     return <Loading/>
//   }
//   const formattedCourses = courses?.map((course) => ({
//     ...course,
//     createdAt: course.createdAt?.seconds
//       ? new Date(course.createdAt.seconds * 1000).toISOString()
//       : null, // Convert Firestore Timestamp to a string
//   }));
//   if(courses){
//     console.log(courses)
//   }

//   return (
//     <>
//       <section className="flex flex-col gap-4 md:p-10">
//         <h1 className="text-center text-2xl font-semibold text-purple-500">
//           Explore All Courses
//         </h1>
//         <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
//           {formattedCourses?.length > 0 ? (
//             formattedCourses?.map((course) => (
//               <CourseCard {...course} key={course.courseId} />
//             ))
//           ) : (
//             <div className="text-red-400 font-xl font-semibold text-center my-2 w-full">
//               There Must be Error OR No Course available
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default CoursesGridView;
"use client";
import { getAllCourses } from "@/firebase/courses/read.server";
import React, { useEffect, useState } from "react";
import CourseCard from "./ui/CourseCard";

const CoursesGridView = ({ search = "" }) => {
  // const courses = await getAllCourses();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getAllCourses();
        const formattedCourses = coursesData?.map((course) => ({
          ...course,
          createdAt: course.createdAt?.seconds
            ? new Date(course.createdAt.seconds * 1000).toISOString()
            : null,
        }));
        setCourses(formattedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Fetch only once on mount

  // const formattedCourses = courses?.map((course) => ({
  //   ...course,
  //   createdAt: course.createdAt?.seconds
  //     ? new Date(course.createdAt.seconds * 1000).toISOString()
  //     : null, // Convert Firestore Timestamp to a string
  // }));

  const filteredCourses = courses?.filter((course) =>
    course.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="flex flex-col gap-4 md:p-10">
        <h1 className="text-center text-2xl font-semibold text-purple-500">
          Explore All Courses
        </h1>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
          {filteredCourses?.length > 0 ? (
            filteredCourses?.map((course) => (
              <CourseCard {...course} key={course.courseId} />
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-40">
              <p className="text-red-400 text-xl font-semibold text-center">
                There Must be an Error OR No Course Available
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CoursesGridView;

