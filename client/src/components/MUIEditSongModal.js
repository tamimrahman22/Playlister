import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    //bgcolor: 'background.paper',
    //border: '2px solid #000',
    //boxShadow: 24,
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    // const [ title, setTitle ] = useState(store.currentSong.title);
    // const [ artist, setArtist ] = useState(store.currentSong.artist);
    // const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);
    let title = "";
    let artist = "";
    let youTubeId = "";
    if (store.currentSong !== null) {
        title = store.currentSong.title;
        artist = store.currentSong.artist;
        youTubeId = store.currentSong.youTubeId;
    }

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        // setTitle(event.target.value);
        title = event.target.value;
    }

    function handleUpdateArtist(event) {
        // setArtist(event.target.value);
        artist = event.target.value;
    }

    function handleUpdateYouTubeId(event) {
        // setYouTubeId(event.target.value);
        youTubeId = event.target.value;
    }

    return (
        <Modal
            open={store.currentModal === "EDIT_SONG"}
        >
            <Box sx={style}>
            <div
            id="edit-song-modal"
            className="modal-dialog is-visible"
            data-animation="slideInOutLeft">
            <div
                id='edit-song-root'
                className="modal-root">
                <div
                    id="edit-song-modal-header"
                    className="modal-north">Edit Song</div>
                <div
                    id="edit-song-modal-content"
                    className="modal-center-edit">
                    <div id="title-prompt" className="modal-prompt">Title:</div>
                    <input 
                        id="edit-song-modal-title-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={title} 
                        onChange={handleUpdateTitle} />
                    <div id="artist-prompt" className="modal-prompt">Artist:</div>
                    <input 
                        id="edit-song-modal-artist-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={artist} 
                        onChange={handleUpdateArtist} />
                    <div id="you-tube-id-prompt" className="modal-prompt">YouTube Id:</div>
                    <input 
                        id="edit-song-modal-youTubeId-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={youTubeId} 
                        onChange={handleUpdateYouTubeId} />
                </div>
                <div className="modal-south">
                    <Button 
                        id="edit-song-confirm-button" 
                        className="modal-button" 
                        onClick={handleConfirmEditSong} 
                        variant="contained"
                        sx={{ p: 1}}
                        color='success'>Confirm</Button>
                        &nbsp;
                    <Button 
                        id="edit-song-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancelEditSong} 
                        variant="contained"
                        sx={{ p: 1}}
                        color='error'>Cancel</Button>
                </div>
            </div>
        </div>
            </Box>
        </Modal>
    );
}