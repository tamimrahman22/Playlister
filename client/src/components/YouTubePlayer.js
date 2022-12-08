import React from "react";
import ReactPlayer from 'react-player'
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import { Box, Typography } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { IconButton } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';

/** YouTube Player */

export default function YouTubePlayer() {
    const { store } = useContext(GlobalStoreContext);
    const [ songNum, setSongNum ] = useState(0); 
    const [ playVid, setPlayVid ] = useState(false);
    
    let playlist = null;
    let title = null;
    let artist = null;
    let url = [];
    if(store.currentList) {
        if(store.currentList.songs[songNum]) {
            playlist = store.currentList;
            title = store.currentList.songs[songNum].title;
            artist = store.currentList.songs[songNum].artist;
            store.currentList.songs.map((song)=>url.push('https://www.youtube.com/watch?v='+song.youTubeId));
        }
    }

    console.log("{youtube-player}");
    console.log("{playlist}",playlist);
    console.log("{songNum}",songNum);
    console.log("{title}",title);
    console.log("{artist}",artist);
    console.log("{url}",url);

    function updateInfo() {
        setSongNum((songNum+1) % store.currentList.songs.length);
    }

    function next() {
        setSongNum((songNum+1) % store.currentList.songs.length);
    }

    function prev() {
        if(songNum!=0){
            setSongNum((songNum-1) % store.currentList.songs.length);
        }
    }
    return (
        <Box id="youtube-player">
            <ReactPlayer 
                width="100%" 
                controls={true}
                url={url[songNum]}
                playing={playVid}
                // onStart={()=>setPlayVid(true)}
                onEnded = {()=>updateInfo()}
                />

            <div>
                <h3 style={{textAlign:"center"}}>Now Playing</h3>
                <h3 style={{paddingLeft:10}}>Playlist: {playlist?playlist.name:""}
                    <br></br>
                    Song # {playlist?songNum+1:""}
                    <br></br>
                    Title: {playlist?playlist.songs[songNum].title:""}
                    <br></br>
                    Artist: {playlist?playlist.songs[songNum].artist:""}
                </h3>

                <Typography align="center">
                    <IconButton 
                        aria-label="prev"
                        id="prev-button"
                        onClick={()=>prev()}
                        size="small"
                    >
                        <SkipPreviousRoundedIcon
                            fontSize="large"
                            style={{ fill: 'white' }} />
                    </IconButton>
                    <IconButton 
                        aria-label="stop"
                        id="stop-button"
                        onClick={()=>setPlayVid(false)}
                        size="small"
                    >
                        <StopRoundedIcon
                            fontSize="large"
                            style={{ fill: 'white' }} />
                    </IconButton>
                    <IconButton 
                        aria-label="play"
                        id="play-button"
                        onClick={()=>setPlayVid(true)}
                        size="small"
                    >
                        <PlayArrowRoundedIcon
                            fontSize="large"
                            style={{ fill: 'white' }} />
                    </IconButton>
                    <IconButton 
                        aria-label="next"
                        id="next-button"
                        onClick={()=>next()}
                        size="small"
                    >
                        <SkipNextRoundedIcon
                            fontSize="large"
                            style={{ fill: 'white' }} />
                    </IconButton>

                </Typography>
            </div>

        </Box>
    )
}