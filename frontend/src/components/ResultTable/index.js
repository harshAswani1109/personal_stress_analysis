import { useRouter } from "next/router";

export default function ResultTable() {
  const router = useRouter();
  const { stressScore, anxietyScore, depressionScore } = router.query;

  const getStressLevel = (score) => {
    if (score <= 14) return "Normal";
    if (score <= 18) return "Mild";
    if (score <= 25) return "Moderate";
    if (score <= 33) return "Severe";
    return "Extremely Severe";
  };

  const getAnxietyLevel = (score) => {
    if (score <= 7) return "Normal";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    if (score <= 19) return "Severe";
    return "Extremely Severe";
  };

  const getDepressionLevel = (score) => {
    if (score <= 9) return "Normal";
    if (score <= 13) return "Mild";
    if (score <= 20) return "Moderate";
    if (score <= 27) return "Severe";
    return "Extremely Severe";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Your DASS-42 Results
        </h1>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Score</th>
              <th className="border px-4 py-2">Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Stress</td>
              <td className="border px-4 py-2">{stressScore}</td>
              <td className="border px-4 py-2">
                {getStressLevel(stressScore)}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Anxiety</td>
              <td className="border px-4 py-2">{anxietyScore}</td>
              <td className="border px-4 py-2">
                {getAnxietyLevel(anxietyScore)}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Depression</td>
              <td className="border px-4 py-2">{depressionScore}</td>
              <td className="border px-4 py-2">
                {getDepressionLevel(depressionScore)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
