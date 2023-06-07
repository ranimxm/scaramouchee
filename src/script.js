navigator.mediaSession.metadata = new MediaMetadata();

var before = document.getElementById("before");
var bah = new Audio("/songs/scaaa.mp3");
var bleh = new Audio("/songs/tong.mp3");

function chibi(){
  document.getElementById('before').className = 'classname';

  if (before.getAttribute('src') == "/image/sss.webp")
  {
    bah.play();
    bleh.pause();
    bleh.currentTime=0;
    before.src = "/image/ssa.webp";  
    before.classList.add("classname");
 
  }
  else
  {
    bleh.play();
    bah.pause();
    bah.currentTime=0;
    before.src = "/image/sss.webp";
    before.classList.remove("classname");
    void before.offsetWidth;
    
  }
};
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingSong();
  setMediaMetadata();
});

function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `image/${allMusic[indexNumb - 1].src}.webp`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
  setMediaMetadata();
};

function setMediaMetadata() {
  if ('mediaSession' in navigator) {
    // console.log("it works!")
    navigator.mediaSession.metadata.title = allMusic[musicIndex - 1].name;
    navigator.mediaSession.metadata.artist = allMusic[musicIndex - 1].artist;
    navigator.mediaSession.metadata.artwork = [{ src: `image/${allMusic[musicIndex - 1].src}.png` }];
    // navigator.mediaSession.metadata.shortcutIcon = [  { src: 'image/logo2.png', sizes: '48x48' },  { src: 'image/logo1.png', sizes: '96x96' }];
    } else{
      console.log("it doesnt work");
    };
    navigator.mediaSession.setActionHandler('play', playMusic);
    navigator.mediaSession.setActionHandler('pause', pauseMusic);
    navigator.mediaSession.setActionHandler('previoustrack', prevMusic);
    navigator.mediaSession.setActionHandler('nexttrack', nextMusic);
};

// navigator.mediaSession.metadata.artwork = [  { src: 'image/logo2.png', sizes: '48x48' },  { src: 'image/logo1.png', sizes: '96x96' }];

//play music function
function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();  
};

//pause music function
function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
};

//prev music function
function prevMusic(){
  musicIndex--; 
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
  setMediaMetadata();
};

//next music function
function nextMusic(){
  musicIndex++; 
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
  setMediaMetadata();
};

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
  var isMusicPlay = wrapper.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

//prev music button event
prevBtn.addEventListener("click", ()=>{
  prevMusic();
});

//next music button event
nextBtn.addEventListener("click", ()=>{
  nextMusic();
});

// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; 
  const duration = e.target.duration; 
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
  musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ 
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ 
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});



let isDragging = false;
let progressAreaWidth = progressArea.offsetWidth;

progressBar.addEventListener("mousedown", (e) => {
  isDragging = true;
});

progressArea.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const clickedOffsetX = e.offsetX;
    const progressWidth = Math.min(clickedOffsetX, progressAreaWidth);
    const songDuration = mainAudio.duration;

    if (isFinite(songDuration)) {
      const currentTime = (progressWidth / progressAreaWidth) * songDuration;
      mainAudio.currentTime = currentTime;
    }
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    playMusic();
    playingSong();
  }
});

// Touch events for mobile devices
progressBar.addEventListener("touchstart", (e) => {
  isDragging = true;
});

progressArea.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const touch = e.touches[0];
    const clickedOffsetX = touch.clientX - progressArea.getBoundingClientRect().left;
    const progressWidth = Math.min(clickedOffsetX, progressAreaWidth);
    const songDuration = mainAudio.duration;

    if (isFinite(songDuration)) {
      const currentTime = (progressWidth / progressAreaWidth) * songDuration;
      mainAudio.currentTime = currentTime;
    }
  }
});

document.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
    playMusic();
    playingSong();
  }
});


// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e)=>{
  const progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); 
  playingSong();
});

//change loop, shuffle, repeat icon onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; 
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

//code for what to do after song ended
mainAudio.addEventListener("ended", ()=>{
  let getText = repeatBtn.innerText; 
  switch(getText){
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; 
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); 
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});

//show music list onclick of music icon
moreMusicBtn.addEventListener("click", ()=>{
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", ()=>{
  moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");
for (let i = 0; i < allMusic.length; i++) {
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); 

  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; 
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

//play particular song from the list onclick of li tag
function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

//particular li clicked function
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; 
  loadMusic(musicIndex);
  playMusic();
  playingSong();
};

