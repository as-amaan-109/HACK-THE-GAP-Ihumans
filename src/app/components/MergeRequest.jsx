"use client";
import React from "react";
import Loading from "@/app/loading";
import { useMergeRequests } from "@/firebase/merge/read";
import MergeRequestCard from "./ui/MergeRequestCard";
import { motion } from "framer-motion";

const MergeRequest = ({ courseId }) => {
  const {
    data: mergeRequests,
    error,
    isLoading,
  } = useMergeRequests({ courseId: courseId });

  if (error) {
    return (
      <div className="w-full text-red-400 bg-red-50 p-4 rounded-lg shadow-sm border border-red-200 text-center">
        <span className="font-medium">Error Fetching Merge Requests:</span> {error?.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-12">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-purple-200">
        Merge Requests
      </h2>
      
      {mergeRequests?.length > 0 ? (
        <div className="w-full flex gap-6 flex-col">
          {mergeRequests.map((data, index) => (
            <motion.div
              key={data.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="transform transition-all duration-300 hover:shadow-lg"
            >
              <MergeRequestCard data={data} courseId={courseId} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="w-full p-8 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <div className="text-purple-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">No Merge Requests Found</h3>
          <p className="text-gray-600">There are currently no pending merge requests for this course.</p>
        </div>
      )}
    </div>
  );
};

export default MergeRequest;