const songs = [
    {
        name: "Home",
        src: "Vexento - Home.mp3",
    },
    {
        name: "Bài khác",
        src: "song2.mp3", // Bạn thêm bài khác ở đây
    },
    {
        name: "Bài khác nữa",
        src: "song3.mp3", // Và đây nữa
    }
];

let currentSongIndex = 0;

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const songTitle = document.getElementById('song-title');

// Load bài hát
function loadSong(index) {
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].name;
    audio.load();
}

// Play hoặc Pause
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    }
});

// Next bài hát
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = '⏸️';
});

// Previous bài hát
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = '⏸️';
});

// Cập nhật tiến trình
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    }
});

// Kéo tiến trình
progressBar.addEventListener('input', () => {
    if (audio.duration) {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    }
});

// Auto chuyển bài khi hết
audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Load bài đầu tiên lúc vào trang
loadSong(currentSongIndex);
