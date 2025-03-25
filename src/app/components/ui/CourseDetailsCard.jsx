"use client";
import React from "react";
import {
  Cloud,
  UserCircle,
  BookOpen,
  TrendingUp,
  DollarSign,
  Globe,
  Blocks,
  Plus,
  Heart,
  GitFork,
  SquareChartGantt,
  Clock,
  Users,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CourseReviews from "./Review";
import { Avatar, Button } from "@heroui/react";
import CourseButton from "./CourseButton";
import { useSelector } from "react-redux";
import MergeRequestCard from "./MergeRequestCard";
import MergeRequest from "../MergeRequest";
import Contributers from "./Contributers";

const CourseDetailsCard = ({ courseData }) => {
  const { course_id } = useParams();
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Main Content Column */}
        <div className="w-full md:w-8/12 p-4 md:p-8 bg-white shadow-xl rounded-3xl overflow-hidden border border-purple-100">
          {/* Course Header with Poster - Enhanced with gradient overlay */}
          <div className="relative mb-8 rounded-2xl overflow-hidden group transition-all">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-800/40 to-transparent z-10"></div>
            <img
              src={courseData.posterURL}
              alt={courseData.courseTitle}
              className="w-full h-56 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-purple-900/90 to-transparent">
              <div className="flex items-center justify-between">
                <h1 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
                  {courseData.courseTitle}
                </h1>
                <span className="bg-yellow-400 text-purple-900 font-bold px-4 py-1 rounded-full text-sm">
                  ${courseData.coursePrice}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-yellow-300">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} className="text-yellow-300/50" />
                  <span className="ml-1 text-white text-sm">(4.2)</span>
                </div>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <Users size={14} />
                  <span>1.2k students</span>
                </div>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <Clock size={14} />
                  <span>20 hours total</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Details Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Course Details */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
                  <BookOpen className="mr-2" size={22} />
                  Course Description
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {courseData.description}
                </p>
              </div>

              {/* Course Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="bg-purple-200 p-2 rounded-lg">
                    <TrendingUp className="text-purple-700" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      Level
                    </p>
                    <p className="font-semibold text-purple-800">
                      {courseData.level}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="bg-purple-200 p-2 rounded-lg">
                    <Blocks className="text-purple-700" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      Category
                    </p>
                    <p className="font-semibold text-purple-800">
                      {courseData.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="bg-purple-200 p-2 rounded-lg">
                    <Globe className="text-purple-700" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      Language
                    </p>
                    <p className="font-semibold text-purple-800">
                      {courseData.language}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="bg-purple-200 p-2 rounded-lg">
                    <DollarSign className="text-purple-700" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      Price
                    </p>
                    <p className="font-semibold text-purple-800">
                      ${courseData.coursePrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Instructor */}
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl text-center shadow-lg transform hover:-translate-y-1 transition-all">
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-purple-300 blur-md transform -translate-x-1 translate-y-1"></div>
                  <Avatar
                    showFallback
                    src={courseData.instructurePhotoURL}
                    className="w-28 h-28 border-4 border-white shadow-xl relative z-10 object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-2">
                  {courseData.instructureName}
                </h3>
                <p className="text-sm bg-purple-600 text-white px-3 py-1 rounded-full mb-4 inline-block">
                  Course Instructor
                </p>
                <p className="text-sm text-purple-800 italic bg-white/70 p-3 rounded-lg shadow-inner">
                  "{courseData.shortDescription}"
                </p>
                <Button
                  className="mt-4 bg-white text-purple-700 hover:bg-purple-50 transition-all"
                  variant="flat"
                  size="sm"
                >
                  View Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-10 text-center">
            <div className="relative w-full">
              <div className="relative z-10">
                <CourseButton
                  instructureUid={courseData.instructureUid}
                  courseId={courseData.courseId}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="flex-1 w-auto p-6 bg-white shadow-xl rounded-3xl overflow-hidden border border-purple-100">
          {/* Engagement Stats */}
          <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-purple-50 to-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <Button
                variant="shadow"
                isIconOnly
                className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-0 hover:scale-110 transition-transform duration-300 relative"
              >
                <div className="absolute -inset-1 bg-pink-400 rounded-full animate-pulse opacity-30"></div>
                <Heart className="h-5 w-5 relative z-10" />
              </Button>
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 text-lg">3k</span>
                <span className="text-xs text-gray-500">Likes</span>
              </div>
            </div>

            <div className="h-10 w-px bg-gradient-to-b from-transparent via-purple-200 to-transparent"></div>

            <div className="flex items-center gap-3">
              <Button
                color="secondary"
                variant="light"
                endContent={<GitFork className="h-5 w-5" />}
                className="flex items-center font-semibold hover:bg-purple-100 transition-all hover:shadow-md px-4 py-2 rounded-lg"
              >
                <div className="flex flex-col mr-1">
                  <span className="font-bold text-gray-800 text-lg">180</span>
                  <span className="text-xs text-gray-500">Forks</span>
                </div>
              </Button>
            </div>
          </div>
          {courseData?.contributers?.length && (
            <div className="w-full p-2 md:p-3 bg-slate-100 rounded-xl">
              <h3 className="text-sm p-1 text-purple-500">Contributers</h3>
              <Contributers contributers={courseData.contributers} />
            </div>
          )}
          <hr className="h-px my-6 bg-gradient-to-r from-transparent via-purple-200 to-transparent border-0" />

          {/* Chapters Section */}
          <div>
            {courseData?.courseChapters?.length > 0 && (
              <div className="text-purple-700 text-xl font-bold mb-4 flex items-center">
                <BookOpen className="mr-2" />
                Course Chapters
              </div>
            )}

            {courseData?.courseChapters?.length > 0 &&
              courseData?.courseChapters.map((chapter, ind) => (
                <div
                  className="p-4 border border-purple-200 rounded-xl my-3 bg-gradient-to-r from-purple-50 to-white flex items-center gap-3 hover:shadow-md transition-all cursor-pointer group"
                  key={ind}
                >
                  <div className="bg-purple-100 text-purple-700 font-bold rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                    {ind + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 group-hover:text-purple-700 transition-all">
                      {chapter.title}
                    </div>
                    {chapter.duration && (
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock size={12} className="mr-1" />
                        {chapter.duration}
                      </div>
                    )}
                  </div>
                  <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition-all">
                    <SquareChartGantt size={18} />
                  </div>
                </div>
              ))}
          </div>

          {/* Additional Resources or Benefits */}
          {!courseData?.courseChapters?.length && (
            <div className="bg-purple-50 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-purple-800 mb-4">
                What you'll get
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="bg-purple-200 p-1 rounded-full">
                    <BookOpen size={14} className="text-purple-700" />
                  </div>
                  <span className="text-sm">Full lifetime access</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-purple-200 p-1 rounded-full">
                    <Cloud size={14} className="text-purple-700" />
                  </div>
                  <span className="text-sm">Access on mobile and desktop</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-purple-200 p-1 rounded-full">
                    <UserCircle size={14} className="text-purple-700" />
                  </div>
                  <span className="text-sm">Certificate of completion</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {courseData?.instructureUid == user?.uid ? (
        <div className=" md:p-6 bg-white max-w-7xl mx-auto shadow-xl rounded-3xl overflow-hidden border border-purple-100 my-4">
          <MergeRequest courseId={course_id} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CourseDetailsCard;
