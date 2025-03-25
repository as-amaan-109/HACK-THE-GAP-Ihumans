"use client";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

const MdChapterContent = ({ chapterContent }) => {
  return (
    <div data-color-mode="light">
      <MDEditor.Markdown
        source={chapterContent || ""}
        rehypePlugins={[
          [rehypeSanitize],
          [rehypeHighlight, { detect: true, ignoreMissing: true }],
        ]}
      />
    </div>
  );
};

export default MdChapterContent;
