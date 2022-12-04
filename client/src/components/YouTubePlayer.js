import React from "react";
import ReactPlayer from 'react-player'

import { Box, Typography } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { IconButton } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';

/** YouTube Player */

export default function YouTubePlayer() {
    return (
        <Box id="youtube-player">
            <ReactPlayer width="100%" url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />

            <div>
                <h3 style={{textAlign:"center"}}>Now Playing</h3>
                <h3 style={{paddingLeft:10}}>Playlist: 
                    <br></br>
                    Song #
                    <br></br>
                    Title:
                    <br></br>
                    Artist:
                </h3>

                <Typography align="center">
                    <IconButton 
                        aria-label="prev"
                        id="prev-button"
                        // onClick={}
                        size="small"
                    >
                        <SkipPreviousRoundedIcon
                            fontSize="large"
                            style={{ fill: 'white' }} />
                    </IconButton>
                    <IconButton 
                        aria-label="stop"
                        id="stop-button"
                        // onClick={}
                        size="small"
                    >
                        <StopRoundedIcon
                            fontSize="large"
                            style={{ fill: 'white' }} />
                    </IconButton>
                    <IconButton 
                        aria-label="play"
                        id="play-button"
                        // onClick={}
                        size="small"
                    >
                        <PlayArrowRoundedIcon
                            fontSize="large"
                            style={{ fill: 'white' }} />
                    </IconButton>
                    <IconButton 
                        aria-label="next"
                        id="next-button"
                        // onClick={}
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