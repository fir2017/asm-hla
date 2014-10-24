// ==UserScript==
// @author      Low Saetern
// @version     1.0
// @name        FoobtLifeSaver
// @description Save student's progress for easy recovery in case of natural disasters.
// @include     http://foobt.net/*
// @grant       none
// ==/UserScript==

var answers;
var clearAnswersBtn;
var clearAnswers;

var Foobt = function FoobtNet(){
  
  answers = document.getElementsByName('answers[]');
  clearAnswersBtn = document.getElementsByTagName('body')[0];
  clearAnswersBtn.innerHTML = clearAnswersBtn.innerHTML + '<button id="clearanswers" style="position:fixed;bottom:0;right:0;padding:5px;margin:0 10px 10px 0;z-index:99999">Clear Saved Answers</button>';

  clearAnswers = document.getElementById('clearanswers');

  clearAnswers.addEventListener("click", function(){
    localStorage.clear();
    alert("Answers Cleared!")
  });

  function saveAnswers(i, answer){
    if(localStorage.getItem(i)) {
      answer.value = localStorage.getItem(i);
    }
    else {
      answer.addEventListener("blur", function(){
        if(!localStorage.getItem(i)) {
          localStorage.setItem(i, answer.value);
        }      
      });
    }
  } // end saveAnswers()
  
  setTimeout(function(){
    for( var i = 0; i < answers.length; i++) {
      saveAnswers(i, answers[i]);
    }
  }, 0)
}();