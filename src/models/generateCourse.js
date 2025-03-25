import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const courseAnalysisSchema = {
  description: "Course analysis data structure",
  type: SchemaType.OBJECT,
  properties: {
    course_analysis: {
      type: SchemaType.OBJECT,
      properties: {
        courseTitle: {
          type: SchemaType.STRING,
          description: "The title of the course",
        },
        shortDescription: {
          type: SchemaType.STRING,
          description: "A brief summary of the course content",
        },
        category: {
          type: SchemaType.STRING,
          description: "The category or domain of the course",
          enum: [
            "Development",
            "Business",
            "IT & Software",
            "Design",
            "Marketing",
            "Personal Development",
            "Photography & Video",
            "Health & Fitness",
            "Music",
            "Teaching & Academics",
            "Lifestyle",
            "Finance & Accounting",
            "Office Productivity",
            "Language Learning",
            "Data Science",
            "Cloud Computing",
            "Cybersecurity",
            "Graphic Design",
            "Web Development",
            "Mobile Development",
            "Game Development",
            "Digital Marketing",
            "Entrepreneurship",
            "Leadership",
            "Project Management",
          ],
        },
        level: {
          type: SchemaType.STRING,
          description: "The difficulty level of the course",
          enum: ["Beginner", "Intermediate", "Advanced"],
        },
        language: {
          type: SchemaType.STRING,
          description: "The primary language of instruction for the course",
          enum: ["English", "Spanish", "French", "German", "Hindi", "Other"],
        },
        coursePrice: {
          type: SchemaType.NUMBER,
          description: "The price of the course",
        },
        description: {
          type: SchemaType.STRING,
          description:
            "A detailed description of the course content, objectives, and outcomes",
        },
        chapters: {
          type: SchemaType.ARRAY,
          description: "A list of necessary chapters based on the course level",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              title: {
                type: SchemaType.STRING,
                description: "The title of the chapter",
              },
              description: {
                type: SchemaType.STRING,
                description: "A brief summary of the chapter content",
              },
            },
            required: ["title", "description"],
          },
        },
      },
      required: [
        "courseTitle",
        "shortDescription",
        "category",
        "level",
        "language",
        "coursePrice",
        "description",
        "chapters",
      ],
    },
  },
  required: ["course_analysis"],
};


// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: courseAnalysisSchema,
  },
});

// Example usage
const generateCourse = async (courseData, prompt) => {
  const cData = JSON.stringify(courseData);
  //   console.log(resData);

  try {
    const result = await model.generateContent(
      `${cData} understand given data , and Generate Course Deatails generate all necessary chapters based on level , ${prompt}`
    );
    return result.response.text();
  } catch (error) {
    console.error("Error Generating resume review:", error);
    throw error;
  }
};

export { generateCourse, courseAnalysisSchema };
