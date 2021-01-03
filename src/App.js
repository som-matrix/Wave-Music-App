import React,{useState,useRef} from 'react';
// Adding Styles
import './styles/app.scss';
// Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
// Adding Music Data
import Data from './data';
function App() {
  // States
  const [songs ,setSongs] = useState(Data()); // The array that holds all the state information
  const [currentSong,setCurrentSong] = useState(songs[0]); // Holds the first state or the default state when page loads
  const [isPlaying,setIsPlaying] = useState(false); // This is the state for the song it is playing or not
  const [songInfo,setSongInfo] = useState({
    currentTime:0,
    duration:0,
    animationPercentage : 0,
  })
  const [libraryStatus,setLibraryStatus] = useState(false);
  // RotateAnimation
  const [rotateImg,setRotateImg] = useState(false);
  // Refrence hook
  const audioRef = useRef(null) //null is default
  // EventHAndler
  const timeUpdateHandler= (e)=> {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // calculating percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round((roundedCurrent / roundedDuration)*100);
    setSongInfo({ ...songInfo, currentTime: current,  duration, animationPercentage });
  };
  const autoSkipHandler = async ()=>{
    let currentIndex = songs.findIndex((song)=> song.id === currentSong.id);
    await  setCurrentSong(songs[(currentIndex+1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  }
  
  return (
    <div className={`App ${libraryStatus ? 'library-active' :""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} rotateImg={rotateImg} setRotateImg={setRotateImg}/>
      <Player 
       isPlaying={isPlaying} 
       setIsPlaying={setIsPlaying} 
       currentSong={currentSong}
       audioRef = {audioRef}
       songInfo = {songInfo}
       setSongInfo ={setSongInfo}
       songs ={songs}
       setCurrentSong={setCurrentSong}
       setSongs ={setSongs}
      />
      <Library songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} libraryStatus={libraryStatus} />
      <audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={autoSkipHandler}>
      </audio>
    </div>
  );
}

export default App;
