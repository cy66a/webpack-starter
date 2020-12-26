let questions = [
  {
    category: 'HTML',
    question: 'Что такое HTML?',
    imgage: 'some image',
		responses: [
			{id: '1', text: 'Язык разметки', correct: false},
			{id: '2', text: 'Язык гипертекстовой разметки', correct: true},
			{id: '3', text: 'Язык', correct: false},
		]
  },
  {
    category: 'CSS',
    question: 'Что такое CSS?',
    imgage: 'some image',
		responses: [
			{id: '1', text: 'Каскад', correct: false},
			{id: '2', text: 'Каскадная таблица стилей', correct: true},
			{id: '3', text: 'Каскадная таблица', correct: false},
		]
  },
];

function getAllquestions() {
  return qustions.map(question => getQuestionHtml(question)).join('');
}

function getQuestionHtml(question) {
    return `<div class="qustion__container">
    <div class="question__title">${question.category}</div>     
  </div>`;
}

const app = document.querySelector('.app');

function render() {
  app.innerHTML = getQuestionHtml(questions[1]);
}




render();