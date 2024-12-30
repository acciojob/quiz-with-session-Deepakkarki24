// Updated JS code

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Function to render questions
function renderQuestions() {
  const questionContainer = document.getElementById("questions");
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question-block");

    // Display question
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Display choices
    question.choices.forEach((choice) => {
      const label = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);

      // Restore selected choice from sessionStorage
      if (savedProgress[index] === choice) {
        choiceElement.checked = true;
		choiceElement.setAttribute("checked", "true"); // Explicitly set checked attribute
      }
     

      // Save choice to sessionStorage on selection
      choiceElement.addEventListener("change", () => {
        savedProgress[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionElement.appendChild(label);
    });

    questionContainer.appendChild(questionElement);
  });
}

// Function to calculate and display score
function calculateScore() {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  questions.forEach((question, index) => {
    if (savedProgress[index] === question.answer) {
      score++;
    }
  });

  // Display score
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Save score to localStorage
  localStorage.setItem("score", score);
}

// Render questions on page load
renderQuestions();

// Add event listener to submit button
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", calculateScore);
