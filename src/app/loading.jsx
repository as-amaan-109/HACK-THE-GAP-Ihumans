// components/Loading.jsx
"use client"; // Required for client-side component in Next.js App Router

import { Settings } from "lucide-react";
import { cn } from "@heroui/react"; // Utility function for className concatenation (optional)

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Settings
        className={cn(
          "w-12 h-12 text-purple-500 animate-spin"
        )}
      />
    </div>
  );
};

export default Loading;