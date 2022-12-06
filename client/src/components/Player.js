import React from 'react';
import YouTube from 'react-youtube';
import { useContext, useState, useRef } from 'react'
import { GlobalStoreContext } from '../store'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

export default function YouTubePlayerExample() {
    const {store} = useContext(GlobalStoreContext);
    const playerRef = useRef(null);

    let songs = [];
    let control = "";
    console.log(store.currentList);
    if(store.currentList) {
        songs = store.currentList.songs;
        console.log(songs);
    }

    let currentSong = store.currentSongPlaying;
    // console.log("current song: " + currentSong);

    if(store.currentList) {
        if(store.currentList.songs) {
            let song = store.currentList.songs[currentSong];
            if(song) {
                let playlistTitle = "Playlist: " + store.currentList.name;
                let songNumber = "Song #: " + (currentSong + 1);
                let songTitle = "Title: " + song.title;
                let artist = "Artist: " + song.artist;

                control = 
                    <div id="contentsPlaying">
                        <b>{playlistTitle}</b>
                        <b>{songNumber}</b>
                        <b>{songTitle}</b>
                        <b>{artist}</b>
                    </div>
            }
            
        }
        
    }
   
    let songIdArray = [];
    for(let i=0; i<songs.length; i++) {
        let song = songs[i];
        songIdArray.push(song.youTubeId);
    }

    let playlist = songIdArray;

    

    const playerOptions = {
        height: '300',
        width: '500',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        if(store.currentList) {
            let song = playlist[currentSong];
            player.loadVideoById(song);
            player.playVideo();
        }
        
    }

    let player;
    function onPlayerReady(event) {
        console.log("on player ready")
        player = event.target;
        loadAndPlayCurrentSong(player);
        // store.loadCurrentPlayer(event.target);
        event.target.playVideo();
    }

    

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            store.incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    function handleSkipNext() {
        store.incSong();
        loadAndPlayCurrentSong(player);
    }

    function handleSkipPrevious() {
        store.decSong();
        loadAndPlayCurrentSong(player);
    }

    let youtubeScreen = "";
    if(playlist[currentSong]) {
        youtubeScreen = 
            <YouTube
                    videoId={playlist[currentSong]}
                    opts={playerOptions}
                    onReady={onPlayerReady}
                    ref={playerRef}
                    onStateChange={onPlayerStateChange} />
    }

    return (
        <div id="playerAndControl">
            <div id="youtubeScreen">
                 {youtubeScreen}
            </div>
            
            <div id="youtubePlayerControls">
                <b 
                    style={{display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "center", 
                        marginTop: "10px"}}>Now Playing</b>
                {control}
                <div id="playerControlBar">
                    <div>
                        <SkipPreviousIcon onClick={handleSkipPrevious}/>
                        <StopIcon onClick={() => playerRef.current.getInternalPlayer().pauseVideo()}/>
                        <PlayArrowIcon onClick={() => playerRef.current.getInternalPlayer().playVideo()}/>
                        <SkipNextIcon onClick={handleSkipNext}/> 
                    </div>
                </div>
            </div>
        </div>
    )
}