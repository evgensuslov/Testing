"use strict";
//==========================================
const $ = document.querySelector.bind(document);
// const questions = require('../../js/questions.js');
//глобальные переменные
const quiz = $(".quiz__wrapper"); // карточка опроса
const warning = $(".quiz__warning"); // карточка предупреждения
const explanation = $(".quiz__questions-explanation"); // вплывающая подсказка
const listQuestion = $(".quiz__questions-list"); // список вопросов

let count = 0; // количество вопросов
let userScore = 0; // количество правильных ответов

let btnAnswer = $(".quiz__questions-answer"); // кнопка перехода
let btnNext = $(".quiz__questions-next"); // кнопка перехода

// проверка файла с вопросами
if (typeof questions !== 'undefined' && questions.length > 0) {
    quiz.classList.remove('hidden');
    showQuetions(count);
} else {
    warning.classList.remove('hidden');
}

//ожидание нажатия кнопки
btnAnswer.onclick = checkAnswer;
btnNext.onclick = showQuetions;

//построение карточки опроса
function showQuetions() {
    const title = $(".quiz__questions-title");
    const total = $(".quiz__questions-total");
    let progress = $(".quiz__progress-inner");

    explanation.classList.add('hidden');
    title.innerHTML = `${questions[count].question}`;
    listQuestion.innerHTML = '';
    let tikAnswerNumber = 1;
    questions[count].answer.forEach(item => {
        const text = `
            <li class="quiz__questions-item">
                <label class="answer">
                    <input value="${tikAnswerNumber}" type="checkbox" class="answer" name="answer">
                    ${item}
                </label>
            </li>
        `;
        tikAnswerNumber += 1;
        listQuestion.insertAdjacentHTML("beforeend", text);
    });

    total.innerHTML = `${count + 1} из ${questions.length}`;
    progress.style.width = `${Math.round(((count + 1) / questions.length) * 100)}%`;

    btnAnswer.disabled = false;

}

// проверка выбора ответа
function checkAnswer() {
    const markCheckbox = listQuestion.querySelector('input[type="checkbox"]:checked');
// проверка выбран ли чекбокс
    if (!markCheckbox) {
        btnAnswer.blur();
        return
    } else {
        btnAnswer.disabled = true;
    }

    const markLabel = markCheckbox.parentElement;
// получение номера выбраного ответа
    const userAnswer = parseInt(markCheckbox.value);

// проверка ответа пользователя, 
    if (userAnswer === questions[count].answerCorrect) {
        userScore += 1; //изменение счетчика правильных ответов
        markLabel.classList.add("answer-correct");  // отметка правильного ответа
        markCheckbox.classList.add("answer-correct-checkbox");

    } else {
        markLabel.classList.add("answer-incorrect");  // отметка не правильного ответа
        markCheckbox.classList.add("answer-incorrect-checkbox");

        const listAnswer = listQuestion.querySelectorAll('input'); // отметка правильного ответа
        listAnswer.forEach(item => {
            if (parseInt(item.value) === questions[count].answerCorrect) {
                setTimeout(() => {
                    item.checked = true;
                    item.classList.add("answer-correct-checkbox");
                    item.parentElement.classList.add("answer-correct");
                }, 500);
            } else {
                item.setAttribute("disabled", "true");  // блокировка других вариантов
            }
            
        })

        explanation.innerHTML = `${questions[count].explanation}`; // вывод обьяснения
        setTimeout(() => {
            explanation.classList.remove('hidden');
        }, 1000);
    }

    

    if ((count + 1) !== questions.length) {
            count += 1;
            return;
    } else {
        setTimeout(() => {
            showResult();
        }, 3000);
        
    }
}

function showResult() {
    const result = $(".quiz__result");
    const resultText = $(".quiz__result-text");

    result.classList.remove('hidden');
    quiz.classList.add('hidden');
    resultText.innerHTML = `Колличество правильных ответов ${userScore} из ${questions.length}`
    return;

}