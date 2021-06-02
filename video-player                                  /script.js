const player = document.querySelector('.player')
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const playerSpeed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreen = document.querySelector('.fullscreen');

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

//計算時間，並形成時間格式00:00

//https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
function timeFormatter(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  //console.log(minutes, seconds);
  return `${minutes}:${seconds}`;
}

//進度條的更新，寬度會隨播放 長度改變


function updateProgress() {
  // console.log('currentTime', video.currentTime, 'duration', video.duration);
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${timeFormatter(video.currentTime)}/`;
  duration.textContent = `${timeFormatter(video.duration)}`;


}
//進度條點擊跳轉的功能
function setProgress(e) {


  //點擊位置除以總長
  let offsetTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${offsetTime * 100}%`
  video.currentTime = offsetTime * video.duration;
  //因為timeupdate事件，會在每次時間變化而觸發

}


// Volume Controls --------------------------- //

//設置預設變數值
let lastVolume = 1
function changeVolume(e) {

  let offsetVolume = e.offsetX / volumeRange.offsetWidth;
  //設置音量進位條件
  if (offsetVolume < 0.1) {
    offsetVolume = 0;
  }
  if (offsetVolume > 0.9) {
    offsetVolume = 1;
  }
  volumeBar.style.width = `${offsetVolume * 100}%`;
  //將取得的值實際套用到video.volume
  video.volume = offsetVolume;
  //console.log(offsetVolume);

  //先清空css 的class資料
  volumeIcon.className = '';
  //在加入新的
  if (offsetVolume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (offsetVolume < 0.7 && offsetVolume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  }
  else if (offsetVolume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  //追蹤音量鍵最終的變化
  lastVolume = offsetVolume;
  //console.log(offsetVolume);

}

function muteVolume() {
  //先清空css 的class資料

  volumeIcon.className = '';
  if (video.volume > 0) {
    //console.log(video.volume)// 結果1
    volumeBar.style.width = 0;
    lastVolume = video.volume;
    video.volume = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    //從靜音變到有聲音

    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;

    if (lastVolume > 0.7) {
      volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (lastVolume < 0.7 && lastVolume > 0) {
      volumeIcon.classList.add('fas', 'fa-volume-down');
    };
    // volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
  }
}
// Change Playback Speed -------------------- //

function changeSpeed() {
  // console.log('video play backrate', video.playbackRate);
  // console.log('video speed', speed.value);
  video.playbackRate = speed.value;

}

// Fullscreen ------------------------------- //


/* View in fullscreen */
function openFullscreen(elem) {

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

//建立布林值，作為啟動與否的開關
let fullscreenBtn = false;

function setFullscreen() {
  if (!fullscreenBtn) {
    openFullscreen(player);
  } else {

    closeFullscreen();

  }

  fullscreenBtn = !fullscreenBtn;
  console.log('last', fullscreenBtn);
}




playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', muteVolume);
speed.addEventListener('change', changeSpeed);
fullscreen.addEventListener('click', setFullscreen)
