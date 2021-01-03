import React from 'react';

const Song =({currentSong,rotateImg,setRotateImg})=>{

    return(

        <div className="song-container">
            <img className="song-img" src={currentSong.cover} alt={currentSong.name}></img>
            <h1>{currentSong.name}</h1>
            <h2>{currentSong.artist}</h2>
        </div>
    )
}

export default Song;