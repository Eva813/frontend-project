
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector(' volume-range');
const volumeBar = document.querySelector(' volume-bar');
const playerSpeed = document.querySelector('.player-speed');

// Play & Pause ----------------------------------- //

function playIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused) {
    // 如果是暫停的，我們希望透過點擊使他play
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    //改變title
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    playIcon();
  }
}

//當影片播到結束時，要顯示繼續播放的圖示
playBtn.addEventListener("ended", playIcon);
// Progress Bar ---------------------------------- //

function updateProgress() {
  console.log('currentTime', video.currentTime, 'duration', video.duration);
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
}

// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress)
