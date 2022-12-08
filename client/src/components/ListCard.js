import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SongCard from './SongCard.js'
import List from '@mui/material/List';
import { Button } from '@mui/material';
import {Grid} from '@mui/material';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@mui/icons-material/ThumbDownTwoTone';
import EditToolbar from './EditToolbar';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const { auth } = useContext(AuthContext);
    // const [ expanded, setExpanded ] = useState(false);

    

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    function handlePublish() {
        let date = new Date();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = months[date.getMonth()];
        let day = date.getDate();
        let year = 1900+date.getYear();
        let publishDate = month+" "+day+", "+year;
        store.publishPlaylist(idNamePair._id,publishDate);
    }

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleDuplicate() {
        store.duplicateCurrentList(idNamePair._id);
    }

    function handleCloseCurrentList(event) {
        console.log("CLOSING DA LIST");
        id="";
        store.closeCurrentList();
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let cardInfo = 
        <Grid 
            container 
            component="main" 
            spacing={2}
            onDoubleClick={handleToggleEdit}
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}>
            <Grid item xs={6}>
            <Box sx={{ p: 1, flexGrow: 1 }}>
                <h3>{idNamePair.name}</h3>
                <p>By: {auth.user.firstName} {auth.user.lastName}</p>
            </Box>
            </Grid>
        </Grid>
    
    let songList = "";
    if (store.currentList) {
    songList = 
        <List 
            id="song-list-cards" 
            sx={{ width: '100%' , maxHeight:'25%'}}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
        </List>;
    }

    let id="";
    if (store.currentList){
        id = store.currentList._id;
    }

    
    let cardElement =
        <div>
            <Accordion 
                style={{backgroundColor:'rgb(113, 102, 102)'}}
                expanded={id === idNamePair._id}

                // onChange={handleChange(idNamePair._id)}
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon 
                    onClick={(event) => {
                        id === idNamePair._id ? handleCloseCurrentList(event): handleLoadList(event, idNamePair._id)
                    }}
                    sx={{
                        pointerEvents: "auto"
                    }}
                    fontSize="large"/> }
                aria-controls="playlist-content"
                id="playlist-header"
                sx={{
                    pointerEvents: "none"
                  }}
                >
                    { cardInfo }
                </AccordionSummary>
                <AccordionDetails id="playlist-details">
                    { songList }
                    <ListItem style={{display:'flex', justifyContent:'center'}} >
                        <Box sx={{ p: 1 }}>
                            <Button
                                disabled={!store.canAddNewSong()}
                                id='add-song-button'
                                onClick={handleAddNewSong}
                                variant="contained">
                                <AddIcon /> Add Song
                            </Button>
                        </Box>
                    </ListItem>
                    <ListItem style={{display:'flex', justifyContent:'center'}}>
                        <Box sx={{ p: 0.5}}>
                            <Button 
                                disabled={!store.canUndo()}
                                id='undo-button'
                                onClick={handleUndo}
                                variant="contained">
                                    Undo
                            </Button>
                        </Box>
                        <Box sx={{ p: 0.5 }}>
                            <Button 
                                disabled={!store.canRedo()}
                                id='redo-button'
                                onClick={handleRedo}
                                variant="contained">
                                    Redo
                            </Button>
                        </Box>
                        <Box sx={{ p: 0.5 }} >
                            <Button 
                                variant="contained"
                                aria-label='publish'
                                onClick={handlePublish}> 
                                    Publish 
                            </Button>
                        </Box>
                        <Box sx={{ p: 0.5 }} >
                            <Button 
                                variant="contained"
                                onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} 
                                aria-label='delete'> 
                                    Delete 
                            </Button>
                        </Box>
                        <Box sx={{ p: 0.5 }}>
                            <Button 
                                variant="contained"
                                aria-label='duplicate'
                                onClick={handleDuplicate}> 
                                    Duplicate 
                            </Button>
                        </Box>
                    </ListItem>
                </AccordionDetails>
            </Accordion>
        </div>
        
    if(idNamePair.playlist.published) {
        console.log(store.publishDate)
        cardInfo = 
        <Grid 
            container 
            component="main" 
            spacing={2}
            onDoubleClick={handleToggleEdit}
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}>
            <Grid item xs={6}>
            {/* <ListItem> */}
            <Box sx={{ p: 1, flexGrow: 1 }}>
                <h3>{idNamePair.name}</h3>
                <p>By: {auth.user.firstName} {auth.user.lastName}</p>
                <p>Published: {idNamePair.playlist.publishDate}</p>
            </Box>
            </Grid>
            <Grid item xs={6} >
                <Box sx={{p:2}}>
                <IconButton aria-label='like-button'>
                    <ThumbUpTwoToneIcon style={{fontSize:'28pt'}} className="playlister-button"/>
                    &nbsp;{idNamePair.playlist.likes}
                </IconButton>
                <IconButton aria-label='dislike-button'>
                    <ThumbDownTwoToneIcon style={{fontSize:'28pt'}} className="playlister-button"/>
                    &nbsp;{idNamePair.playlist.dislikes}
                </IconButton>
                </Box>
                <Box
                display="flex"
                justifyContent="center"
                alignItems="center"><p>Listens:{idNamePair.playlist.listens}</p></Box>
            </Grid>
            
            {/* </ListItem> */}
        </Grid>

        
        cardElement =
        <div>
            <Accordion 
                style={{backgroundColor:'rgb(113, 102, 102)'}}
                expanded={id === idNamePair._id}
                // onChange={handleChange(idNamePair._id)}
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon 
                    sx={{
                        pointerEvents: "auto"
                    }}
                    onClick={(event) => {
                        id === idNamePair._id ? handleCloseCurrentList(event): handleLoadList(event, idNamePair._id)
                    }}
                    fontSize="large"/> }
                aria-controls="playlist-content"
                id="playlist-header"
                sx={{
                    pointerEvents: "none"
                  }}
                >
                    { cardInfo }
                </AccordionSummary>
                <AccordionDetails id="playlist-details">
                    { songList }
                    <ListItem style={{display:'flex', justifyContent:'flex-end'}}>
                        <Box sx={{ p: 0.5 }} >
                            <Button 
                                variant="contained"
                                onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} 
                                aria-label='delete'> 
                                    Delete 
                            </Button>
                        </Box>
                        <Box sx={{ p: 0.5 }}>
                            <Button 
                                variant="contained"
                                aria-label='duplicate'
                                onClick={handleDuplicate}> 
                                    Duplicate 
                            </Button>
                        </Box>
                    </ListItem>
                </AccordionDetails>
            </Accordion>
        </div>
    }

       

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 28}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;