"use client";
import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import {
  Brain,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Target,
  Flower,
  MapPin,
  Star,
  Book,
  Briefcase,
  GraduationCap,
  User,
  Globe,
  Heart,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { submitAssessment } from "@/firebase/assessment/write";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { getUserAssessment } from "@/firebase/assessment/read";
import {
  getRecommendations,
  getRoadmap,
} from "@/firebase/recommendations/read";
import { deleteAssessmentField } from "@/firebase/assessment/delete";

import Link from "next/link";
import confetti from "canvas-confetti";
import { Button } from "@heroui/react";
import { generateCareerPath } from "@/models/generateCareerPath";
import { setRecommendation } from "@/firebase/recommendations/write";

const SectionNav = ({
  sections,
  currentSection,
  currentQuestion,
  questions,
  answers,
}) => {
  return (
    <div className="grid grid-cols-5 gap-1 sm:gap-2 mb-6 bg-white rounded-xl p-2 sm:p-4 shadow-sm">
      {sections.map((section, idx) => {
        const sectionQuestions = questions.filter(
          (q) => q.section === section.id
        );
        const isActive = currentSection.id === section.id;
        const isCompleted = sectionQuestions.every((q) => {
          const questionIndex = questions.findIndex(
            (quest) => quest.id === q.id
          );
          const answer = answers[questionIndex];
          if (!answer) return false;
          if (q.type === "text") return answer.trim().length >= 10;
          if (q.isMultiSelect)
            return Array.isArray(answer) && answer.length > 0;
          return true;
        });

        return (
          <div
            key={section.id}
            className={`flex flex-col items-center px-2 sm:px-4 py-2 rounded-lg transition-all
              ${isActive ? "bg-violet-50" : ""}`}
          >
            <div
              className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 ${
                isActive ? "text-violet-600" : "text-gray-500"
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span className="text-xs sm:text-sm font-medium text-center sm:text-left hidden sm:block">
                {section.title}
              </span>
            </div>
            <div className="mt-2 w-full h-1 rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all ${
                  isCompleted
                    ? "bg-green-500"
                    : isActive
                    ? "bg-violet-600"
                    : "bg-gray-200"
                }`}
                style={{
                  width: isCompleted
                    ? "100%"
                    : isActive
                    ? `${
                        ((currentQuestion -
                          questions.findIndex((q) => q.section === section.id) +
                          1) /
                          sectionQuestions.length) *
                        100
                      }%`
                    : "0%",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Assessment = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showProgress, setShowProgress] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isRoadmapExits, setIsRoadmapExits] = useState(false);
  const router = useRouter();
  

  // Section definitions
  const sections = [
    {
      id: "education",
      title: "Education",
      icon: GraduationCap,
      color: "violet",
    },
    {
      id: "skills",
      title: "Skills",
      icon: Brain,
      color: "blue",
    },
    {
      id: "interests",
      title: "Interests",
      icon: Heart,
      color: "pink",
    },
    {
      id: "personal",
      title: "Personal",
      icon: User,
      color: "green",
    },
    {
      id: "career",
      title: "Career",
      icon: Target,
      color: "orange",
    },
  ];

  // Questions array with validation
  const questions = [
    // Educational Background Section
    {
      id: 1,
      section: "education",
      type: "multiple",
      question: "What is your current educational status?",
      options: [
        "10th Standard",
        "12th Standard",
        "Undergraduate",
        "Postgraduate",
        "Working Professional",
        "Diploma",
      ],
    },
    {
      id: 2,
      section: "education",
      type: "multiple",
      question: "Which stream did you choose in 12th Standard?",
      options: [
        "Science (PCM)",
        "Science (PCB)",
        "Commerce",
        "Arts/Humanities",
        "Other",
        "Not attempted",
      ],
    },
    {
      id: 3,
      section: "education",
      type: "multiple",
      question: "What degree are you pursuing/completed?",
      options: [
        "B.Tech/B.E.",
        "BCA/BSc (Computer Science)",
        "B.Com",
        "BBA",
        "BA",
        "Other",
        "MBBS",
        "B. Arch",
        "Not Pursuing Any Degree",
      ],
    },
    // Skills Section
    {
      id: 4,
      section: "skills",
      type: "multiple",
      isMultiSelect: true,
      question: "Select your strongest subjects:",
      options: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
        "Economics",
        "Languages",
      ],
    },
    {
      id: 5,
      section: "skills",
      type: "scale",
      question: "How would you rate your overall academic performance?",
      options: [1, 2, 3, 4, 5],
      labels: ["Below Average", "Excellent"],
    },
    // Interests Section
    {
      id: 6,
      section: "interests",
      type: "multiple",
      isMultiSelect: true,
      question: "Which technical skills interest you most?",
      options: [
        "Programming/Coding",
        "Data Analysis",
        "Design/Creative Tools",
        "Digital Marketing",
        "Project Management",
        "Research & Analysis",
        "Artificial Intelligence/Machine Learning",
        "Cybersecurity",
        "Cloud Computing",
        "Mobile App Development",
        "Blockchain Technology",
        "Internet of Things (IoT)",
        "Game Development",
        "DevOps/CI-CD",
        "Augmented Reality/Virtual Reality (AR/VR)",
        "Not intreseted in Tech",
      ],
    },
    {
      id: 7,
      section: "interests",
      type: "multiple",
      question: "What type of work environment interests you?",
      options: [
        "Startup Culture",
        "Corporate Setting",
        "Government Sector",
        "Research Institution",
        "Own Business",
        "Contract Basis",
      ],
    },
    // Personal Traits Section
    {
      id: 8,
      section: "personal",
      type: "scale",
      question: "How comfortable are you with public speaking?",
      options: [1, 2, 3, 4, 5],
      labels: ["Very Uncomfortable", "Very Comfortable"],
    },
    {
      id: 9,
      section: "personal",
      type: "multiple",
      isMultiSelect: true,
      question: "Select your working style preferences:",
      options: [
        "Independent Work",
        "Team Collaboration",
        "Leadership Roles",
        "Creative Freedom",
        "Structured Environment",
        "Freelancing",
      ],
    },
    // Career Goals Section
    {
      id: 10,
      section: "career",
      type: "multiple",
      isMultiSelect: true,
      question: "What are your career goals in the next 2 years?",
      options: [
        "Higher Studies",
        "Job/Employment",
        "Entrepreneurship",
        "Skill Development",
        "Competitive Exams",
      ],
    },
    {
      id: 11,
      section: "career",
      type: "multiple",
      question: "What is your preferred work location?",
      options: [
        "Within Home State",
        "Major Indian Cities",
        "Tier 2/3 Cities",
        "International Opportunities",
        "No Preference",
        "Any",
        "Remote Work",
      ],
    },
    {
      id: 12,
      section: "career",
      type: "text",
      question:
        "In your own words, describe your ideal career path and where you see yourself in 5 years. Feel free to express in any language you're comfortable with.",
      placeholder: "Share your career aspirations, goals, and dreams...",
    },
  ];

  useEffect(() => {
    (async () => {
      console.log("showCompletion", showCompletion);
      const res = await getUserAssessment({ uid: user?.uid });
      if (res) {
        setShowCompletion(true);
      } else {
        setShowCompletion(false);
      }
    })();

    (async () => {
      const res = await getRoadmap({ uid: user?.uid });
      if (res) {
        setIsRoadmapExits(true);
      } else {
        setShowCompletion(false);
      }
    })();
  }, [user]);

  const getCurrentSection = () => {
    const currentQ = questions[currentQuestion];
    return sections.find((s) => s.id === currentQ.section);
  };

  const validateQuestion = (questionIndex) => {
    const question = questions[questionIndex];
    const answer = answers[questionIndex];

    if (!answer) return false;

    if (question.type === "text") {
      return answer.trim().length >= 10;
    }

    if (question.isMultiSelect) {
      return Array.isArray(answer) && answer.length > 0;
    }

    return true;
  };

  const prepareSubmissionData = () => {
    const formattedResponse = {
      education: {
        currentStatus: answers[0],
        stream12th: answers[1],
        degree: answers[2],
      },
      skills: {
        strongSubjects: answers[3] || [],
        academicPerformance: answers[4],
      },
      interests: {
        technicalSkills: answers[5] || [],
        workEnvironment: answers[6],
      },
      personalTraits: {
        publicSpeaking: answers[7],
        workingStyle: answers[8] || [],
      },
      careerGoals: {
        shortTermGoals: answers[9] || [],
        preferredLocation: answers[10],
        careerVision: answers[11],
      },
      metadata: {
        completedAt: new Date().toISOString(),
        totalQuestions: questions.length,
        questionsAnswered: Object.keys(answers).length,
      },
    };

    // console.log("🥳 response:-\n", formattedResponse);

    return formattedResponse;
  };

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    setValidationErrors({
      ...validationErrors,
      [currentQuestion]: null,
    });
  };

  const handleNext = () => {
    if (validateQuestion(currentQuestion)) {
      setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1));
    } else {
      setValidationErrors({
        ...validationErrors,
        [currentQuestion]: "This field is required",
      });
    }
  };

  const handleSubmit = async () => {
    // Validate all questions
    const invalidQuestions = questions.reduce((acc, _, index) => {
      if (!validateQuestion(index)) {
        acc[index] = "This field is required";
      }
      return acc;
    }, {});

    if (Object.keys(invalidQuestions).length > 0) {
      setValidationErrors(invalidQuestions);
      setCurrentQuestion(Number(Object.keys(invalidQuestions)[0]));
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = prepareSubmissionData();
      await submitAssessment({
        uid: user?.uid,
        submissionData: submissionData,
      });
      toast.success("Assessment Submitted");
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowCompletion(true);
    } catch (error) {
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateRoadMap = async () => {
    try {
      setIsLoading(true);
      const assessmentData = await getUserAssessment({ uid: user?.uid });
      const res = await generateCareerPath({
        assessmentData: assessmentData,
      });
      const path = await JSON.parse(res);
      //   console.log("path::",await JSON.parse(res))
      if (path) {
        const result = await setRecommendation({
          uid: user?.uid,
          recommendations: path?.career_recommendations,
        });
        console.log(path);
        if (result) {
          toast.success("Roadmap Generated Successfully");
          // setRoadmapData(text);
          confetti();
        }
      } else {
        throw new Error("Error Generating Career Path");
      }

      // window.location.reload();
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      toast.error("Failed to Generate Roadmap Try Again");
    } finally {
      setIsLoading(false);
    }
    // router.push("/dashboard/roadmap");
  };

  const handleRetakeAssessment = async () => {
    setIsLoading(true);
    try {
      await deleteAssessmentField({ uid: user?.uid });
      toast.success("assessment Deleted ");
      window.location.reload();
    } catch (error) {
      console.log("error", error);
      toast.error("failed to delete assessment");
    } finally {
      setIsLoading(false);
    }
  };
  const renderScale = (question) => (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-500">
        <span>{question.labels[0]}</span>
        <span>{question.labels[1]}</span>
      </div>
      <div className="flex justify-between gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className={`w-full h-16 rounded-xl border-2 transition-all duration-200 ${
              answers[currentQuestion] === option
                ? "border-violet-600 bg-violet-50 text-violet-600"
                : "border-gray-200 hover:border-violet-200 hover:bg-violet-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const renderMultiple = (question) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options.map((option) => (
        <button
          key={option}
          onClick={() => {
            if (question.isMultiSelect) {
              const currentAnswers = answers[currentQuestion] || [];
              const newAnswers = currentAnswers.includes(option)
                ? currentAnswers.filter((a) => a !== option)
                : [...currentAnswers, option];
              handleAnswer(newAnswers);
            } else {
              handleAnswer(option);
            }
          }}
          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 relative ${
            question.isMultiSelect
              ? answers[currentQuestion]?.includes(option)
                ? "border-violet-600 bg-violet-50 text-violet-600"
                : "border-gray-200 hover:border-violet-200 hover:bg-violet-50"
              : answers[currentQuestion] === option
              ? "border-violet-600 bg-violet-50 text-violet-600"
              : "border-gray-200 hover:border-violet-200 hover:bg-violet-50"
          }`}
        >
          {option}
          {question.isMultiSelect &&
            answers[currentQuestion]?.includes(option) && (
              <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-violet-600" />
            )}
        </button>
      ))}
    </div>
  );

  const renderTextInput = () => (
    <div className="space-y-4">
      <textarea
        value={answers[currentQuestion] || ""}
        onChange={(e) => handleAnswer(e.target.value)}
        placeholder={questions[currentQuestion].placeholder}
        className="w-full h-40 p-4 rounded-xl border-2 border-gray-200 focus:border-violet-600 focus:ring-0 transition-all resize-none"
      />
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">
          Minimum 10 characters required
        </span>
        <span className="text-sm text-gray-500">
          {(answers[currentQuestion] || "").length} characters
        </span>
      </div>
    </div>
  );

  if (showCompletion) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-violet-100 rounded-full blur-2xl opacity-60 animate-pulse" />
            <div className="relative w-24 h-24 mx-auto bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Flower className="w-12 h-12 text-white animate-bounce" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Assessment Complete! 🎉
          </h2>

          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Great job completing your assessment! Your personalized career
            roadmap is now ready for you to explore.
          </p>

          <div className="space-y-4">
            {isRoadmapExits ? (
              <Link
                href={`/dashboard/roadmap`}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                View Your Career Roadmap
              </Link>
            ) : (
              <Button
                isLoading={isLoading}
                onPress={handleGenerateRoadMap}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Generate Your Career Roadmap
              </Button>
            )}
            <Button
              isLoading={isLoading}
              onPress={handleRetakeAssessment}
              className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Retake Assessment
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Your responses have been saved
            </div>
          </div>
        </div>

        <div className="mt-6 bg-violet-50 rounded-xl p-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-600" />
            What's Next?
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
              Explore your personalized career roadmap
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
              Review recommended learning paths and resources
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
              Track your progress towards your career goals
            </li>
          </ul>
        </div>
      </div>
    );
  }

  const currentSection = getCurrentSection();

  return (
    <div className="max-w-4xl mx-auto">
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
            <p className="text-gray-600">Processing your responses...</p>
          </div>
        </div>
      )}

      {showError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md text-center space-y-4">
            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold">Something went wrong</h3>
            <p className="text-gray-600">
              Unable to submit your assessment. Please try again.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowError(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowError(false);
                  handleSubmit();
                }}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      <SectionNav
        sections={sections}
        currentSection={currentSection}
        currentQuestion={currentQuestion}
        questions={questions}
        answers={answers}
      />

      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {questions[currentQuestion].question}
        </h3>

        {validationErrors[currentQuestion] && (
          <div className="mb-4 flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {validationErrors[currentQuestion]}
          </div>
        )}

        {questions[currentQuestion].type === "text"
          ? renderTextInput()
          : questions[currentQuestion].type === "scale"
          ? renderScale(questions[currentQuestion])
          : renderMultiple(questions[currentQuestion])}

        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors ${
              currentQuestion === 0 ? "invisible" : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              Submit Assessment
              <Star className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-violet-600 hover:bg-violet-50 transition-colors"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 bg-violet-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-5 h-5 text-violet-600" />
          <h3 className="font-medium text-gray-900">
            Section Tips: {currentSection.title}
          </h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-600">
          {currentSection.id === "education" && (
            <>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                Provide accurate educational details
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                Include all relevant qualifications
              </li>
            </>
          )}
          {currentSection.id === "skills" && (
            <>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                Be honest about your skill levels
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                Consider both technical and soft skills
              </li>
            </>
          )}
          {currentSection.id === "interests" && (
            <>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                Think about what truly excites you
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                Consider long-term interests over temporary preferences
              </li>
            </>
          )}
          {currentSection.id === "personal" && (
            <>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                Reflect on your natural tendencies
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                Consider feedback from others
              </li>
            </>
          )}
          {currentSection.id === "career" && (
            <>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                Think about both short and long-term goals
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-600" />
                Consider various career paths
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Assessment;
