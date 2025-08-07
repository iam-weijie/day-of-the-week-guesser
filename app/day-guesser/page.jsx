"use client";

import { useEffect, useState } from "react";

export default function DayGuesser() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [day, setDay] = useState("");

  const fakeParams = [
    "Fetching user location…",
    "Calculating lunar phase 🌕…",
    "Analyzing solar flare intensity ☀️…",
    "Consulting ancient algorithms 🧙‍♂️…",
    "Almost done…",
  ];

  const startPrediction = () => {
    setLoading(true);
    setStep(0);
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= fakeParams.length - 1) {
          clearInterval(interval);
          const today = new Date();
          const options = { weekday: "long" };
          const dayOfWeek = today.toLocaleDateString("en-US", options);
          setTimeout(() => {
            setDay(dayOfWeek);
            setLoading(false);
          }, 1000);
        }
        return prev + 1;
      });
    }, 1200);
  };

  useEffect(() => {
    startPrediction();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-mono">
      <h1 className="text-4xl mb-8">🧠 Day of the Week Guesser</h1>

      {loading ? (
        <div className="text-xl animate-pulse">{fakeParams[step]}</div>
      ) : day ? (
        <div className="text-3xl text-green-400 mt-4">
          Today is... <span className="font-bold">{day} 🎉</span>
        </div>
      ) : null}

      {!loading && (
        <button
          onClick={startPrediction}
          className="mt-10 px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
