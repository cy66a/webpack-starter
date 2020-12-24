import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');

///структура данных
let start = document.getElementById('start');
let quiz = document.getElementById('quiz');
let question = document.getElementById('question');
let qImg = document.getElementById('qImg');
let choiceA = document.getElementById('A');
let choiceC = document.getElementById('B');
let choiceB = document.getElementById('C');
let counter = document.getElementById('counter');
let timeGauge = document.getElementById('timeGauge');
let progress = document.getElementById('progress');

let questions = [];

let questionsPromise = fetch('http://localhost:3000/questions').then(res => {
	return res.json();
});

questionsPromise.then (
	res => {
		debugger;
		questions = res;
	},
	err => {
		debugger;
	}
);

const lastQuestion = questions.length - 1;
console.log(lastQuestion);
let runningQuestion = 0;

function renderQuestion() {
	let q = questions[runningQuestion];
	question.innerHTML = "<p>" + q.question + "</p>";
	qImg.innerHTML = "<img src=" + q.imgSrc + ">";
	choiceA.innerHTML = q.choiceA;
	choiceB.innerHTML = q.choiceB;
	choiceC.innerHTML = q.choiceC;
}

function renderProgress() {
	for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
		progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
	}
}

// Счётчик оставшегося времени

let count = 0;
let questionTime = 10;
let gaugeWidth = 100;
let gaugeUnit = gaugeWidth / questionTime;

function renderCounter() {
	if (count <= questionTime) {
		counter.innerHTML = count;
		timeGauge.style.width = count * gaugeUnit + "%";
		count++;
	} else {
		count = 0;
	}
}

// Начать игру

start.addEventListener('click', startQuiz);

function startQuiz() {
	let timer = setInterval(renderCounter, 1000);

	renderProgress();
	renderQuestion();
	renderCounter();

	start.style.display = 'none';
	menu.style.display = 'none';
	quiz.style.display = 'block';
}

// Проверить ответ

function checkAnswer(answer) {
	if (answer === questions[runningQuestion].correct) {
		container.style.background = "rgba(50, 255, 0, 0.1)";
	} else {
		container.style.background = "rgba(255, 0, 0, 0.1)";
	}
}

// function answerIsCorrect() {
// }




























// версия 1

// let questions = [
//   {
//     category: 'Охота и рыбалка',
//     question: 'Карась или щука?',
//     imgage: 'some image',
// 		responses: [
// 			{id: 'asd', text: 'str2', correct: false},
// 			{id: 'sdf', text: 'str1', correct: true},
// 			{id: 'wer', text: 'str3', correct: false},
// 		]
//   },
//   {
//     category: 'Фотография',
//     question: 'Плёнка или цифра',
//     imgage: 'some image',
// 		responses: [
// 			{id: 'asd', text: 'sertr2', correct: false},
// 			{id: 'sdf', text: 'stref1', correct: true},
// 			{id: 'wer', text: 'sewftr3', correct: false},
// 		]
//   },
// ];


// function getAllquestions() {
//   return qustions.map(question => getQuestionHtml(question)).join('');
// }

// function getQuestionHtml(question) {
//     return `<div class="qustion__container">
//     <div class="question__title">${question.category}</div>     
//   </div>`;
// }

// const app = document.querySelector('.app');

// function render() {
//   app.innerHTML = getQuestionHtml(questions[1]);
// }

// render();