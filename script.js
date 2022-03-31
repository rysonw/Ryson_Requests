//Global Constants
const clueHoldTime = 250; //how long to hold each clue's light/sound
const cluePauseTime = 400; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.35;  //must be between 0.0 and 1.0
var guessCounter = 0

function selectDifficulty() {
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("easyBtn").classList.remove("hidden");
    document.getElementById("mediumBtn").classList.remove("hidden");
    document.getElementById("hardBtn").classList.remove("hidden");
}  

function startGame(x){
  /* if(x == 9) {
    document.getElementById("button5").classList.remove("hidden");
    for (let i = 0; i < x; i++) {
      generateNumber(1, 5)
    }
  }
  else { */
  for (let i = 0; i < x; i++) 
    generateNumber(1, 4)  
  console.log(pattern.length)
  progress = 0;
  gamePlaying = true;
  document.getElementById("easyBtn").classList.add("hidden");
  document.getElementById("mediumBtn").classList.add("hidden");
  document.getElementById("hardBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence()
}


function stopGame(){
    progress = 0;
    gamePlaying = false;
    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("button5").classList.add("hidden");
}


function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}


function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime
  }
}

function guess(btn){
  console.log("user guessed: " + btn);
  
  if(!gamePlaying){
    return;
  }
  
  if(pattern[guessCounter] == btn){
    if(guessCounter == progress){
      if(progress == pattern.length - 1){
        winGame();
      }else{
        progress++;
        playClueSequence();
      }
    }else{
      guessCounter++;
    }
  }else{
    loseGame();
  }
}    


function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
  stopGame();
  alert("Game Over. You WON!");
}
// Sound Synthesis Functions
const freqMap = {
  1: 150,
  2: 250,
  3: 350,
  4: 450,
  5: 550
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
  }
}
function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}


function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function generateNumber(min, max){
    pattern.push(Math.floor((Math.random() * (max-min)) +min));
}




// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

