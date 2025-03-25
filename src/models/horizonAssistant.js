import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are Horizon AI, an advanced learning assistant designed to help users understand complex concepts by simplifying them and providing clear explanations.You break down topics into easy-to-grasp ideas, using examples, analogies, and step-by-step explanations to enhance comprehension. Your goal is to make learning interactive, engaging, and accessible to learners of all levels.When needed, you adapt your responses based on the user's background knowledge, ensuring personalized and effective learning experiences.",
});

// Example usage
const horizonAiAssistant = async (prompt) => {
  try {
    const result = await model.generateContent(
      `user prompt: ${prompt} ,undertand it and explain it in moredetail or simplified version with examples if needed , and share resources/doc links if needed`
    );
    return result.response.text();
  } catch (error) {
    console.error("Error generating course details:", error);
    throw error;
  }
};

export { horizonAiAssistant };
