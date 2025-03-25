import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are Horizon AI. Your task is to analyze two course versions: the first course (previous version) and the second course (updated version). You will compare the updated version with the previous version and identify the changes made. Your analysis should be similar to GitHub’s Pull Request review, clearly highlighting what content has been added, modified, or removed. Generate the output in an attractive and understandable Markdown format, ensuring it is precise, structured, and easy to read ",
});

// Example usage
const mergeSummaryGenAi = async (orgCourse, mergeCourse) => {
  const main_course = JSON.stringify(orgCourse);
  const merge_course = JSON.stringify(mergeCourse);
  try {
    const result = await model.generateContent(
      `You are an AI assistant specializing in course content analysis. I will provide details of two course versions:
    
      - **Previous Course (Existing Version):** This is the course before any updates:  
        ${main_course}  
    
      - **Updated Course (New Version):** This is the revised course that replaces or updates the Previous Course:  
        ${merge_course}  
    
      ---
    
      ## 🔍 Task  
      Compare the **Updated Course** with the **Previous Course** and provide a structured summary of differences.  
      **Ignore metadata** such as timestamps, author names, course IDs, or any unrelated system-generated details.  
    
      ---
    
      ## ✨ Analysis Requirements  
      - **New Additions:** Identify newly introduced topics, lessons, or sections that were **not present** in the Previous Course.  
      - **Modifications:** Highlight **content changes**, including rewording, expansion, restructuring, or updates.  
      - **Removals:** List any topics or lessons that **existed in the Updated Course but are absent** in the Previous Course.  
      - **Reorganization:** Detect **structural changes**, such as reordering, merging, or shifting of topics.  
    
      ---
    
      ## 📌 Output Formatting Instructions  
      - Use **Markdown** for **better readability**.  
      - Present findings using:  
        - **Tables** for structured comparisons.  
        - **Bullet points** for concise descriptions.  
      - Ensure the response is **clear, professional, and visually appealing**.  
      - Use **bold headings** for sections and **formatted tables** to enhance clarity.  
    
      ---
    
      ## 📊 Expected Output Format  
    
      ### 🔄 Chapter-Level Changes  
      | Chapter | Previous Course | Updated Course | Change Type | Description |
      |---------|----------------|----------------|-------------|-------------|
      | 1 | Introduction | AI/ML Fundamentals | Modified | Expanded with AI types, history, and streamlined explanations. |
      | 2 | Types of ML | Supervised Learning | Modified & Reorganized | Supervised learning content enhanced; other ML types moved to Chapter 1. |
      | 3 | Supervised Learning | Unsupervised Learning | Modified & Reorganized | Covers clustering (K-Means, Hierarchical) and PCA with Python examples. |
      | 4 | Unsupervised Learning | N/A | Removed | Integrated into Chapter 3 with practical code examples. |
      | 5 | Reinforcement Learning | N/A | Removed | No longer part of this course. |
      | ... | ... | ... | ... | ... |
    
      ### ✅ Key Additions  
      - **Focused content** on AI/ML fundamentals, including AI types (Narrow, General, Super AI).  
      - **Python code examples** for key algorithms (linear regression, logistic regression, decision trees, K-Means, PCA, t-SNE).  
      - **Clear separation** of supervised and unsupervised learning concepts.  
    
      ### ✍️ Key Modifications  
      - **Introduction restructured** to include ML types and terminology.  
      - **Supervised learning streamlined**, focusing on essential algorithms while removing KNN.  
      - **Algorithm descriptions** now integrated within their respective learning paradigms.  
    
      ### ⚠️ Key Removals  
      - **Dedicated chapters on Reinforcement Learning, Applications, Future Trends, and Advanced Topics** (Deep Learning, NLP).  
      - **Simplified example models** (e.g., KNN) removed.  
    
      ### 🔄 Structural Changes  
      - **Algorithm discussions are now within their respective sections** instead of a separate chapter.  
      - **ML types discussion moved to the Introduction** instead of a standalone chapter.  
    
      This revised course offers a **more structured, practical introduction to AI/ML** with essential concepts, algorithms, and coding examples while removing advanced topics to keep it **beginner-friendly**.  
      `
    );
    

    return result.response.text();
  } catch (error) {
    console.error("Error generating course details:", error);
    throw error;
  }
};

export { mergeSummaryGenAi };
