const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false },
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false },
      ],
    },
    {
      question: "What is the largest ocean on Earth?",
      answers: [
        { text: "Atlantic Ocean", correct: false },
        { text: "Indian Ocean", correct: false },
        { text: "Arctic Ocean", correct: false },
        { text: "Pacific Ocean", correct: true },
      ],
    },
  ];
  
  let questionIndexNo = 0;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");
  const nextButton = document.getElementById("next-button");
  const result = document.getElementById("result");
  const again = document.getElementById("again");
  
  function showQuestion() {
    resetQuestion();
  
    const question = questions[questionIndexNo].question;
    questionElement.innerText = question;
  
    const answers = questions[questionIndexNo].answers;
    answers.forEach((answer) => {
      let button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answersElement.appendChild(button);
    });
  }
  
  function selectAnswer(e) {
    const clickedbtn = e.target;
  
    const allBtns = answersElement.querySelectorAll("button");
    allBtns.forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.correct == "true") {
        btn.style.backgroundColor = "green";
      } else {
        btn.style.backgroundColor = "red";
      }
    });
  
    const correct = clickedbtn.dataset.correct == "true";
    if (correct) {
      score += 1;
    }
  
    nextButton.style.display = "block";
  
    nextButton.replaceWith(nextButton.cloneNode(true));
    const clonedNextButton = document.getElementById("next-button");
    clonedNextButton.style.display = "block";
    clonedNextButton.addEventListener("click", nextQuestion);
  }
  
  function nextQuestion() {
    questionIndexNo++;
    if (questionIndexNo < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    questionElement.style.display = "none";
    answersElement.style.display = "none";
    nextButton.style.display = "none";
    result.innerText = `Your score is ${score} out of ${questions.length}.`;
    again.style.display = "block";
    again.addEventListener("click", resetQuiz);
  }
  
  function resetQuiz() {
    questionIndexNo = 0;
    score = 0;
    questionElement.style.display = "block";
    answersElement.style.display = "block";
    result.innerText = "";
    again.style.display = "none";
    showQuestion();
  }
  
  function resetQuestion() {
    nextButton.style.display = "none";
    while (answersElement.firstChild) {
      answersElement.removeChild(answersElement.firstChild);
    }
  }
  
  showQuestion();
  