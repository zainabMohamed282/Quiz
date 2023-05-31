let countSpan = document.querySelector('.count span');
let spanBullets =document.querySelector('.bullets .spans')
let quizArea = document.querySelector('.quiz-area');
let answersArea = document.querySelector('.answers-area');
let submitBtn = document.querySelector('.submit_btn');
let bullets =document.querySelector('.bullets');
let results = document.querySelector('.results');
let countdownContainer =document.querySelector('.countdown');
 let category =document.querySelector('#category');
 let start = document.querySelector('.start button');
 let layer = document.querySelector('.layer');
 let quizApp = document.querySelector('quiz-app');
 
let currentIndex =0;
let rightAnswers = 0;
let countDownInterval;


function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET",`../questions-1.json`);
    myRequest.send();
    myRequest.addEventListener("readystatechange", function(){
        if(myRequest.readyState===4 && myRequest.status===200){
        let questionsObject =JSON.parse(myRequest.response);
         let qCount = questionsObject.length;
        createBullets(qCount);
        addQuestionData(questionsObject[currentIndex],qCount);
        countDown(20,qCount);

          submitBtn.onclick =()=>{
            let rightAnswer = questionsObject[currentIndex].Right_answer;
            console.log(rightAnswer);

            currentIndex++;

            checkAnswer(rightAnswer,qCount);
            quizArea.innerHTML='';
            answersArea.innerHTML='';
            addQuestionData(questionsObject[currentIndex],qCount);

            hadleBulets();
            clearInterval(countDownInterval);
            countDown(20,qCount);
            showResults(qCount);
 
          }

        }
    })
}
start.onclick = function(){
  layer.remove();
   getQuestions();
}

function createBullets(num){
countSpan.innerHTML =num;

for(let i=0 ; i<num ; i++){
    let theBullet = document.createElement('span');
    if(i === 0){
        theBullet.className = 'on'
    }
    spanBullets.appendChild(theBullet);
}
}

function addQuestionData(obj,count){
    if(currentIndex<count){ 
     let question = document.createElement('h2');
    let questionText = document.createTextNode(obj.question);
    question.appendChild(questionText);
    quizArea.appendChild(question);

    for(let i=1 ; i<=4; i++){
        let mainDiv = document.createElement('div');
        mainDiv.className = 'answer';
        let radioInput = document.createElement('input');
        radioInput.name = 'question';
        radioInput.type = 'radio';
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`];
 
        let theLable = document.createElement('label');
        theLable.htmlFor = `answer_${i}`;
        let theLableText = document.createTextNode(obj[`answer_${i}`]);
        theLable.appendChild(theLableText);

        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLable);

        answersArea.appendChild(mainDiv)

    }
}}

 function checkAnswer(ranswer,count){
   let answers = document.getElementsByName('question');
   let choosenAnswer;
   
   for(let i =0 ; i< answers.length; i++){
     if(answers[i].checked){
        choosenAnswer = answers[i].dataset.answer;
     }
   }
   if(ranswer == choosenAnswer){
    rightAnswers++;
    }
   
 }

 function hadleBulets(){
    let spanBullets = document.querySelectorAll('.bullets .spans span');
    let arrayOfSpans = Array.from(spanBullets);
    arrayOfSpans.forEach((span,index)=>{
        if(currentIndex == index){
            span.className ='on'
        }
    })
 }

 function showResults(count){
    if(currentIndex == count){
        quizArea.remove();
        answersArea.remove();
        submitBtn.remove();
        bullets.remove();
        if (rightAnswers > count / 2 && rightAnswers < count) {
          theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
          } else if (rightAnswers === count) {
            theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
          } else {
            theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
          }

      
          results.innerHTML = theResults;
          results.style.padding = "10px";
          results.style.backgroundColor = "white";
          results.style.marginTop = "10px";
          results.style.textAlign ="center"
     }
 }
 

 function countDown(duration,count){
  if(currentIndex < count){
    let minutes,seconds;
    countDownInterval = setInterval(function(){
      minutes = parseInt(duration / 60);
      seconds =parseInt(duration % 60);

      minutes = minutes<10? `0${minutes}`:minutes;
      seconds = seconds<10? `0${seconds}`:seconds;

      countdownContainer.innerHTML = `${minutes} : ${seconds}`;
      if(--duration < 0){
        clearInterval(countDownInterval);
        submitBtn.click();
      }

    },1000)
  }
 }

  
