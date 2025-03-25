import { deleteFork } from "@/firebase/fork/delete";
import { publishForkedCourse } from "@/firebase/fork/publish";
import { createMergeRequest } from "@/firebase/merge/write";
import { Avatar, Button } from "@heroui/react";
import {
  Award,
  BookOpen,
  BookOpenCheck,
  Calendar,
  Copy,
  DollarSign,
  Edit2,
  Eye,
  EyeIcon,
  FileText,
  GitPullRequestArrow,
  Globe,
  Mail,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const FrokedCourse = ({ courseData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  // Extract course data from the object
  const {
    category,
    courseChapters,
    courseId,
    coursePrice,
    courseTitle,
    createdAt,
    description,
    forkedCourseId,
    forkedFrom,
    id,
    instructureEmail,
    instructureName,
    instructurePhotoURL,
    instructorURL,
    isForked,
    language,
    level,
    mergeRequestId,
    mergeRequestStatus,
    mergeRequests,
    posterURL,
    shortDescription,
  } = courseData;

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const handleDeleteFork = async () => {
    if (confirm("Sure you want to delete fork")) {
      setIsLoading(true);
      try {
        await deleteFork({ uid: user?.uid, forkedCourseId: forkedCourseId });
        toast.success("deleted couse successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error deleting Fork");
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handlePublishFork = async () => {
    if (confirm("Sure you want to Publish fork")) {
      setIsLoading(true);
      try {
        await publishForkedCourse({
          uid: user?.uid,
          forkedCourseId: forkedCourseId,
          instructureUid: user?.uid,
          instructureName: user?.displayName,
          instructureEmail: user?.email,
          instructurePhotoURL: user?.photoURL,
        });
        toast.success("course published successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error publishing Fork");
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleCreateMerge = async () => {
    if (confirm("Sure you want to Create Merge Request")) {
      setIsLoading(true);
      try {
        const dataToMerge = {
          forkedCourseId: forkedCourseId,
          requestedBy: {
            email: user?.email,
            username: user?.displayName,
            photoURL: user?.photoURL,
          },
          status: "pending",
          category: category,
          courseChapters: courseChapters,
          coursePrice: coursePrice,
          courseTitle: courseTitle,
          description: description,
          language: language,
          level: level,
          posterURL: posterURL,
          shortDescription: shortDescription,
        };
        await createMergeRequest({
          courseId: courseId,
          forkedCourseData: dataToMerge,
        });
        toast.success("Merge Request Sent");
      } catch (error) {
        console.log(error);
        toast.error("Error creating Merge Request");
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="my-3 border-b  relative bg-white text-gray-800 rounded-lg overflow-hidden shadow-xl max-w-4xl mx-auto border border-purple-100">
      <div className="relative z-20 top-0 left-0 flex flex-wrap gap-2 bg-slate-100 p-2">
        <Link href={`/fork-preview/${forkedCourseId}`}>
          <Button variant="ghost" size="sm">
            <EyeIcon className="w-4 h-4 mr-1" />
            View
          </Button>
        </Link>
        <Link href={`/my-forks/update-fork?forkedCourseId=${forkedCourseId}`}>
          <Button
            variant="ghost"
            size="sm"
            className="text-purple-600 hover:bg-purple-100"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </Link>
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          onPress={handleDeleteFork}
          variant="ghost"
          size="sm"
          className="text-red-500 hover:bg-red-100"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          onPress={handlePublishFork}
          variant="ghost"
          size="sm"
          className="text-green-500 hover:bg-green-100"
        >
          <BookOpenCheck className="w-4 h-4 mr-1" />
          Publish
        </Button>
        <Button
          onPress={handleCreateMerge}
          isDisabled={isLoading}
          isLoading={isLoading}
          // variant="ghost"
          size="sm"
          className="text-green-500 bg-black"
        >
          <GitPullRequestArrow className="w-4 h-4 mr-1" />
          Create Merge Request
        </Button>
      </div>
      {/* Course Header with Banner Image */}
      <div className="relative h-48 bg-purple-100 overflow-hidden">
        {posterURL && (
          <img
            src={posterURL}
            alt={courseTitle}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/80 to-purple-400/70 flex flex-col justify-end p-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-white text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {category && category}
            </span>
            {isForked && (
              <span className="bg-white text-purple-500 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                <Copy className="w-3 h-3 mr-1" /> Forked
              </span>
            )}
            <span className="bg-white text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <Award className="w-3 h-3 mr-1" /> {level}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">{courseTitle}</h1>
          <p className="mt-1 text-sm text-white/90">
            {shortDescription || description}
          </p>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Course Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">${coursePrice}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Chapters</p>
                <p className="font-medium">
                  {courseChapters?.length || 0} Chapters
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">{formatDate(createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Language</p>
                <p className="font-medium">{language}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Instructor Info */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center mb-3">
                <div className="mr-3">
                  {instructurePhotoURL ? (
                    <Avatar
                      showFallback
                      src={instructurePhotoURL}
                      alt={instructureName}
                      className="w-10 h-10 rounded-full border-2 border-purple-400"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{instructureName}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Mail className="w-3 h-3 mr-1" /> {instructureEmail}
                  </p>
                </div>
              </div>

              {instructorURL && (
                <a
                  href={instructorURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-500 hover:text-purple-600 flex items-center mt-2"
                >
                  <Globe className="w-4 h-4 mr-1" /> Instructor Profile
                </a>
              )}
            </div>

            {/* Fork Info (if applicable) */}
            {isForked && (
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Copy className="w-4 h-4 mr-1 text-purple-500" /> Fork
                  Information
                </h3>
                <Link href={`/course/${forkedFrom}`} className="text-sm mb-1 text-purple-600 underline">
                  <span className="">Forked From:</span>{" "}
                  {forkedFrom}
                </Link>
                <p className="text-sm">
                  <span className="text-gray-500">Original ID:</span>{" "}
                  {forkedCourseId}
                </p>

                {mergeRequestStatus && (
                  <div className="mt-2 flex items-center">
                    <span className="text-gray-500 text-sm mr-2">
                      Merge Status:
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        mergeRequestStatus === "pending"
                          ? "bg-yellow-400 text-yellow-800"
                          : "bg-green-400 text-green-800"
                      }`}
                    >
                      {mergeRequestStatus}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Course Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center text-purple-700">
            <FileText className="w-5 h-5 mr-2 text-purple-500" />
            Course Description
          </h2>
          <p className="text-gray-700">{description}</p>
        </div>

        {/* Course Chapters */}
        {/* <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center text-purple-700">
            <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
            Course Chapters
          </h2>
          <div className="space-y-2">
            {courseChapters && courseChapters.length > 0 ? (
              courseChapters.map((chapter, index) => (
                <div
                  key={index}
                  className="p-3 bg-purple-50 rounded-lg border border-purple-100 flex items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center mr-3">
                    <span className="font-medium">{index + 1}</span>
                  </div>
                  <span className="text-gray-700">
                    {chapter?.title} {index + 1}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No chapters available</p>
            )}
          </div>
        </div> */}

        {/* Course ID Info */}
        <div className="mt-6 pt-4 border-t border-purple-100 text-sm text-gray-500">
          <p>Course ID: {courseId}</p>
          <p>Fork ID: {id}</p>
        </div>
      </div>
    </div>
  );
};

export default FrokedCourse;
