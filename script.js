const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const breakBtn = document.querySelector('#break');
const pomodoroBtn = document.querySelector('#pomodoro');
const pomodoroTime = document.querySelector('#pomodoro-time');

let timerId;
let mode = 'pomodoro';
let totalSeconds = convertTime(pomodoroTime.innerText);

pomodoroBtn.addEventListener('click', () => startPomodoro())
breakBtn.addEventListener('click', () => startBreak())
resetBtn.addEventListener('click', () => resetTime())

function startPomodoro() {
    pomodoroBtn.classList.add('active');
    breakBtn.classList.remove('active');
    mode = 'pomodoro';
    totalSeconds = convertTime('25:00');
    pomodoroTime.innerText = '25:00';
    stopTimer();
}

function startBreak() {
    breakBtn.classList.add('active');
    pomodoroBtn.classList.remove('active');
    mode = 'break';
    totalSeconds = convertTime('05:00');
    pomodoroTime.innerText = '05:00';
    stopTimer();
}

function convertTime(timeStr) {
    const timeParts = timeStr.split(':');
    const minutes = parseInt(timeParts[0]);
    const seconds = parseInt(timeParts[1]);
    return minutes * 60 + seconds;
}

startBtn.addEventListener('click', () =>
    (startBtn.innerText === 'start' ? startTimer() : stopTimer())
)

function startTimer() {
    timerId = setInterval(updateTimer, 10);
    startBtn.innerText = 'stop';
}

function stopTimer() {
    clearInterval(timerId);
    startBtn.innerText = 'start';
}

function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

    pomodoroTime.innerText = formattedTime;

    totalSeconds--;

    if (totalSeconds < 0) {
        resetTime();
    }
}

function resetTime() {
    clearInterval(timerId);
    startBtn.innerText = 'start';

    if (mode === 'pomodoro') {
        totalSeconds = convertTime('25:00');
        pomodoroTime.innerText = '25:00';
    }
    else {
        totalSeconds = convertTime('05:00');
        pomodoroTime.innerText = '05:00';
    }
}