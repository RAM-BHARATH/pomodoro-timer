"use strict";
let minutes = document.getElementById('minutes');
console.log("Minutes: "+minutes.innerHTML);
let seconds = document.getElementById('seconds');
console.log("Seconds: "+seconds.innerHTML);
//Testing purpose:
// minutes.innerText = 5;
//Make 'Start' as 'Reset' after clicking start and vice-versa
//Make 'Pause' as 'Resume' after clicking 'Pause' and vice-versa
const startButton = document.getElementById('start-button');
console.log(startButton.innerText);
const pauseButton = document.getElementById('pause-button');
console.log(pauseButton);
const shortBreakButton = document.getElementById('short-break');
console.log(shortBreakButton);
const longBreakButton = document.getElementById('long-break');
console.log(longBreakButton);
const resultBox = document.getElementById('result-box')
console.log(resultBox);

//Setting up work time in seconds
const initialWorkTimeSeconds = 1500;
const initialWorkTimeMinutes = initialWorkTimeSeconds/60;

//Setting up short break time in seconds
const initialShortBreakTimeSeconds = 300;
const initialShortBreakTimeMinutes = initialWorkTimeSeconds/60;

//Setting up long break time in seconds
const initialLongBreakTimeSeconds = 600;
const initialLongBreakTimeMinutes = initialLongBreakTimeSeconds/60;

//Setting up mode ('work','shortBreak','longBreak','breakAvailable')
let mode = 'work';

//work time seconds and minutes
let workTimeSeconds = initialWorkTimeSeconds;
console.log("Work time seconds: "+workTimeSeconds);
let workTimeMinutes = initialWorkTimeMinutes;//workTimeSeconds/60;
console.log("Work time minutes: "+workTimeMinutes);

//short break time 
let shortBreakTimeSeconds = initialShortBreakTimeSeconds;
let shortBreakTimeMinutes = initialShortBreakTimeMinutes;

//long break time
let longBreakTimeSeconds = initialLongBreakTimeSeconds;
let longBreakTimeMinutes = initialLongBreakTimeMinutes;

let workTimeChangerFunc;
let shortBreakTimeChangerFunc;
let longBreakTimeChangerFunc;

//functions
startButton.addEventListener('click',function(){
    console.log("Seconds working: "+workTimeSeconds);
    if(startButton.innerText=='Start'){
        workTimeChangerFunc=setInterval(workTimeChanger,1000);
    }else if(startButton.innerText=='Restart'){
        clearInterval(workTimeChangerFunc);
        resetWorkTime();
        updateMinutesAndSeconds();
        // pauseButtonNameChanger();
        pauseButton.innerText='Pause';
        // updateButtons();
    }
  startButtonNameChanger();  
});

pauseButton.addEventListener('click',function(){
    if(mode=='work'){
        if(startButton.innerText=='Restart'){
            if(pauseButton.innerText=='Pause' && workTimeSeconds>0){
                clearInterval(workTimeChangerFunc);
            }else if(pauseButton.innerText=='Resume' && workTimeSeconds>0){
                // if(startButton.innerText=='Start'){
                //     startButtonNameChanger();
                // }
                workTimeChangerFunc=setInterval(workTimeChanger,1000);
            }
            pauseButtonNameChanger();
        }
    }else if(mode=='shortBreak'){
        //Short Break pausing
        if(pauseButton.innerText=='Pause' && shortBreakTimeSeconds>0){
            clearInterval(shortBreakTimeChangerFunc);
        }else if(pauseButton.innerText=='Resume' && shortBreakTimeSeconds>0){
            // if(startButton.innerText=='Start'){
            //     startButtonNameChanger();
            // }
            shortBreakTimeChangerFunc=setInterval(shortBreakTimeChanger,1000);
        }
        pauseButtonNameChanger();
    }else if(mode == 'longBreak'){
        //Long Break pausing
        if(pauseButton.innerText=='Pause' && longBreakTimeSeconds>0){
            clearInterval(longBreakTimeChangerFunc);
        }else if(pauseButton.innerText=='Resume' && longBreakTimeSeconds>0){
            // if(startButton.innerText=='Start'){
            //     startButtonNameChanger();
            // }
            longBreakTimeChangerFunc=setInterval(longBreakTimeChanger,1000);
        }
        pauseButtonNameChanger();
    }
});

shortBreakButton.addEventListener('click',function(){
    if(mode=='breakAvailable'){
        mode='shortBreak';
        shortBreakTimeChangerFunc = setInterval(shortBreakTimeChanger,1000);
    }
});

longBreakButton.addEventListener('click',function(){
    if(mode=='breakAvailable'){
        mode='longBreak';
        longBreakTimeChangerFunc = setInterval(longBreakTimeChanger,1000);
    }
});

function startButtonNameChanger(){
    if(startButton.innerText=='Start'){
        startButton.innerText = 'Restart';
    }else{
        startButton.innerText = 'Start';
    }
    console.log(startButton.innerText);
}

function pauseButtonNameChanger(){
    if(pauseButton.innerText=='Pause'){
        pauseButton.innerText = 'Resume';
    }else{
        pauseButton.innerText = 'Pause';
    }
    console.log(pauseButton.innerText);
}

function workTimeChanger(){
    if(workTimeSeconds==0){
        clearInterval(workTimeChangerFunc);
        resultBox.classList.add('border') ;
        resultBox.classList.add('border-primary');
        resultBox.innerText = 'Take a break.Click \'Short break\' or \'Long break\'';
        mode = 'breakAvailable';
        resetShortBreakTime();
        resetLongBreakTime();
        playAudio();
        return;
    }
    workTimeSeconds-=1;
    workTimeMinutes = Math.floor(workTimeSeconds/60);
    updateMinutesAndSeconds();
    console.log("Work time seconds: "+workTimeSeconds);
    console.log("Work time minutes: "+workTimeMinutes);
}

function updateMinutesAndSeconds(){
    if(mode=='work'){
        minutes.innerText = workTimeMinutes;
        seconds.innerText = workTimeSeconds%60;
    }else if(mode=='shortBreak'){
        minutes.innerText = shortBreakTimeMinutes;
        seconds.innerText = shortBreakTimeSeconds%60;
    }else if(mode=='longBreak'){
        minutes.innerText = longBreakTimeMinutes;
        seconds.innerText = longBreakTimeSeconds%60;
    }
}

// function updateButtons(){
//     pauseButton.innerText='Pause';
// }
function shortBreakTimeChanger(){
    if(shortBreakTimeSeconds==0){
        clearInterval(shortBreakTimeChangerFunc);
        resultBox.classList.add('border') ;
        resultBox.classList.add('border-primary');
        resultBox.innerText = 'Come on. Back to business!!\nClick Restart to continue';
        mode = 'work';
        resetWorkTime();
        updateMinutesAndSeconds();
        playAudio();
        return;
    }
    mode = 'shortBreak';
    shortBreakTimeSeconds -= 1;
    shortBreakTimeMinutes = Math.floor(shortBreakTimeSeconds/60);
    updateMinutesAndSeconds();
}

function longBreakTimeChanger(){
    if(longBreakTimeSeconds == 0){
        clearInterval(longBreakTimeChangerFunc);
        resultBox.classList.add('border') ;
        resultBox.classList.add('border-primary');
        resultBox.innerText = 'Come on. Back to business!!\nClick Restart to continue';
        mode = 'work';
        resetWorkTime();
        updateMinutesAndSeconds();
        playAudio();
        return;
    }
    mode = 'longBreak';
    longBreakTimeSeconds -= 1;
    longBreakTimeMinutes = Math.floor(longBreakTimeSeconds/60);
    updateMinutesAndSeconds();
}

function resetWorkTime(){
    workTimeSeconds = initialWorkTimeSeconds;
    workTimeMinutes = initialWorkTimeMinutes;
    // startButton.innerText = 'Start';
    pauseButton.innerText = 'Pause';
}

function resetShortBreakTime(){
    shortBreakTimeSeconds = initialShortBreakTimeSeconds;
    shortBreakTimeMinutes = initialShortBreakTimeMinutes;
    startButton.innerText = 'Start';
    pauseButton.innerText = 'Pause';
}

function resetLongBreakTime(){
    longBreakTimeSeconds = initialLongBreakTimeSeconds;
    longBreakTimeMinutes = initialLongBreakTimeMinutes;
    startButton.innerText = 'Start';
    pauseButton.innerText = 'Pause';
}

function playAudio(){
    let audio = new Audio('sounds/ride.wav');
    audio.play();
}