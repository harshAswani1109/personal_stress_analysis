import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dass() {
  const [vitalsData, setVitalsData] = useState(null);
  const [stressScore, setStressScore] = useState(0);
  const [anxietyScore, setAnxietyScore] = useState(0);
  const [depressionScore, setDepressionScore] = useState(0);
  const [incomplete, setIncomplete] = useState(false);

  useEffect(() => {
    const vitals = JSON.parse(localStorage.getItem("vitalsData"));
    if (!vitals) {
      alert("No vitals data found. Please enter your vitals first.");
      window.location.href = "/";
    } else {
      setVitalsData(vitals);
    }
  }, []);

  const questions = [
    "I found myself getting upset by quite trivial things",
    "I was aware of dryness of my mouth",
    "I couldn’t seem to experience any positive feeling at all",
    // Add all questions here
  ];

  const stressQuestions = [1, 6, 8, 11, 12, 14, 18, 22, 27, 29, 32, 33, 35, 39];
  const anxietyQuestions = [2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 30, 36, 40, 41];
  const depressionQuestions = [
    3, 5, 10, 13, 16, 17, 21, 24, 26, 31, 34, 37, 38, 42,
  ];

  const calculateResults = () => {
    let stressScore = 0;
    let anxietyScore = 0;
    let depressionScore = 0;
    let isIncomplete = false;

    for (let i = 1; i <= 42; i++) {
      const select = document.getElementById(`q${i}`).value;

      if (select === "") {
        document.getElementById(`q${i}`).style.border = "2px solid red";
        isIncomplete = true;
      } else {
        document.getElementById(`q${i}`).style.border = "1px solid #ccc";
        const score = parseInt(select);
        if (stressQuestions.includes(i)) stressScore += score;
        if (anxietyQuestions.includes(i)) anxietyScore += score;
        if (depressionQuestions.includes(i)) depressionScore += score;
      }
    }

    if (isIncomplete) {
      alert("Please complete all questions before submitting.");
    } else {
      setStressScore(stressScore);
      setAnxietyScore(anxietyScore);
      setDepressionScore(depressionScore);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
              Pulse Rate: {vitalsData.pulse} BPM
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

        {stressScore || anxietyScore || depressionScore ? (
          <div className="mt-6 p-6 bg-green-100 border-l-4 border-green-500 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Your Results:</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Score</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Stress</td>
                  <td>{stressScore}</td>
                  <td>{getStressLevel(stressScore)}</td>
                </tr>
                <tr>
                  <td>Anxiety</td>
                  <td>{anxietyScore}</td>
                  <td>{getAnxietyLevel(anxietyScore)}</td>
                </tr>
                <tr>
                  <td>Depression</td>
                  <td>{depressionScore}</td>
                  <td>{getDepressionLevel(depressionScore)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );

  function getStressLevel(score) {
    if (score <= 14) return "Normal";
    if (score <= 18) return "Mild";
    if (score <= 25) return "Moderate";
    if (score <= 33) return "Severe";
    return "Extremely Severe";
  }

  function getAnxietyLevel(score) {
    if (score <= 7) return "Normal";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    if (score <= 19) return "Severe";
    return "Extremely Severe";
  }

  function getDepressionLevel(score) {
    if (score <= 9) return "Normal";
    if (score <= 13) return "Mild";
    if (score <= 20) return "Moderate";
    if (score <= 27) return "Severe";
    return "Extremely Severe";
  }
}
