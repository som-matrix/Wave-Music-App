import React from 'react';
const LibrarySong =({song,setCurrentSong,songs,id,audioRef,isPlaying,setSongs})=>{
    
    const songSelectHandler = async () =>{ 
      const selectedSong =songs.filter(state => state.id === id );
      await setCurrentSong(selectedSong[0]);
      //Set the active state of each song
      const activeSong = songs.map((song)=>{
        if(song.id === id){
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
      if(isPlaying) audioRef.current.play();
    }
    
    return(

        <div onClick={songSelectHandler} className= {`library-song ${song.active ? 'selected':""}`}>
            <img src={song.cover} alt={song.name}></img>
            <div className="song-description">

             <h2>{song.name}</h2>
             <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;