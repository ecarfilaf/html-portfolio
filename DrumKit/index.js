
var objs = document.querySelectorAll(".drum");

for(var i = 0; i < objs.length; i++){
	document.querySelectorAll(".drum")[i].addEventListener("click", function(){
		
		var btnInnerHtml = this.innerHTML;
		playAudio(btnInnerHtml);
		btnAnimation(btnInnerHtml);
		});
}

function playAudio(key){
	var audioFile = "sounds/";
	switch (key){
		case "w": audioFile+= 'tom-1.mp3'; break;
		case "a": audioFile+= 'tom-2.mp3'; break;
		case "s": audioFile+= 'tom-3.mp3'; break;
		case "d": audioFile+= 'tom-4.mp3'; break;
		case "j": audioFile+= 'crash.mp3'; break;
		case "k": audioFile+= 'kick-bass.mp3'; break;
		case "l": audioFile+= 'snare.mp3'; break;
		default: break;
	}
	var audio = new Audio(audioFile);
	audio.play();
};

function handleClick(){
	alert("I got clicked!");
}

document .addEventListener("keypress", function (event){
	playAudio(event.key);
	btnAnimation(event.key);
});

function btnAnimation(currentKey){
	var activeBtn = document.querySelector("."+currentKey);
	activeBtn.classList.add("pressed");

	setTimeout(function() {
		activeBtn.classList.remove("pressed");
	}, 200);
}