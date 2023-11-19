/*
 * addTempClass
 * jQuery plugin for add a class to an element for a custom time.
 * Support callbacks when class is removed.
 *
 * @param   {string}    className   The class to add
 * @param   {number}    expire      Time in miliseconds before remove the new class
 * @param   {function}  callback    The function invoked after remove the class
 * @return  void
 *
 * Ej.: $( 'body' ).addTempClass( 'myClass', 2000, function () { console.log( 'tada!') } );
 */
( function ( $ ) {
    'use strict';
    $.fn.addTempClass = function ( className, expire, callback ) {
        className || ( className = '' );
        expire || ( expire = 1500 );
        return this.each( function () {
            $( this ).addClass( className ).delay( expire ).queue( function () {
                $( this ).removeClass( className ).clearQueue();
                callback && callback();
            } );
        } );
    };
} ( jQuery ) );

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function(event){
	if (event.key == "a" || event.key == "A"){
		$("#level-title").text("Level "+level);
		nextSequence();
	};
});  

$("div[type='button']").on("click",function(){
	var id = this.id;
	//$("#"+id).delay(50).fadeOut().fadeIn('slow');
	$("#"+id).addTempClass("pressed", 100 );
	userClickedPattern.push(id);
	playSound(id);
	checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
	var randomNumber = Math.floor(Math.random()*4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#"+randomChosenColour).delay(100).fadeOut().fadeIn('slow');
	level+=1;
	userClickedPattern = [];
	playSound(randomChosenColour);
}

function playSound(optChoice){
	var audioFile="../sounds/"+optChoice+".mp3";
	var audio = new Audio(audioFile);
	console.log(audioFile)
	audio.play();
}

function checkAnswer (currentLevel){
	var x = userClickedPattern.length;
	for(var i = 0; i<x;i++){
		if (gamePattern[i] != userClickedPattern[i]){
			console.log("Wrong");
			$("body").addTempClass("game-over",100);
			$("h1").text("Game Over, Press 'A'' Key to Restart");
			startOver();
			break;
		}else{
			console.log("Success");
		}
	}
	if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
		console.log("Success");
		if (userClickedPattern.length === gamePattern.length){
			setTimeout(function () {
			nextSequence();
			}, 1000);
		}
	}
};

function startOver(){
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
}