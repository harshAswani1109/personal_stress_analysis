window.onload = function () {
  const vitalsData = JSON.parse(localStorage.getItem("vitalsData"));

  if (!vitalsData) {
    alert("No vitals data found. Please enter your vitals first.");
    window.location.href = "vitals.html";
    return;
  }

  document.getElementById(
    "spo2-display"
  ).textContent = `SpO2: ${vitalsData.spo2}%`;
  document.getElementById(
    "temp-display"
  ).textContent = `Temperature: ${vitalsData.temp}°C`;
  document.getElementById(
    "pulse-display"
  ).textContent = `Pulse Rate: ${vitalsData.pulse} BPM`;

  const questions = [
    "I found myself getting upset by quite trivial things", // 1 (Stress)
    "I was aware of dryness of my mouth", // 2 (Anxiety)
    "I couldn’t seem to experience any positive feeling at all", // 3 (Depression)
    "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)", // 4 (Anxiety)
    "I just couldn’t seem to get going", // 5 (Depression)
    "I tended to over-react to situations", // 6 (Stress)
    "I had a feeling of shakiness (e.g., legs going to give way)", // 7 (Anxiety)
    "I found it difficult to relax", // 8 (Stress)
    "I found myself in situations that made me so anxious I was most relieved when they ended", // 9 (Anxiety)
    "I felt that I had nothing to look forward to", // 10 (Depression)
    "I found myself getting upset rather easily", // 11 (Stress)
    "I felt that I was using a lot of nervous energy", // 12 (Stress)
    "I felt sad and depressed", // 13 (Depression)
    "I found myself getting impatient when I was delayed in any way", // 14 (Stress)
    "I had a feeling of faintness", // 15 (Anxiety)
    "I felt that I had lost interest in just about everything", // 16 (Depression)
    "I felt I wasn’t worth much as a person", // 17 (Depression)
    "I felt that I was rather touchy", // 18 (Stress)
    "I perspired noticeably (e.g., hands sweaty) in the absence of high temperatures or physical exertion", // 19 (Anxiety)
    "I felt scared without any good reason", // 20 (Anxiety)
    "I felt that life wasn’t worthwhile", // 21 (Depression)
    "I found it hard to wind down", // 22 (Stress)
    "I had difficulty in swallowing", // 23 (Anxiety)
    "I couldn’t seem to get any enjoyment out of the things I did", // 24 (Depression),
    "I was aware of the action of my heart in the absence of physical exertion", // 25 (Anxiety)
    "I felt down-hearted and blue", // 26 (Depression)
    "I found that I was very irritable", // 27 (Stress)
    "I felt I was close to panic", // 28 (Anxiety)
    "I found it hard to calm down after something upset me", // 29 (Stress)
    "I feared that I would be thrown by some trivial but unfamiliar task", // 30 (Anxiety)
    "I was unable to become enthusiastic about anything", // 31 (Depression)
    "I found it difficult to tolerate interruptions to what I was doing", // 32 (Stress)
    "I was in a state of nervous tension", // 33 (Stress)
    "I felt I was pretty worthless", // 34 (Depression)
    "I was intolerant of anything that kept me from getting on with what I was doing", // 35 (Stress)
    "I felt terrified", // 36 (Anxiety)
    "I could see nothing in the future to be hopeful about", // 37 (Depression)
    "I felt that life was meaningless", // 38 (Depression)
    "I found myself getting agitated", // 39 (Stress)
    "I was worried about situations in which I might panic and make a fool of myself", // 40 (Anxiety)
    "I experienced trembling (e.g., in the hands)", // 41 (Anxiety)
    "I found it difficult to work up the initiative to do things", // 42 (Depression)
  ];

  const questionsDiv = document.getElementById("questions");
  questions.forEach((question, index) => {
    const questionHTML = `
      <div class="question" id="question${index + 1}">
        <label for="q${index + 1}">${index + 1}. ${question}</label>
        <select id="q${index + 1}" name="q${
      index + 1
    }" onchange="removeHighlight(${index + 1})">
          <option value="" disabled selected>Select</option>
          <option value="0">Never</option>
          <option value="1">Sometimes</option>
          <option value="2">Often</option>
          <option value="3">Almost Always</option>
        </select>
      </div>
    `;
    questionsDiv.innerHTML += questionHTML;
  });
};

const stressQuestions = [1, 6, 8, 11, 12, 14, 18, 22, 27, 29, 32, 33, 35, 39];
const anxietyQuestions = [2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 30, 36, 40, 41];
const depressionQuestions = [
  3, 5, 10, 13, 16, 17, 21, 24, 26, 31, 34, 37, 38, 42,
];

function removeHighlight(index) {
  const selectElement = document.getElementById(`q${index}`);
  selectElement.style.border = "1px solid #ccc"; // Reset the border to normal
}

function calculateResults() {
  let stressScore = 0;
  let anxietyScore = 0;
  let depressionScore = 0;
  let incomplete = false;

  for (let i = 1; i <= 42; i++) {
    const selectElement = document.getElementById(`q${i}`);
    const response = selectElement.value;

    if (response === "") {
      selectElement.style.border = "2px solid red";
      incomplete = true;
    } else {
      selectElement.style.border = "1px solid #ccc";

      const score = parseInt(response);
      if (stressQuestions.includes(i)) {
        stressScore += score;
      } else if (anxietyQuestions.includes(i)) {
        anxietyScore += score;
      } else if (depressionQuestions.includes(i)) {
        depressionScore += score;
      }
    }
  }

  if (incomplete) {
    alert("Please answer all questions before submitting.");
  } else {
    displayResult(stressScore, anxietyScore, depressionScore);
  }
}

function displayResult(stressScore, anxietyScore, depressionScore) {
  const stressLevel = getStressLevel(stressScore);
  const anxietyLevel = getAnxietyLevel(anxietyScore);
  const depressionLevel = getDepressionLevel(depressionScore);

  const resultTextDiv = document.getElementById("resultText");
  resultTextDiv.innerHTML = `
    <table>
      <tr>
        <th>Category</th>
        <th>Score</th>
        <th>Level</th>
      </tr>
      <tr>
        <td>Stress</td>
        <td>${stressScore}</td>
        <td>${stressLevel}</td>
      </tr>
      <tr>
        <td>Anxiety</td>
        <td>${anxietyScore}</td>
        <td>${anxietyLevel}</td>
      </tr>
      <tr>
        <td>Depression</td>
        <td>${depressionScore}</td>
        <td>${depressionLevel}</td>
      </tr>
    </table>
  `;
  document.getElementById("result").style.display = "block";
}

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
