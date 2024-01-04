const questions = [
    {
        question : "What is the name of the Developer?",
        answers : [
            {text : "Shark" , correct: false},
            {text : "Paras" , correct: true},
            {text : "adawdw" , correct: false},
            {text : "awdwad" , correct: false},
        ]
    },
    {
        question : "What does 7 represent?",
        answers : [
            {text : "Seven" , correct: false},
            {text : "Thala" , correct: true},
            {text : "6+1" , correct: false},
            {text : "7" , correct: false},
        ]
    },
    {
        question : "Which of the following is Two Zero Two Six?",
        answers : [
            {text : "0066" , correct: false},
            {text : "2066" , correct: false},
            {text : "2026" , correct: true},
            {text : "0026" , correct: false},
        ]
    },
    {
        question : "Cristiano Ronaldo or Messi?",
        answers : [
            {text : "Cristiano Ronaldo" , correct: false},
            {text : "Thala" , correct: true},
            {text : "Messi" , correct: false},
            {text : "Sunil Chhetri" , correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("nextButton");
const container = document.querySelector(".container");

let currentQuestionIndex =0;
let score =0;
var count =0;

function startQuiz(){
    currentQuestionIndex=0;
    score =0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
            const button = document.createElement("div");
            button.innerHTML = answer.text;
            button.classList.add("option");
            answerButtons.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            container.addEventListener("click", function(e){
                if(e.target.className==="option"){
                    selectAnswer(e);
                }
            });
    });
}

function resetState(){
    count =0;
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect && count ==0){
        count=1;
        selectBtn.classList.add("right");
        score++;
    }
    else if(!(isCorrect) && count==0){
        count =1;
        selectBtn.classList.add("wrong");
        Array.from(answerButtons.children).forEach(button =>{
            if(button.dataset.correct ==="true"){
                button.classList.add("right");
            }
        })
    }
    nextButton.style.display = "block";
}
function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex <questions.length){
            showQuestion();
        }
        else{
            showScore();
        }
}

function showScore(){
    resetState();
    questionElement.innerHTML = "YourScore is" +" " +score;
    nextButton.innerHTML = "Start";
    nextButton.style.display ="block";
}

container.addEventListener("click",function(e){
    if(e.target.innerHTML==="Next" || e.target.innerHTML==="Start"){
        if(currentQuestionIndex <questions.length){
            handleNextButton();
        }
        else{
            startQuiz();
        }
    }
})

startQuiz();