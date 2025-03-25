import Link from "next/link";
import CourseButton from "./CourseButton";
import { GitBranch } from "lucide-react";
import { Avatar } from "@heroui/react";

const CourseCard = ({
  courseTitle,
  posterURL,
  courseId,
  forkedFrom,
  coursePrice,
  category,
  instructureName,
  instructurePhotoURL,
  instructureUid,
}) => {
  //   const = courseData;

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
          <h2 className="font-semibold text-gray-800 hover:text-purple-600 transition duration-200 line-clamp-1">
            {courseTitle}
          </h2>
          
        </Link>
        {forkedFrom && (
            <div className="text-sm text-gray-600 flex items-center hover:text-purple-400">
              <GitBranch size={12} />
              <Link href={`/course/${forkedFrom}`}>{forkedFrom}</Link>
            </div>
          )}
        <div className="flex items-center justify-start mt-4 space-x-2 my-1">
          <Avatar showFallback src={instructurePhotoURL} className="w-5 h-5 rounded-full" />
          <p className="text-sm text-gray-600">{instructureName}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-semibold">&#36;{coursePrice}</div>
          <div className="text-gray-700 text-xs">{category}</div>
        </div>
        <CourseButton instructureUid={instructureUid} courseId={courseId} />
      </div>
    </div>
  );
};

export default CourseCard;
