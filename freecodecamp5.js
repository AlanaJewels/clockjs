let sessionTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let timer;
let isSession = true; // Keeps track of whether the timer is counting down a session or a break
let isRunning = false;

const breakLabel = document.getElementById('break-label');
const sessionLabel = document.getElementById('session-label');
const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const timerLabel = document.getElementById('timer-label');
const timeLeft = document.getElementById('time-left');
const beep = document.getElementById('beep');
const startStopButton = document.getElementById('start_stop');
const resetButton = document.getElementById('reset');

// Function to format time in mm:ss format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Update the display of time
function updateTimeDisplay() {
  timeLeft.textContent = formatTime(isSession ? sessionTime : breakTime);
}

// Start or stop the timer
function startStopTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startStopButton.textContent = 'Start';
  } else {
    timer = setInterval(() => {
      if (isSession) {
        sessionTime--;
        if (sessionTime <= 0) {
          isSession = false;
          sessionTime = 25 * 60; // Reset session time
          timerLabel.textContent = 'Break';
        }
      } else {
        breakTime--;
        if (breakTime <= 0) {
          isSession = true;
          breakTime = 5 * 60; // Reset break time
          timerLabel.textContent = 'Session';
        }
      }
      updateTimeDisplay();
    }, 1000);
    isRunning = true;
    startStopButton.textContent = 'Pause';
  }
}

// Reset the clock
function resetClock() {
  clearInterval(timer);
  isRunning = false;
  sessionTime = 25 * 60;
  breakTime = 5 * 60;
  isSession = true;
  timerLabel.textContent = 'Session';
  updateTimeDisplay();
  beep.pause();
  beep.currentTime = 0;
  startStopButton.textContent = 'Start';
}

// Adjust break time
function adjustBreakTime(increment) {
  breakTime = Math.max(1, Math.min(60, breakTime + increment)); // Prevent negative or more than 60
  breakLength.textContent = breakTime;
}

// Adjust session time
function adjustSessionTime(increment) {
  sessionTime = Math.max(1, Math.min(60, sessionTime + increment)); // Prevent negative or more than 60
  sessionLength.textContent = sessionTime;
  updateTimeDisplay();
}

// Event listeners for buttons
startStopButton.addEventListener('click', startStopTimer);
resetButton.addEventListener('click', resetClock);
document.getElementById('break-decrement').addEventListener('click', () => adjustBreakTime(-1));
document.getElementById('break-increment').addEventListener('click', () => adjustBreakTime(1));
document.getElementById('session-decrement').addEventListener('click', () => adjustSessionTime(-1));
document.getElementById('session-increment').addEventListener('click', () => adjustSessionTime(1));

// Initial setup
updateTimeDisplay();
