import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const courseContentSchema = {
  type: "object",
  properties: {
    chapterContent: {
      description:
        "Explained chapter completely and strongly, providing code in Markdown format.",
      type: SchemaType.STRING,
    },
  },
  required: ["chapterContent"],
};

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: courseContentSchema,
  },
});

// Example usage
const generateChapterContent = async (
  courseData,
  courseChapters,
  chapterName,
  chapterDescription,
  prompt
) => {
  const cData = JSON.stringify(courseData);
  const cChapters = JSON.stringify(courseChapters);
  //   console.log(resData);
  const augmentation = `Generate detailed content for the current chapter of a course based on the given context.
Course Details:
Course DATA: ${cData}
Course Chapters: ${cChapters}
Current Chapter Information:
Chapter Name: ${chapterName}
Chapter Description: ${chapterDescription}
Instructions:
Depth & Detail:

Provide an in-depth explanation of the chapter, covering all essential concepts.
Ensure clarity and completeness, making the content suitable for both beginners and advanced learners.
Markdown Formatting:

Use proper headings (#, ##, ###) to structure the content.
Include bullet points, numbered lists, and code blocks (if applicable) for better readability.
References & Additional Resources:

Include relevant links, references, and citations for further reading.
Provide examples, case studies, or real-world applications to enhance understanding.
Strong & Structured Explanation:

Break down complex topics into smaller, well-explained sections.
Where applicable, include diagrams, tables, and code snippets in markdown format.
Context Awareness:

Ensure the content aligns with the course’s overall theme and learning objectives.
The chapter should build upon previous chapters and provide a foundation for upcoming topics.
Additional Context:
${prompt}`;
  console.log(augmentation);
  try {
    const result = await model.generateContent(augmentation);
    return result.response.text();
  } catch (error) {
    console.error("Error Generating resume review:", error);
    throw error;
  }
};

export { generateChapterContent, courseContentSchema };
