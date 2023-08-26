let playlist = [
    {
        title: "Uranium",
        artist: "Bic verde",
        src:'music/Uranium.wav',
        img: "img/Uraniummm.jpg",
        background: "img/Uraniummm.jpg"
    },
    {
        title: "",
        artist: "",
        src:'#',
        img: "#",
        background: ""
    },
    {
        title: "",
        artist: "",
        src:'',
        img: "",
        background: ""
    }
];

let music = document.getElementById("music-audio");
let indexMusic = 0;

let songDuration = document.getElementById("ending");
let musicCover = document.getElementById("music-cover");
let musicName = document.getElementById("music-name");
let artistName = document.getElementById("artist-name");
let backgroundCover = document.querySelector(".background");


renderMusic(indexMusic);

document.getElementById("start").addEventListener("click", playMusic);

document.getElementById("pause").addEventListener("click", pauseMusic);

music.addEventListener("timeupdate", updateBar);

document.getElementById("return").addEventListener("click", () => {
    indexMusic--;
    if (indexMusic < 0) {
        indexMusic = 2;
    }
    renderMusic(indexMusic);
});

document.getElementById("next").addEventListener("click", () => {
    indexMusic++;
    if (indexMusic > 2){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
});


function renderMusic(index) {
    music.setAttribute('src', playlist[index].src);
    music.addEventListener("loadeddata", () => {
        musicName.textContent = playlist[index].title;
        artistName.textContent = playlist[index].artist;
        musicCover.src = playlist[index].img;
        backgroundCover.style.backgroundImage = `url(${playlist[index].background})`;
        songDuration.textContent = secondsToMinutes(Math.floor(music.duration));
    });
}

function playMusic() {
    music.play();
    document.querySelector("#pause").style.display= "flex";
    document.querySelector("#start").style.display= "none";
    document.querySelector(".play-buttons").style.display= "flex";
}

function pauseMusic() {
    music.pause();
    document.querySelector("#pause").style.display= "none";
    document.querySelector("#start").style.display= "flex";
    document.querySelector(".play-buttons").style.display= "flex";
}

function updateBar() {
    let bar = document.getElementById("music-progress");
    bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + "%";
    let elapsedTime = document.getElementById("inception");
    elapsedTime.textContent = secondsToMinutes(Math.floor(music.currentTime));
}

function secondsToMinutes(seconds) {
    let minuteField = Math.floor(seconds / 60);
    let secondsField = seconds % 60;
    if (secondsField < 10) {
        secondsField = "0" + secondsField;
    }

    return minuteField+":"+ secondsField;
}