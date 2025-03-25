import { deleteCourse } from "@/firebase/courses/delete";
import { Button } from "@heroui/react";
import { Edit2, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const MyCourseCard = ({ courseData }) => {
  const { courseTitle, posterURL, courseId } = courseData;
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteCourse = async () => {
    if (confirm("Are you sure you want to delete this course?")) {
      setIsLoading(true);
      try {
        await deleteCourse({ id: courseId });
        toast.success("Course deleted successfully!");
      } catch (error) {
        toast.error("Error deleting course.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform transition duration-300 ease-in-out">
      <Link href={`/course/${courseId}`}> 
        <img
          src={posterURL}
          alt={courseTitle}
          className="h-48 w-full object-cover hover:opacity-80"
        />
      </Link>
      <div className="p-4">
        <Link href={`/course/${courseId}`}>
          <h2 className="font-semibold text-gray-800 hover:text-purple-600 transition duration-200">
            {courseTitle}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 mt-2">5 Students Enrolled</p>
        <div className="flex items-center justify-end mt-4 space-x-2">
          <Link href={`/course/${courseId}`}>
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </Link>
          <Link href={`/my-courses/update-course?id=${courseId}`}>
            <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-100">
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </Link>
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            onPress={handleDeleteCourse}
            variant="ghost"
            size="sm"
            className="text-red-500 hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;

