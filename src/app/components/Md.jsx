"use client"
import React from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/Cards";

const MdEditor = ({ chapterContent, setChapterContent }) => {
  return (
    <Card className="w-full max-h-screen">
      {/* <CardHeader>
        <CardTitle>Markdown Editor</CardTitle>
      </CardHeader> */}
      <div>
        <div data-color-mode="light" className="w-full md:flex">
          <MDEditor
            value={chapterContent}
            onChange={(val) => setChapterContent(val || "")}
            height={400}
            className="mb-4 md:w-1/2"
            preview="edit"
            previewOptions={{
              rehypePlugins: [
                [rehypeSanitize],
                [rehypeHighlight, { detect: true, ignoreMissing: true }],
              ],
            }}
          />
          <div className="border rounded md:w-1/2 ">
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <div
              className="markdown-preview-container"
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                padding: "10px",
              }}
            >
              <MDEditor.Markdown
                source={chapterContent || ""}
                rehypePlugins={[
                  [rehypeSanitize],
                  [rehypeHighlight, { detect: true, ignoreMissing: true }],
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MdEditor;