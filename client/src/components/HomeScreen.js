import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

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

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
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
    return (
        <Box>
            <div id="list-selector-heading">
                <IconButton 
                    aria-label="home"
                    id="home-button"
                    // onClick={}
                    size="small"
                >
                    <HomeOutlinedIcon
                        fontSize="large"
                        style={{ fill: 'black' }} />
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
                <IconButton 
                    aria-label="user-lists"
                    id="user-lists-button"
                    // onClick={}
                    size="small"
                >
                    <GroupsOutlinedIcon
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
                        }}/>

                <IconButton 
                    aria-label="sort-lists"
                    id="sort-lists-button"
                    // onClick={}
                    size="small"
                >
                    Sort By
                    <SortIcon
                        fontSize="large"
                        style={{ fill: 'black' }} />
                </IconButton>
                
            </div>
            <List id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </List>
            <Statusbar/>
        </Box>)
}

export default HomeScreen;