
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector(' volume-range');
const volumeBar = document.querySelector(' volume-bar');
const playerSpeed = document.querySelector('.player-speed');

// Play & Pause ----------------------------------- //
function togglePlay() {
  if (video.paused) {
    // 如果是暫停的，我們希望透過點擊使他play
    video.play();
  } else {
    video.pause();
  }
}


// Progress Bar ---------------------------------- //



// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


playBtn.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);
