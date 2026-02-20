function checkAnswer(e) {
    const target = e.target;
    const userAnswer = target[target.selectedIndex].value;
    const data = {
        'presNum': target.dataset.presNum,
        'field': target.dataset.field,
        'userAnswer': userAnswer
    }
    const output = document.getElementById(target.id + 'Result');
    const strJSON = encodeURIComponent(JSON.stringify(data));
    output.innerHTML = "checking...";
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", "/process-quiz?strJSON=" + strJSON, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 &&
            xmlhttp.status == 200) {
            output.innerHTML = xmlhttp.responseText;
        }
    }
    
    xmlhttp.send(null);
}

function loadQuestions() {
    const xmlhttp = new XMLHttpRequest();
    let presidents;
    const msg = document.getElementById("msg");
    msg.innerHTML = "Loading Quiz Questions";
    xmlhttp.open("get", "/questions", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 &&
            xmlhttp.status === 200) {
                const decodedResponse = decodeURIComponent(xmlhttp.responseText)
                presidents = JSON.parse(decodedResponse);
            for (president of presidents) {
                addQuestion(president);
            }
            msg.innerHTML = '';
        }
    }
    xmlhttp.send(null);
}

function addQuestion(president) {
    const quiz = document.getElementById("quiz-questions");
    const li = document.createElement('li');
    li.classList.add('question-container');
    quiz.appendChild(li);
    const questionNum = document.querySelectorAll('.question-container').length;
    const label = document.createElement('label');
    label.classList.add('question');
    label.for = 'q' + String(questionNum);
    label.innerHTML = president.question.question;
    li.appendChild(label);
    const choices = document.createElement('select');
    choices.name = label.for;
    choices.id = label.for;
    choices.dataset.presNum = president.presNum;
    choices.dataset.field = president.field;
    choices.addEventListener('change', checkAnswer);
    li.appendChild(choices);
    const optionBlank = document.createElement('option');
    optionBlank.value = 0;
    optionBlank.text = "--PLEASE SELECT--";
    choices.appendChild(optionBlank);
    for (answer of president.question.answers) {
        const option = document.createElement('option');
        option.value = answer;
        option.text = answer;
        choices.appendChild(option);
    }
    const output = document.createElement('output');
    output.classList.add('result');
    output.id = label.for + 'Result';
    li.appendChild(output);
}

window.addEventListener('load', function() {
    loadQuestions();
})