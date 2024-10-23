import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  questions,
  stressQuestions,
  anxietyQuestions,
  depressionQuestions,
} from "@/constants";

export default function DassForm() {
  const [vitalsData, setVitalsData] = useState(null);
  const [responses, setResponses] = useState(Array(42).fill(""));
  const router = useRouter();

  useEffect(() => {
    const vitals = JSON.parse(localStorage.getItem("vitalsData"));
    if (!vitals) {
      alert("No vitals data found. Please enter your vitals first.");
    } else {
      setVitalsData(vitals);
    }
  }, [router]);

  const handleSelectChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const calculateResults = () => {
    let stressScore = 0;
    let anxietyScore = 0;
    let depressionScore = 0;
    let isIncomplete = false;

    responses.forEach((select, index) => {
      if (select === "") {
        isIncomplete = true;
      } else {
        const score = parseInt(select);
        if (stressQuestions.includes(index + 1)) stressScore += score;
        if (anxietyQuestions.includes(index + 1)) anxietyScore += score;
        if (depressionQuestions.includes(index + 1)) depressionScore += score;
      }
    });

    if (isIncomplete) {
      alert("Please complete all questions before submitting.");
    } else {
      router.push({
        pathname: "/result",
        query: {
          stressScore,
          anxietyScore,
          depressionScore,
        },
      });
    }
  };

  return (
    <div className="pt-20 pb-8 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          DASS-42 Questionnaire
        </h1>

        {vitalsData && (
          <div className="space-y-4 mb-6">
            <p className="text-lg text-gray-800 font-semibold">
              SpO2: {vitalsData.spo2}%
            </p>
            <p className="text-lg text-gray-800 font-semibold">
              Temperature: {vitalsData.temp}°C
            </p>
            <p className="text-lg text-gray-800 font-semibold">
              Pulse Rate: {vitalsData.hr} BPM
            </p>
          </div>
        )}

        <form className="space-y-6">
          <div id="questions" className="space-y-6">
            {questions.map((question, index) => (
              <div key={index} className="question">
                <label htmlFor={`q${index + 1}`}>
                  {index + 1}. {question}
                </label>
                <select
                  id={`q${index + 1}`}
                  name={`q${index + 1}`}
                  className="w-full mt-1 border p-2 rounded-lg"
                  value={responses[index]}
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="0">Never</option>
                  <option value="1">Sometimes</option>
                  <option value="2">Often</option>
                  <option value="3">Almost Always</option>
                </select>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={calculateResults}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
