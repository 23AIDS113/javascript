import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'TVK Anthem',
    songArtist: 'Vijay',
    songSrc: './Assets/songs/Tamilaga-Vettri-Kazhagam-(Flag-Anthem)-MassTamilan.dev.mp3',
    songAvatar: './Assets/Images/image1.jpg'
  });

  // UseStates Variables
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0);

  const currentAudio = useRef();
  const backgroundVideo = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  };

  // Change Avatar Class
  let avatarClass = ['objectFitCover', 'objectFitContain', 'none'];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  // Play Audio Function
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const musicAPI = [
    {
      songName: 'TVK Anthem',
      songArtist: 'Vijay',
      songSrc: './Assets/songs/Tamilaga-Vettri-Kazhagam-(Flag-Anthem)-MassTamilan.dev.mp3',
      songAvatar: './Assets/Images/image1.jpg'
    },
    {
      songName: 'vaa kannamma',
      songArtist: 'Hesham Abdul Wahab.',
      songSrc: './Assets/songs/Vaa-Kannamma-MassTamilan.dev.mp3',
      songAvatar: './Assets/Images/image2.jpg'
    },
    {
      songName: 'melliname',
      songArtist: 'Mani Sharma.',
      songSrc: './Assets/songs/Mellinamae-Mellinamae.mp3',
      songAvatar: './Assets/Images/image3.jpg'
    },
    {
      songName: 'Azhagooril Poothavale',
      songArtist: 'Vidyasagar',
      songSrc: './Assets/songs/Azhagooril-Poothavale.mp3',
      songAvatar: './Assets/Images/image4.jpg'
    },
    {
      songName: 'yennai izhukkuthadi',
      songArtist: 'A R RAHMAN',
      songSrc: './Assets/songs/Yennai Izhukkuthadi.mp3',
      songAvatar: './Assets/Images/image5.jpg'
    },
    {
      songName: 'Paththavaikum',
      songArtist: 'Aniruth',
      songSrc: './Assets/songs/Paththavaikkum.mp3',
      songAvatar: './Assets/Images/image6.jpg'
    },
    {
      songName: 'Manasilaayo',
      songArtist: 'Aniruth',
      songSrc: './Assets/songs/Manasilaayo.mp3',
      songAvatar: './Assets/Images/image7.jpg'
    },
    {
      songName: 'sawadeeka',
      songArtist: 'Aniruth',
      songSrc: './Assets/songs/Sawadeeka-MassTamilan.dev.mp3',
      songAvatar: './Assets/Images/image8.jpg'
    }
  ];

  const vidArray = [
    './Assets/Videos/video1 .mp4',
    './Assets/Videos/video3 Ar vaa.mp4',
    './Assets/Videos/video mel.mp4',
    './Assets/Videos/video Ar azh.mp4',
    './Assets/Videos/video1 Ar yen.mp4',
    './Assets/Videos/video paththa.mp4',
    './Assets/Videos/video4 Ar man.mp4'
  ];

  const handleNextSong = () => {
    // Update music index and play next song
    let newMusicIndex = musicIndex >= musicAPI.length - 1 ? 0 : musicIndex + 1;
    setMusicIndex(newMusicIndex);
    updateCurrentMusicDetails(newMusicIndex);

    // Update background video
    let newVideoIndex = videoIndex >= vidArray.length - 1 ? 0 : videoIndex + 1;
    setVideoIndex(newVideoIndex);
    backgroundVideo.current.src = vidArray[newVideoIndex];
  };

  const handlePrevSong = () => {
    // Update music index and play previous song
    let newMusicIndex = musicIndex === 0 ? musicAPI.length - 1 : musicIndex - 1;
    setMusicIndex(newMusicIndex);
    updateCurrentMusicDetails(newMusicIndex);

    // Update background video
    let newVideoIndex = videoIndex === 0 ? vidArray.length - 1 : videoIndex - 1;
    setVideoIndex(newVideoIndex);
    backgroundVideo.current.src = vidArray[newVideoIndex];
  };

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar
    });
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    // Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    // Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  return (
    <>
      <div className="container">
        <audio
          src='./Assets/songs/Tamilaga-Vettri-Kazhagam-(Flag-Anthem)-MassTamilan.dev.mp3'
          ref={currentAudio}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}
        ></audio>
        <video
          src={vidArray[videoIndex]}
          loop
          muted
          autoPlay
          className='backgroundVideo'
          id="background-video"
          ref={backgroundVideo}
        ></video>
        <div className="blackScreen"></div>
        <div className="music-Container">
          <p className='musicPlayer'>Music Player</p>
          <p className='music-Head-Name'>{currentMusicDetails.songName}</p>
          <p className='music-Artist-Name'>{currentMusicDetails.songArtist}</p>
          <img
            src={currentMusicDetails.songAvatar}
            className={avatarClass[avatarClassIndex]}
            onClick={handleAvatar}
            alt="song Avatar"
            id='songAvatar'
          />
          <div className="musicTimerDiv">
            <p className='musicCurrentTime'>{musicCurrentTime}</p>
            <p className='musicTotalLenght'>{musicTotalLength}</p>
          </div>
          <input
            type="range"
            name="musicProgressBar"
            className='musicProgressBar'
            value={audioProgress}
            onChange={handleMusicProgressBar}
          />
          <div className="musicControlers">
            <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong}></i>
            <i className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
            <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;