import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth';
import { useState } from 'react';
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import { Link } from 'react-router-dom'


import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Statusbar from './Statusbar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ReactPlayer from 'react-player'
import YouTubePlayer from './YouTubePlayer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const AllListsScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const { auth } = useContext(AuthContext);
    const isMenuOpen = Boolean(anchorEl);

    let homeDisable = true;
    if(auth.loggedIn) {
        homeDisable = false;
    }

    useEffect(() => {
        store.getPublishedLists();
    }, []);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const menu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Name (A - Z)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislikes (High - Low)</MenuItem>
        
        </Menu>
    );

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

    let homeButton = 
    <IconButton 
        aria-label="home"
        id="home-button"
        // onClick={}
        size="small"
    >
        <Link to='/'><HomeOutlinedIcon
            fontSize="large"
            style = {{fill:'black'}}/></Link>
    </IconButton>;
    if(homeDisable){
        homeButton = 
        <IconButton 
            aria-label="home"
            id="home-button"
            // onClick={}
            size="small"
            disabled={homeDisable}
        >
            <HomeOutlinedIcon fontSize="large"/>
        </IconButton>
    }
    return (
        <Box>
            <div id="list-selector-heading">
                { homeButton }
                <IconButton 
                    aria-label="user-lists"
                    id="user-lists-button"
                    // onClick={}
                    size="small"
                    color='primary'
                >
                    <GroupsOutlinedIcon
                        fontSize="large"/>
                </IconButton>
                <IconButton 
                    aria-label="all-lists"
                    id="all-lists-button"
                    // onClick={}
                    size="small"
                >
                    <PersonOutlineOutlinedIcon
                        fontSize="large"
                        style={{ fill: 'black' }} />
                </IconButton>

                <TextField 
                    fullWidth
                    id="search-bar" 
                    label="Search" 
                    variant="filled" 
                    style={{
                        marginTop:5,
                        marginLeft:50,
                        marginRight:75
                        }}
                />

                <IconButton 
                    aria-label="sort-lists"
                    id="sort-lists-button"
                    onClick={handleSortMenuOpen}
                    size="small"
                >
                    Sort By 
                    <SortIcon
                        fontSize="large"
                        style={{ fill: 'black' }} />
                </IconButton>
                
                </div>
                <Grid container component="main">
                    <Grid item xs={6}>
                        <List id="list-selector-list">
                            {
                                listCard
                            }
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <YouTubePlayer />
                    </Grid>
                </Grid>
                <Statusbar/>
                {menu}
            </Box>
)}

export default AllListsScreen;