// ==UserScript==
// @name         Grade Calculator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://family.ausd.us/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
	var studentScore = [];
    var possibleScore = [];
	

    if(document.URL.indexOf("scores") != -1){
        calculateAssignments();
        alert("You have a grade for "+studentScore.length+" assginments. Out of "+possibleScore.length+" assignments.");
        var pointSystem = confirm("Is this class a point system?");
        if(pointSystem){
        	var studentSum = 0;
            for(var i = 0; i < studentScore.length; i++){
                if(!isNaN(studentScore[i])){
                	studentSum += studentScore[i];
                }
            }
			var assignmentSum = 0;
            for(var i = 0; i < possibleScore.length; i++){
                if(!isNaN(possibleScore[i])){
                	assignmentSum += possibleScore[i];
                }
            }
            alert("You have "+studentSum+" points out of a possible "+assignmentSum);
        }
        var done = false;
        var percentageWorth;
        var gradeWant;
        do{
            percentageWorth = prompt("How much is your final/midterm worth?");
            if(!isNaN(percentageWorth) && percentageWorth !== null && percentageWorth !== ''){
            	done = confirm("You entered "+percentageWorth+"%. Correct?");
            }
        }while(!done);
        done = false;
        do{
            gradeWant = prompt("What grade do you want in the class?");
            if(!isNaN(gradeWant) && gradeWant !== null && gradeWant !== ''){
            	done = confirm("You entered "+gradeWant+"%. Correct?");
            }
        }while(!done);

		//Thanks Roger for the formula xD.
        var gradeNeededOnFinal = ((((gradeWant/100) - ((1 - (percentageWorth/100)) *((getGrade()/100)))).toFixed(4) / (percentageWorth/100).toFixed(4)))*100;
        var littleMsg = "";
        if(gradeNeededOnFinal > 100){
        	littleMsg = "See you at UC ELAC!";
        }else if(gradeNeededOnFinal >95){
            littleMsg = "BOI YOU BETTER START STUDYING!!!";
        }else if(gradeNeededOnFinal > 90){
        	littleMsg = "You should probably study.";
        }else if(gradeNeededOnFinal > 80){
        	littleMsg = "Meh. Don't really need to study";
        }else{
        	littleMsg = "Take a nap fool.";
        }
        alert("You need to get a "+gradeNeededOnFinal+"% on the final. "+littleMsg);
    }
    function calculateAssignments(){
        var array = document.getElementsByClassName("bold-underline");
        studentScore = [];
        possibleScore = [];

        for(var i = 0; i < array.length; i++){
			var tempSplit = array[i].innerHTML.split("/");
			if(isNaN(parseFloat(tempSplit[0])) && !isNaN(parseFloat(tempSplit[1])) || parseFloat(tempSplit[0]) == 0 ){
                possibleScore.push(parseInt(tempSplit[1]));
        	}else{
				studentScore.push(parseInt(tempSplit[0]));
          	    possibleScore.push(parseInt(tempSplit[1]));
        	}
        }
    }
    function getGrade(){
        var currentGrade = document.getElementsByTagName("td");
        currentGrade = currentGrade[3].innerHTML;
        currentGrade = currentGrade.substring(currentGrade.indexOf("t>")+2);
        currentGrade = currentGrade.substring(0, currentGrade.indexOf("%"));
        currentGrade = parseFloat(currentGrade).toFixed(2);
        return currentGrade;
    }
})();
