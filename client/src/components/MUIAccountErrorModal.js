import { useContext } from 'react'
import AuthContext from '../auth';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // bgcolor: 'transparent',
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 4,
};

export default function MUIAccountErrorModal() {
    const { auth } = useContext(AuthContext);
    let errorMessage = "";
    if (auth.errorMessage) {
        errorMessage = auth.errorMessage;
    }
    function handleCloseModal(event) {
        auth.hideModals();
    }

    return (
        <Modal
            open={auth.errorMessage !== null}
        >
            <Box sx={style}>
            <div className="modal-dialog">
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{errorMessage}</strong>
                </Alert>
                
                {/* <header className="dialog-header">
                    Error {errorMessage} ?
                </header> */}
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Close</button>
                </div>
            </div>
            </Box>
        </Modal>
    );
}