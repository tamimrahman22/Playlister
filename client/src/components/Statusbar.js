import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleCreateNewList() {
        store.createNewList();
    }

    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    return (
        <div id="playlister-statusbar">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                size="medium"
            >
                <AddIcon />
            </Fab>
            <Typography 
                variant="h3" 
                color="white"
                fontFamily="Arial"
            >
                Your Lists
            </Typography>
            {/* <Typography variant="h4">{text}</Typography> */}
        </div>
    );
}

export default Statusbar;