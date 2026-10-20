"use client";

import { db } from "@/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

interface QuizData {
  title: string;
  questions: Question[];
}

// 1. THIS IS THE CHILD COMPONENT THAT USES SEARCHPARAMS
function QuizContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || "general_knowledge"; 

  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuiz() {
      try {
        const docRef = doc(db, "quizzes", categoryId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setQuiz(docSnap.data() as QuizData);
        } else {
          console.error("Quiz document not found!");
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [categoryId]);

  if (loading) return <div className="p-8 text-center text-xl font-semibold text-slate-700">Loading your quiz...</div>;
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div className="p-8 text-center text-xl font-semibold text-slate-700">No questions found for this topic.</div>;
  }

  const currentQuestion = quiz.questions[currentIdx];

  const handleAnswerClick = (selectedOption: string) => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    const nextIdx = currentIdx + 1;
    if (nextIdx < quiz.questions.length) {
      setCurrentIdx(nextIdx);
    } else {
      setQuizOver(true);
    }
  };

  if (quizOver) {
    return (
      <main className="max-w-md mx-auto my-12 p-6 bg-white border border-slate-200 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Quiz Completed! 🎉</h1>
        <p className="text-slate-500 font-medium text-lg mb-6">Category: {quiz.title}</p>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 mb-6">
          <p className="text-slate-600 text-sm font-bold uppercase tracking-wider">Your Final Score</p>
          <p className="text-5xl font-black text-[#ff4500] mt-1">
            {score} / {quiz.questions.length}
          </p>
        </div>
        <button 
          onClick={() => { setCurrentIdx(0); setScore(0); setQuizOver(false); }}
          className="w-full bg-[#ff4500] hover:bg-[#e63e00] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition duration-200"
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto my-12 p-6 bg-white border border-slate-200 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#ff4500] bg-[#fff1eb] px-3 py-1.5 rounded-full">
          {quiz.title}
        </span>
        <span className="text-sm font-semibold text-slate-400">
          Question {currentIdx + 1} of {quiz.questions.length}
        </span>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-6 min-h-[56px] leading-snug">
        {currentQuestion.text}
      </h2>

      <div className="space-y-3">
        {currentQuestion.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswerClick(option)}
            className="w-full text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 font-semibold py-3.5 px-5 rounded-xl text-slate-700 transition duration-150 active:scale-[0.99]"
          >
            {option}
          </button>
        ))}
      </div>
    </main>
  );
}

// 2. THIS ROOT WRAPPER COMPONENT KEEPS THE HOOK SAFE INSIDE SUSPENSE
export default function QuizComponent() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xl font-semibold text-slate-600">Preparing your questions...</div>}>
      <QuizContent />
    </Suspense>
  );
}
