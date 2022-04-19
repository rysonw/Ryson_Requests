//Global Variables
var currentScore = 0;
var pattern = [];
var hiscore_names_e = ["", "", ""];
var hiscore_nums_e = [0, 0, 0];
var hiscore_names_t = ["", "", ""];
var hiscore_nums_t = [0, 0, 0];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.35; //must be between 0.0 and 1.0
var guessCounter = 0;
var endless = false;
var timed = false;
var clueHoldTime = 250; //how long to hold each clue's light/sound
var clueHoldTimeTrial = 500;
var cluePauseTime = 400; //how long to pause in between clues
var nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
var lives = 2


function selectDifficulty() {
  document.getElementById("instruction").innerHTML =
    "Repeat the pattern for as long as possible! <br/> https://github.com/rysonw/Ryson_Requests";
  document.getElementById("classicBtn").classList.add("hidden");
  document.getElementById("easyBtn").classList.remove("hidden");
  document.getElementById("mediumBtn").classList.remove("hidden");
  document.getElementById("hardBtn").classList.remove("hidden");
  document.getElementById("insaneBtn").classList.remove("hidden");
  document.getElementById("endlessBtn").classList.add("hidden");
  document.getElementById("timeBtn").classList.add("hidden");
}

function startClassicGame(x) {
  if (x == 9) {
    //HARD
    document.getElementById("button5").classList.remove("hidden");
    for (let i = 0; i < x; i++) {
      generateNumber(1, 6);
    }
  } else if (x == 20) {
    //INSANE
    document.getElementById("button5").classList.remove("hidden");
    document.getElementById("button6").classList.remove("hidden");
    for (let i = 0; i < x; i++) {
      generateNumber(1, 7);
    }
  } else {
    for (let i = 0; i < x; i++) {
      generateNumber(1, 5);
    }
  }

  console.log(pattern.length);
  progress = 0;
  gamePlaying = true;
  document.getElementById("easyBtn").classList.add("hidden");
  document.getElementById("mediumBtn").classList.add("hidden");
  document.getElementById("hardBtn").classList.add("hidden");
  document.getElementById("insaneBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function startEndlessGame() {
  document.getElementById("score_endless_title").classList.remove("hidden");
  document.getElementById("score_endless_one").classList.remove("hidden");
  document.getElementById("score_endless_two").classList.remove("hidden");
  document.getElementById("score_endless_three").classList.remove("hidden");
  document.getElementById("instruction").innerHTML =
    "Survive for as long as possible! Try to beat the high score! <br/> https://github.com/rysonw/Ryson_Requests";
  document.getElementById("classicBtn").classList.add("hidden");
  document.getElementById("endlessBtn").classList.add("hidden");
  document.getElementById("timeBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  endless = true;
  generateNumber(1, 4);
  console.log(pattern.length);
  progress = 0;
  gamePlaying = true;
  playEndlessClueSequence();
}

function startTimeGame() {
  while (gamePlaying == true) {
    generateNumber(1, 4);
  }
  timed = true;
  console.log(pattern.length);
  progress = 0;
  gamePlaying = true;
  document.getElementById("instruction").innerHTML =
    "3 lives, a timer and the pattern gets faster every round! How long can you last? <br/> https://github.com/rysonw/Ryson_Requests";
  document.getElementById("classicBtn").classList.add("hidden");
  document.getElementById("endlessBtn").classList.add("hidden");
  document.getElementById("timeBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("score_timed_title").classList.remove("hidden");
  document.getElementById("score_timed_one").classList.remove("hidden");
  document.getElementById("score_timed_two").classList.remove("hidden");
  document.getElementById("score_timed_three").classList.remove("hidden");
  document.getElementById("life1").classList.remove("hidden");
  document.getElementById("life2").classList.remove("hidden");
  document.getElementById("life3").classList.remove("hidden");
  playTimedClueSequence();
}

function stopGame() {
  progress = 0;
  gamePlaying = false;
  document.getElementById("classicBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("button5").classList.add("hidden");
  document.getElementById("button6").classList.add("hidden");
  document.getElementById("endlessBtn").classList.remove("hidden");
  document.getElementById("timeBtn").classList.remove("hidden");
  document.getElementById("score_endless_title").classList.add("hidden");
  document.getElementById("score_endless_one").classList.add("hidden");
  document.getElementById("score_endless_two").classList.add("hidden");
  document.getElementById("score_endless_three").classList.add("hidden");
  document.getElementById("score_timed_title").classList.add("hidden");
  document.getElementById("score_timed_one").classList.add("hidden");
  document.getElementById("score_timed_two").classList.add("hidden");
  document.getElementById("score_timed_three").classList.add("hidden");
  document.getElementById("life1").classList.add("hidden");
  document.getElementById("life2").classList.add("hidden");
  document.getElementById("life3").classList.add("hidden");
  document.getElementById("instruction").innerHTML =
    "Welcome! <br/> https://github.com/rysonw/Ryson_Requests";
  endless = false;
  timed = false;
  pattern = [];
  var lives = 2
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

function playEndlessClueSequence() {
  generateNumber(1, 5);
  guessCounter = 0;
  var x = 0;
  endless = true;
  currentScore = x;
  let delay = nextClueWaitTime; //set delay to initial wait time
  console.log("play single clue: " + pattern[x] + " in " + delay + "ms");
  setTimeout(playSingleClue, delay, pattern[x]); // set a timeout to play that clue
  delay += clueHoldTime;
  delay += cluePauseTime;
  playEndlessClueSequence();
}

function playTimedClueSequence() {
  generateNumber(1, 5);
  guessCounter = 0;
  var x = 0;
  timed = true;
  currentScore = x;
  let delay = nextClueWaitTime; //set delay to initial wait time
  console.log("play single clue: " + pattern[x] + " in " + delay + "ms");
  setTimeout(playSingleClue, delay, pattern[x]); // set a timeout to play that clue
  clueHoldTimeTrial -= 
  delay += cluePauseTime;
  playTimedClueSequence();
}


function guess(btn, x) {
  console.log("user guessed: " + btn);

  if (!gamePlaying) {
    return;
  }
  
  if (timed != true) {
    if (pattern[guessCounter] == btn) {
      if (guessCounter == progress) {
        if (progress == pattern.length - 1) {
          winGame();
        } else {
          progress++;
          playClueSequence();
        }
      } else {
        guessCounter++;
      }
    } else {
      loseGame(guessCounter);
    }
  }
  
  else {
    if (pattern[guessCounter] == btn) {
      if (guessCounter == progress) {
        if (progress == pattern.length - 1) {
          winGame();
        } else {
          progress++;
          playClueSequence();
        }
      } else {
        guessCounter++;
      }
    } else {
      if (lives > 0) {
        if (lives == 2) {
          document.getElementById("life3").classList.add("hidden");
        }
        else if (lives == 1) {
          document.getElementById("life2").classList.add("hidden");
        }
        lives -= 1
        progress++;
        playClueSequence();
      }
      else if (lives == 0) {
        loseGame(guessCounter);
      }
    }
  }
}

function loseGame(x) {
  if (endless === true) {
    highScore_endless(x);
    stopGame();
  } else if (timed ===  true) {
    document.getElementById("life1").classList.add("hidden");
    highScore_timed(x);
    stopGame();
  } else {
    alert("Game Over. You Lost.");
    stopGame();
  }
}

function winGame() {
  stopGame();
  alert("Game Over. YOU WON!");
}
// Sound Synthesis Functions
const freqMap = {
  1: 150,
  2: 250,
  3: 350,
  4: 450,
  5: 550,
  6: 650,
};

function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}

function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}

function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function generateNumber(min, max) {
  pattern.push(Math.floor(Math.random() * (max - min) + min));
}

function highScore_endless(x) {
  var y = -1;
  for (let i = 0; i <= 2; i++) {
    if (x > hiscore_nums_e[i]) {
      y = i;
      break;
    }
  }
  if (y >= 0) {
    var name = window.prompt("NEW HIGH SCORE!!! Enter your name: ");
    hiscore_names_e[y] = name;
    hiscore_nums_e[y] = x;
    if (y == 0) {
      document.getElementById("score_endless_one").innerHTML =
        "1. " + hiscore_names_e[y] + ": " + hiscore_nums_e[y];
    } else if (y == 1) {
      document.getElementById("score_endless_two").innerHTML =
        "2. " + hiscore_names_e[y] + ": " + hiscore_nums_e[y];
    } else if (y == 2) {
      document.getElementById("score_endless_three").innerHTML =
        "3. " + hiscore_names_e[y] + ": " + hiscore_nums_e[y];
    }
  }
}

function highScore_timed(x) {
  var y = -1;
  for (let i = 0; i <= 2; i++) {
    if (x > hiscore_nums_e[i]) {
      y = i;
      break;
    }
  }

  if (y >= 0) {
    var name = window.prompt("NEW HIGH SCORE!!! Enter your name: ");
    hiscore_names_t[y] = name;
    hiscore_nums_t[y] = x;
    if (y == 0) {
      document.getElementById("score_endless_one").innerHTML =
        "1. " + hiscore_names_t[y] + ": " + hiscore_nums_t[y];
    } else if (y == 1) {
      document.getElementById("score_endless_two").innerHTML =
        "2. " + hiscore_names_t[y] + ": " + hiscore_nums_t[y];
    } else if (y == 2) {
      document.getElementById("score_endless_three").innerHTML =
        "3. " + hiscore_names_t[y] + ": " + hiscore_nums_t[y];
    }
  }
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
