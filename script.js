const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');
const player = document.querySelector('.player');


// Play & Pause ----------------------------------- //
function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title','Play');
}

function togglePlay(){
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title','Pause');
    }else{
        video.pause();
        showPlayIcon();
    }
}

video.addEventListener('ended',showPlayIcon);


// Progress Bar ---------------------------------- //
function displayTime(time) {
    const minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);
    seconds = seconds>9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

//update progress bar as video play

function updateProgress(){
    progressBar.style.width=`${(video.currentTime / video.duration)*100}%`;
    currentTime.textContent=`${displayTime(video.currentTime)}/`;
    duration.textContent=`${displayTime(video.duration)}`;
}

// set progress bar

function setProgress(event){
    const newTime = event.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime*100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

//volume bar

function changeVolume(e)
{
    let volume = e.offsetX / volumeRange.offsetWidth;
    //rounding volume
    if(volume<0.1)
    {
        volume=0;
    }
    if(volume >0.9)
    {
        volume=1;
    }
    volumeBar.style.width=`${volume*100}%`;
    video.volume=volume;
    //change volume icon depending on volume
    volumeIcon.className='';
    if(volume>0.7)
    {
        volumeIcon.classList.add('fas', 'fa-volume-up');

    }
    else if(volume<0.7 && volume >0){
        volumeIcon.classList.add('fas', 'fa-volume-down');
    }
    else if(volume === 0){
        volumeIcon.classList.add('fas','fa-volume-off');
    }
lastVolume= volume;
}

//Mute and unmute

function toggleMute() {
    volumeIcon.className='';
    if(video.volume){
        lastVolume = video.volume;
        video.volume= 0;
        volumeBar.style.width=0;
        volumeIcon.classList.add('fas','fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    }else{
        video.volume=lastVolume;
        volumeBar.style.width=`${lastVolume*100}%`;
        volumeIcon.classList.add('fas','fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //

function openFullscreen(elem) {
    if(Element.requestFullscreen){
        Element.requestFullscreen();
    }else if( elem.mozRequestFullscreen){
        elem.mozRequestFullscreen();
    }else if(elem.webkitRequestFullscreen){
        elem.webkitRequestFullscreen();
    }else if(elem.msRequestFullscreen){
        elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}

function closeFullscreen(){
    if(document.exitFullscreen){
        document.exitFullscreen();
    }else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    }
    else if(document.webkitExitFullscreen){
        documet.webkitExitFullscreen();
    }else if(document.msExitFullscreen)
    {
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}

//toggle full screen

let fullscreen= false;

function toggleFullscreen() {
    if(!fullscreen){
        openFullscreen(player);
    }else{
        closeFullscreen();
    }
    fullscreen=!fullscreen;
}


//event listener
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay',updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change',changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);