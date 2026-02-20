const express = require('express');
const app = express()
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const fs = require('fs');
const rawdata = fs.readFileSync('presidents.json');  
const presidents = JSON.parse(rawdata);  

app.get('/', (request, response) => {
  response.redirect('/quiz.html');
});

app.get('/questions', (request, response) => {
  const questions = getQuestions();
  response.status(200);
  response.send(questions);
});

app.get('/process-quiz', (request, response) => {
  const strJSON = request.query['strJSON'];
  const objJSON = JSON.parse(strJSON);
  const answer = getAnswer(objJSON.presNum, objJSON.field);
  const userAnswer = objJSON.userAnswer;
  let responseMsg;
  if (userAnswer == answer) {
    responseMsg = "<span class='right'>Right</span>";
  } else {
    responseMsg = "<span class='wrong'>Wrong</span>";
  }
  response.status(200);
  response.send(responseMsg);
});

function getQuestions() {
  const fields = ['born', 'died', 'first_year', 'last_year', 'party', 'number']
  const questions = [];
  for (president of presidents) {
    const field = fields[Math.floor(Math.random() * fields.length)];
    const presNum = president['number'];
    const data = {
      'presNum': presNum,
      'field': field,
      'question': getQuestion(president, field)
    }
    questions.push(data);
  }
  return questions;
}

function getQuestion(president, field) {
  let question, answers;
  switch(field) {
    case 'born':
      question = `What year was ${president['president']} born?`;
      break;
    case 'died':
      question = `What year did ${president['president']} die?`;
      break;
    case 'first_year':
      question = `What was ${president['president']}'s first year in office?`;
      break;
    case 'last_year':
      question = `What was ${president['president']}'s last year in office?`;
      break;
    case 'party':
      question = `What was ${president['president']}'s party?`;
      break;
    default: //number
      question = `What number president was ${president['president']}?`;
  }
  answers = getAnswers(president[field], field);
  return {
    'question': question,
    'answers': answers
  }
}

function getAnswer(presNum, field) {
  for (president of presidents) {
    if (president['number'] == presNum) {
      return president[field];
    }
  }
}

function getAnswers(correctAnswer, field) {
  const answers = [correctAnswer];
  while (answers.length < 4) {
    const president = presidents[Math.floor(Math.random() * presidents.length)];
    const value = president[field];
    if (answers.indexOf(value) === -1) {
      answers.push(value);
    }
  }
  return shuffle(answers);
}

// Shuffle Array
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

app.listen(8080);