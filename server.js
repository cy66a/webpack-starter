/**
 * API
 * 
 * PUT =>    input {title: 'string'} output {title: 'string', id: 1}
 * GET =>                            output [{title: 'string', id: 1}, ...]
 * DELETE => input {id: 1}           output [{title: 'string', id: 1}, ...]
 */
let questions = [
  {
    id: 1,
    question: 'Что такое html?',
    imgSrc: 'img/html.png',
    choiceA: 'Язык гипертекстовой разметки',
    choiceB: 'Язык программирования',
    choiceC: 'Каскадный язык стилей',
    correct: 'A'
  },
  {
    id: 2,
    question: 'Что такое CSS?',
    imgSrc: 'img/css.png',
    choiceA: 'Язык гипертекстовой разметки',
    choiceB: 'Каскадный язык стилей',
    choiceC: 'Язык програяммировани',
    correct: 'B'
  },
  {
    id: 3,
    question: 'Что такое JS?',
    imgSrc: 'img/js.png',
    choiceA: 'Язык гипертекстовой разметки',
    choiceB: 'Каскадный язык стилей',
    choiceC: 'Язык программирования',
    correct: 'C'
  },
  {
    id: 4,
    question: 'Что такое PHP?',
    imgSrc: 'img/php.png',
    choiceA: 'Язык гипертекстовой разметки',
    choiceB: 'Язык',
    choiceC: 'Язык программирования',
    correct: 'C'
  },
];
let questionId = 5;
var express = require("express");
var app = express();
const jsonParser = express.json();
function resolveCors(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
}
app.use("/questions", jsonParser, function (req, res) {
  resolveCors(res);
  switch (req.method) {
    case "GET":
      break;
    case "PUT":
      questionsId++;
      questions.push({ id: questionId, question: req.body.question });
      res.json(questions[questions.length - 1]);
      return;
    case "DELETE":
      questions = questions.filter((item) => item.id !== req.body.id);
      break;
  }
  res.json(questions);
});
app.listen(3000, function () {
  console.log("ExpressJs server run on 3000 port");
});