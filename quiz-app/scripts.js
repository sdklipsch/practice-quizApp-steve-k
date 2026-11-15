import { quizData } from './quizData.js'

const { quizTitle, questionList } = quizData;

/** CREATE OBJECTS REPRESENTING HTML ELEMENTS **/
const quizTitleHeading = document.getElementById('quiz-title');
const questionDisplay = document.getElementById('question-display');
const choiceButtons = document.querySelectorAll('.choice-button');
const resultDisplay = document.getElementById('result-display');
const nextQuestionButton = document.getElementById('next-question');

/** Declare global variables needed **/

let currentQuestionIndex = 0;

/** RENDER PAGE AND START QUIZ APP **/

quizTitleHeading.textContent = quizTitle;
renderQuestion();

/** EVENT LISTENERS **/

choiceButtons.forEach(button => {
    button.addEventListener('click', handleOptionClick)
})

nextQuestionButton.addEventListener('click', handleNextQuestionClick);

/** TASK FUNCTIONS **/

function renderQuestion() {
    
    // Data
    const currentQuestion = questionList[currentQuestionIndex];

    questionDisplay.textContent = currentQuestion.question;
    choiceButtons.forEach((button, i) => {
        button.textContent = currentQuestion.options[i];
        // make button enabled and displayed
        button.disabled = false;
    });
    resultDisplay.textContent = '';
    
}

function handleOptionClick(event) {
    const selectedButton = event.target;
    const currentQuestion = questionList[currentQuestionIndex];
    const isCorrect = selectedButton.textContent === currentQuestion.options[currentQuestion.correctIndex];
    resultDisplay.textContent = isCorrect ? 'Correct answer. great job!' : 'Sorry that is not correct.';
    choiceButtons.forEach(button => button.disabled = true)
    resultDisplay.style.display = 'block';
    nextQuestionButton.style.display = 'block';
}

function handleNextQuestionClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex === questionList.length) {
        questionDisplay.textContent = 'Quiz Completed';
        resultDisplay.textContent = 'Thank you for playing!';
        choiceButtons.forEach(button => {
            button.style.display = 'none';
        })
        nextQuestionButton.style.display = 'none';
    } else {
        renderQuestion();
    }
    
}