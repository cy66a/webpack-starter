import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
	require('../index.html');
}

console.log('webpack starterkit');

///структура данных
let start = document.getElementById('menu__start');
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

// Получение данных с сервера
questionsPromise.then(
	res => {
		questions = res;
	},
	err => {
		debugger;
	}
);

const lastQuestion = questions.length - 1;
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

// function checkAnswer(answer) {
// 	if (answer === questions[runningQuestion].correct) {
// 	alert('Всё верно, молодец!');
// 	answerIsCorrect();
// 	} 
// 	else { alert('Ты ошибся!')
// 	}
// 	if (runningQuestion < lastQuestion) {
// 		runningQuestion++;
// 		renderQuestion();
// 	}

// }

// function answerIsCorrect (){
// 	document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
// }

// function answerIsWrong (){
// 	document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
// }

let choice = document.querySelector('.choice');
choice.addEventListener('click', (event) => {
	if (event.target.id === questions.[runningQuestion].correct) {
		alert ('Молодец, ты победил!');
	} 
	else  {
		alert ('Боюсь, ты ошибся!'); 
	}
});