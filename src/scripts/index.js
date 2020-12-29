import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
	require('../index.html');
}

console.log('webpack starterkit');

///структура данных

let questionsPromise = fetch('http://localhost:3000/questions').then(res => {
	return res.json();
});

questionsPromise.then(
	res => {
		questions = res;
	},
	err => {
		debugger;
	}
);

let questions = [];
let quiz = document.getElementById('quiz');
let question = document.getElementById('question');
let questionImage = document.getElementById('questionImage');
let counter = document.getElementById('counter');
let timeGauge = document.getElementById('timeGauge');
let progress = document.getElementById('progress');
let runningQuestion = 0;

function renderQuestion() {
	let q = questions[runningQuestion];
	question.innerHTML = "<p>" + q.question + "</p>";
	questionImage.innerHTML = "<img src=" + q.imgSrc + ">";

	let choiceA = document.getElementById('A');
	choiceA.innerHTML = q.choiceA;
	let choiceB = document.getElementById('B');
	choiceB.innerHTML = q.choiceB;
	let choiceC = document.getElementById('C');
	choiceC.innerHTML = q.choiceC;
}

function renderProgress() {
	let lastQuestion = questions.length - 1;
	for (let i = 0; i <= lastQuestion; i++) {
		progress.innerHTML += `<div class="progress__status" id=${i}></div>`;
	}
}

// Счётчик оставшегося времени
let count = 0;

function renderCounter() {
	let questionTime = 10;
	let gaugeWidth = 100;
	let gaugeUnit = gaugeWidth / questionTime;
	if (count <= questionTime) {
		counter.innerHTML = count;
		timeGauge.style.width = count * gaugeUnit + "%";
		count++;
	} else {
		count = 0;
		answerIsWrong();
		if(runningQuestion < (questions.length - 1)) {
			runningQuestion++;
			renderQuestion();
		}
	}
}

// Начать игру
let start = document.getElementById('menu__start');
let topic = document.getElementById('menu__topic');

function main() {
	start.addEventListener('click', startQuiz);
	topic.addEventListener('click', showTopics);
}

function startQuiz() {
	setInterval(renderCounter, 1000);
	renderProgress();
	renderQuestion();
	renderCounter();
	start.style.display = 'none';
	menu.style.display = 'none';
	quiz.style.display = 'block';
}

function showTopics() {

	container.innerHTML = `
		<div class="topic__menu">
			<button class="topic" id="HTML">HTML</button>
			<button class="topic" id="CSS">CSS</button>
			<button class="topic" id="JS">JS</button>
		</div>
		`;
}

choices.addEventListener('click', (event) => {
	if (event.target.id === questions[runningQuestion].correct) {
		answerIsCorrect();
		alert('Молодец, ты победил!');
		runningQuestion++;
		count = 0;
		if (runningQuestion >= questions.length) {
			alert('Вопросы закончились!');

			let container = document.getElementById('container');
			container.innerHTML = `<div class="final">
			<div>Поздравляю с хорошим результатом!</div>
			<button class="main__menu">Вернуться в главное меню</button>
			</div>`;

		} else {
			renderQuestion();
		}

	} else {
		count = 0;
		alert('Боюсь, ты ошибся!');
		answerIsWrong();
		runningQuestion++;
		renderQuestion();
	}
});


function answerIsCorrect() {
	document.getElementById(runningQuestion).style.backgroundColor = '#8fe9b7';
}

function answerIsWrong() {
	document.getElementById(runningQuestion).style.backgroundColor = '#f00';
}


main();


// Интересные факты
// let facts = [
// 	{ id:1,
// 		fact: 'Язык гипертекстовой разметки HTML был разработан британским учёным Тимом Бернерсом-Ли приблизительно в 1986—1991 годах в стенах ЦЕРНа в Женеве в Швейцарии',
// 	},
// ];


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

// function fact() {
// 	let container = document.getElementById('container');
// 	container.innerHTML = `<div class="fact">Ты молодец! Здесь будет интересный факт</div>`;
// 	// runningQuestion++;
// 	// renderQuestion();
// 	setTimeout(renderQuestion, 1000);
// }

// let jsArray = questions.filter(function(value) { return value;
// });

// console.log(jsArray);

// let choice = document.querySelector('.choices');