import { useContext } from 'react'
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

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong () {
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong () {
        store.hideModals();
    }
    
    let modalClass = "modal-dialog";
    // if (store.isRemoveSongModalOpen()) {
    //     modalClass += " is-visible";
    // }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
            open={store.currentModal === "REMOVE_SONG"}
        >
            <Box sx={style}>
            <div
        id="remove-song-modal"
        className={modalClass}
        data-animation="slideInOutLeft">
        <header className="modal-north">
        Remove {songTitle}?
                </header>
                <div className="modal-center">
                    Are you sure you wish to permanently remove {songTitle} from the playlist?
                </div>
                <div id="confirm-cancel-container">
                    <Button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleConfirmRemoveSong}
                        variant="contained"
                        sx={{ p: 1}}
                        color='success'
                    >Confirm</Button>
                    &nbsp;
                    <Button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCancelRemoveSong}
                        variant="contained"
                        sx={{ p: 1}}
                        color='error'
                    >Cancel</Button>
                </div>
    </div>
            </Box>
        </Modal>
    );
}