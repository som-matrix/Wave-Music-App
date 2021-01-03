import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay,faAngleLeft,faAngleRight,faPause} from '@fortawesome/free-solid-svg-icons';
const Player =({currentSong,isPlaying,setIsPlaying,audioRef,songInfo,setSongInfo,songs,setCurrentSong,setSongs})=>{
    
    const activeSkipHandler = (nextPrev)=>{
        const activeSong = songs.map((song)=>{
            if(song.id === nextPrev.id){
                return{
                    ...song,
                    active:true,
                }
            }
            else{
                return{
                    ...song,
                    active:false,
                }
            }
          }) 
        setSongs(activeSong); 
    }
    // Event Handlers
    const playSongHandler = async ()=>{
      if(isPlaying){
          await setIsPlaying(!isPlaying);
          audioRef.current.pause();
      } 
      else{
         await setIsPlaying(!isPlaying);
         audioRef.current.play();
      } 
    
     
    }
    
    
    const getTimeInput = (time)=>{
        return(

            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler = (e) =>{
      audioRef.current.currentTime = e.target.value;
      setSongInfo({...songInfo , currentTime:e.target.value})
    }
    const skipTrackHandler = async (direction) =>{
       
        let currentIndex = songs.findIndex((song)=> song.id === currentSong.id);
        if(direction === 'skipnext'){
          await  setCurrentSong(songs[(currentIndex+1) % songs.length]);
          activeSkipHandler(songs[(currentIndex+1) % songs.length]);
        }
        if(direction === 'skipprevious'){
            if((currentIndex -1) % songs.length   === -1){
               await setCurrentSong(songs[songs.length -1]);
               activeSkipHandler(songs[songs.length -1]);
                // As we are returning we want to invoke the function again
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1)% songs.length]);
            activeSkipHandler(songs[(currentIndex - 1)% songs.length]);
        }
        if(isPlaying) audioRef.current.play();
    }
    const trackAnimation ={
        transform : `translateX(${songInfo.animationPercentage}%)`
    }
    return(

        <div className="player">
            <div className="time-control">
                <p>{getTimeInput(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                 <input 
                 min={0} 
                 max={songInfo.duration || 0} 
                 value={songInfo.currentTime} 
                 onChange={dragHandler} 
                 type="range"
                 />
                 <div style={trackAnimation} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTimeInput(songInfo.duration): "0:00"}</p>
            </div>
            <div className="play-control">
              <FontAwesomeIcon 
                onClick={()=> skipTrackHandler('skipprevious')}
                className="previous" 
                size="2x" 
                icon={faAngleLeft}
               />
              <FontAwesomeIcon 
               onClick={playSongHandler} 
               className="play" 
               size="2x" 
               icon={isPlaying ? faPause: faPlay}
               />
              <FontAwesomeIcon 
               onClick={()=>skipTrackHandler('skipnext')}
               className="next" 
               size="2x" 
               icon={faAngleRight}
               />
            </div>
           
        </div>
    )
}

export default Player;