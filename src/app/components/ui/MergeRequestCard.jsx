// import React, { useState } from "react";
// import {
//   BookOpen,
//   User,
//   Clock,
//   Tag,
//   DollarSign,
//   Globe,
//   BarChart,
//   FileText,
//   ChevronRight,
//   Check,
//   X,
//   Clock8,
//   BrainCircuit,
// } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@heroui/react";
// import MDEditor from '@uiw/react-md-editor';
// import rehypeSanitize from 'rehype-sanitize';
// import rehypeHighlight from 'rehype-highlight';
// import toast from "react-hot-toast";
// import { mergeSummaryGenAi } from "@/models/genMRSummary";
// import { useCourse } from "@/firebase/courses/read";

// const MergeRequestCard = ({ data, courseId }) => {
//   const {
//     courseTitle,
//     requestedBy,
//     status,
//     category,
//     coursePrice,
//     language,
//     level,
//     shortDescription,
//     courseChapters,
//     mergeRequestId,
//   } = data;
//   const [summary, setSummary] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const {data:course,error} = useCourse({id:courseId})
//   const statusConfig = {
//     pending: {
//       bgColor: "bg-yellow-50",
//       textColor: "text-yellow-800",
//       borderColor: "border-yellow-200",
//       icon: <Clock8 className="text-yellow-500 mr-2" size={18} />,
//     },
//     approved: {
//       bgColor: "bg-green-50",
//       textColor: "text-green-800",
//       borderColor: "border-green-200",
//       icon: <Check className="text-green-500 mr-2" size={18} />,
//     },
//     rejected: {
//       bgColor: "bg-red-50",
//       textColor: "text-red-800",
//       borderColor: "border-red-200",
//       icon: <X className="text-red-500 mr-2" size={18} />,
//     },
//   };

//   const currentStatus = statusConfig[status] || {
//     bgColor: "bg-gray-50",
//     textColor: "text-gray-800",
//     borderColor: "border-gray-200",
//     icon: <Clock className="text-gray-500 mr-2" size={18} />,
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };
//   const handleGenerateSummary = async ()=>{
//     setIsLoading(true)
//     try {
//       if(!course || !data ){
//         toast.error("missing course data or merge course data")
//         return
//       }
//         const res = await mergeSummaryGenAi(course,data)
//         setSummary(res)
//     } catch (error) {
//         console.log(error)
//         toast.error("Error Generating Summary")
//     }finally{
//         setIsLoading(false)
//     }
//   }

//   return (
//     <div
//       className={`w-full bg-white rounded-xl shadow-sm border ${currentStatus.borderColor} overflow-hidden transition-all`}
//     >
//       {/* Status Banner */}
//       <div
//         className={`px-6 py-3 ${currentStatus.bgColor} ${currentStatus.textColor} flex items-center justify-between border-b border-opacity-50 ${currentStatus.borderColor}`}
//       >
//         <div className="flex items-center">
//           {currentStatus.icon}
//           <span className="font-medium capitalize">{status} Merge Request</span>
//         </div>
//         <span className="text-sm bg-white bg-opacity-40 py-1 px-3 rounded-full">
//           {formatDate(new Date())}
//         </span>
//       </div>

//       {/* Course Title */}
//       <div className="px-6 py-4">
//         <div className="flex items-center">
//           <div className="p-2 bg-purple-100 rounded-lg mr-4">
//             <BookOpen className="text-purple-500" size={20} />
//           </div>
//           <h2 className="text-xl font-semibold text-gray-800">{courseTitle}</h2>
//         </div>
//       </div>

//       {/* Requester Info */}
//       <div className="px-6 py-4 bg-gray-50 flex items-center">
//         <div className="flex-shrink-0 mr-3">
//           {requestedBy?.photoURL ? (
//             <img
//               src={requestedBy.photoURL}
//               alt={requestedBy.username}
//               className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
//             />
//           ) : (
//             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-sm">
//               <span className="text-white font-medium text-lg">
//                 {requestedBy?.username?.charAt(0).toUpperCase() || "U"}
//               </span>
//             </div>
//           )}
//         </div>
//         <div>
//           <p className="font-medium text-gray-800">
//             {requestedBy?.username || "Unknown User"}
//           </p>
//           <p className="text-sm text-gray-500">{requestedBy?.email}</p>
//         </div>
//         <div className="ml-auto flex items-center bg-white py-1 px-3 rounded-full border border-gray-200">
//           <Clock className="text-purple-400 mr-1" size={14} />
//           <span className="text-sm text-gray-600">
//             {formatDate(new Date())}
//           </span>
//         </div>
//       </div>

//       {/* Course Details */}
//       <div className="px-6 py-5">
//         <div className="text-gray-600 mb-5 leading-relaxed">
//           {shortDescription}
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//             <div className="p-2 bg-purple-100 rounded-md mr-3">
//               <Tag className="text-purple-500" size={16} />
//             </div>
//             <div>
//               <div className="text-xs text-gray-500 mb-1">Category</div>
//               <div className="text-gray-800 font-medium">
//                 {category || "Uncategorized"}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//             <div className="p-2 bg-purple-100 rounded-md mr-3">
//               <DollarSign className="text-purple-500" size={16} />
//             </div>
//             <div>
//               <div className="text-xs text-gray-500 mb-1">Price</div>
//               <div className="text-gray-800 font-medium">
//                 {typeof coursePrice === "number"
//                   ? `$${coursePrice.toFixed(2)}`
//                   : coursePrice || "Free"}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//             <div className="p-2 bg-purple-100 rounded-md mr-3">
//               <Globe className="text-purple-500" size={16} />
//             </div>
//             <div>
//               <div className="text-xs text-gray-500 mb-1">Language</div>
//               <div className="text-gray-800 font-medium">
//                 {language || "English"}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//             <div className="p-2 bg-purple-100 rounded-md mr-3">
//               <BarChart className="text-purple-500" size={16} />
//             </div>
//             <div>
//               <div className="text-xs text-gray-500 mb-1">Level</div>
//               <div className="text-gray-800 font-medium">
//                 {level || "Beginner"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Action */}
//       <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
//         <div className="flex items-center bg-purple-50 py-2 px-4 rounded-full">
//           <FileText className="text-purple-500 mr-2" size={18} />
//           <span className="text-purple-700 font-medium">
//             {courseChapters?.length || 0}{" "}
//             {courseChapters?.length === 1 ? "Chapter" : "Chapters"}
//           </span>
//         </div>

//         <div className="flex gap-3">
//           {status === "pending" && (
//             <>
//               <Button startContent={<X size={16} className="mr-1" />} className="bg-transparent flex items-center px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors">

//                 <span>Reject</span>
//               </Button>
//               <Button startContent={ <Check size={16} className="mr-1" />} className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-colors shadow-sm">

//                 <span>Approve</span>
//               </Button>
//             </>
//           )}
//           <Link
//             href={`/merge-preview?cid=${courseId}&mrid=${mergeRequestId}`}
//             className="flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
//           >
//             <span className="mr-1">Preview</span>
//             <ChevronRight size={16} />
//           </Link>
//         </div>
//       </div>
//       <div className="w-full p-2 md:p-4">
//         <Button
//           startContent={<BrainCircuit className="w-5 h-5" />}
//           color="secondary"
//           isLoading={isLoading}
//           isDisabled={isLoading}
//           variant="ghost"
//             onPress={handleGenerateSummary}
//           className="mt-3 bg-purple-100 text-purple-500 hover:bg-purple-200 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
//         >
//           Generate Summary with AI ✨
//         </Button>
//         <hr className="my-3" />
//         <div>
//           {summary && (
//             <div data-color-mode="light">
//               <MDEditor.Markdown
//                 source={summary}
//                 rehypePlugins={[
//                   [rehypeSanitize],
//                   [rehypeHighlight, { detect: true, ignoreMissing: true }],
//                 ]}
//                 className="text-sm"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MergeRequestCard;

import React, { useState } from "react";
import {
  BookOpen,
  User,
  Clock,
  Tag,
  DollarSign,
  Globe,
  BarChart,
  FileText,
  ChevronRight,
  Check,
  X,
  Clock8,
  BrainCircuit,
} from "lucide-react";
import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import toast from "react-hot-toast";
import { mergeSummaryGenAi } from "@/models/genMRSummary";
import { useCourse } from "@/firebase/courses/read";
import { mergeCourse, rejectMergeRequest } from "@/firebase/merge/merge";

const MergeRequestCard = ({ data, courseId }) => {
  const {
    courseTitle,
    requestedBy,
    status,
    category,
    coursePrice,
    language,
    level,
    shortDescription,
    courseChapters,
    mergeRequestId,
  } = data;
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: course, error } = useCourse({ id: courseId });

  const statusConfig = {
    pending: {
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200",
      icon: <Clock8 className="text-yellow-500 mr-2" size={18} />,
    },
    approved: {
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      borderColor: "border-green-200",
      icon: <Check className="text-green-500 mr-2" size={18} />,
    },
    rejected: {
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      borderColor: "border-red-200",
      icon: <X className="text-red-500 mr-2" size={18} />,
    },
  };

  const currentStatus = statusConfig[status] || {
    bgColor: "bg-gray-50",
    textColor: "text-gray-800",
    borderColor: "border-gray-200",
    icon: <Clock className="text-gray-500 mr-2" size={18} />,
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    try {
      if (!course || !data) {
        toast.error("Missing course data or merge course data");
        return;
      }
      const res = await mergeSummaryGenAi(course, data);
      setSummary(res);
    } catch (error) {
      console.log(error);
      toast.error("Error Generating Summary");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptMergeRequest = async () => {
    if (confirm("Are You Sure You Want to Merge Course")) {
      try {
        setIsLoading(true);
        const res = await mergeCourse({
          courseId: courseId,
          mergeRequestId: mergeRequestId,
        });
        if (await res) {
          toast.success("Course Merged succesfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error Merging Course");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRejectMergeRequest = async () => {
    if (confirm("Are You Sure You Want to Reject Request")) {
      try {
        setIsLoading(true);
        const res = await rejectMergeRequest({
          courseId: courseId,
          mergeRequestId: mergeRequestId,
        });
        if (await res) {
          toast.success("Request Rejected");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error Rejecting Request");
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-md border overflow-hidden transition-all hover:shadow-lg duration-300">
      {/* Status Banner */}
      <div
        className={`px-2 md:px-4 py-3 sm:px-6 ${currentStatus.bgColor} ${currentStatus.textColor} flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-opacity-50 ${currentStatus.borderColor}`}
      >
        <div className="flex items-center mb-2 sm:mb-0">
          {currentStatus.icon}
          <span className="font-medium capitalize text-sm sm:text-base">
            {status} Merge Request
          </span>
        </div>
        <span className="text-xs sm:text-sm bg-white bg-opacity-40 py-1 px-3 rounded-full">
          {formatDate(new Date())}
        </span>
      </div>

      {/* Course Title */}
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center flex-col sm:flex-row">
          <div className="p-2 bg-purple-100 rounded-lg mb-3 sm:mb-0 sm:mr-4">
            <BookOpen className="text-purple-500" size={20} />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
            {courseTitle}
          </h2>
        </div>
      </div>

      {/* Requester Info */}
      <div className=" md:px-4 py-4 sm:px-6 bg-gray-50 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-shrink-0">
          {requestedBy?.photoURL ? (
            <Avatar
              showFallback
              src={requestedBy.photoURL}
              alt={requestedBy.username}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-medium text-lg">
                {requestedBy?.username?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          )}
        </div>
        <div className="text-center sm:text-left">
          <p className="font-medium text-gray-800 text-sm sm:text-base">
            {requestedBy?.username || "Unknown User"}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            {requestedBy?.email}
          </p>
        </div>
        <div className="sm:ml-auto flex items-center bg-white py-1 px-3 rounded-full border border-gray-200">
          <Clock className="text-purple-400 mr-1" size={14} />
          <span className="text-xs sm:text-sm text-gray-600">
            {formatDate(new Date())}
          </span>
        </div>
      </div>

      {/* Course Details */}
      <div className="px-4 py-5 sm:px-6">
        <div className="text-gray-600 mb-5 text-sm sm:text-base leading-relaxed">
          {shortDescription}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            {
              icon: Tag,
              label: "Category",
              value: category || "Uncategorized",
            },
            {
              icon: DollarSign,
              label: "Price",
              value:
                typeof coursePrice === "number"
                  ? `$${coursePrice.toFixed(2)}`
                  : coursePrice || "Free",
            },
            { icon: Globe, label: "Language", value: language || "English" },
            { icon: BarChart, label: "Level", value: level || "Beginner" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-gray-50 rounded-lg"
            >
              <div className="p-2 bg-purple-100 rounded-md mr-3 flex-shrink-0">
                <item.icon className="text-purple-500" size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <div className="text-gray-800 font-medium text-sm truncate">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-4 py-4 sm:px-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center bg-purple-50 py-2 px-4 rounded-full w-full sm:w-auto justify-center sm:justify-start">
          <FileText className="text-purple-500 mr-2" size={18} />
          <span className="text-purple-700 font-medium text-sm">
            {courseChapters?.length || 0}{" "}
            {courseChapters?.length === 1 ? "Chapter" : "Chapters"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {status === "pending" && (
            <>
              <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                onPress={handleRejectMergeRequest}
                startContent={<X size={16} className="mr-1" />}
                className="w-full sm:w-auto bg-transparent flex items-center justify-center px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
              >
                <span className="text-sm">Reject</span>
              </Button>
              <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                onPress={handleAcceptMergeRequest}
                startContent={<Check size={16} className="mr-1" />}
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-colors shadow-sm"
              >
                <span className="text-sm">Approve</span>
              </Button>
            </>
          )}
          <Link
            href={`/merge-preview?cid=${courseId}&mrid=${mergeRequestId}`}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <span className="mr-1 text-sm">Preview</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Summary Section */}
      <div className="w-full p-4 sm:p-6">
        <Button
          startContent={<BrainCircuit className="w-5 h-5" />}
          color="secondary"
          isLoading={isLoading}
          isDisabled={isLoading}
          variant="ghost"
          onPress={handleGenerateSummary}
          className="w-full sm:w-auto mt-3 bg-purple-100 text-purple-500 hover:bg-purple-200 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Generate Summary with AI ✨
        </Button>
        {summary && (
          <>
            <hr className="my-4" />
            <div data-color-mode="light" className="overflow-x-scroll">
              <MDEditor.Markdown
                source={summary}
                rehypePlugins={[
                  [rehypeSanitize],
                  [rehypeHighlight, { detect: true, ignoreMissing: true }],
                ]}
                className="text-sm prose max-w-none"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MergeRequestCard;
