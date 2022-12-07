import { Button } from "@mui/material"
import { Link } from 'react-router-dom'

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            Playlister
            <div id="splash-text">
                <h3>Welcome to Playlister!</h3>
                <p>An application where you can create playlists and play songs of your favorite YouTube Music Videos!</p>
                <Link to='/login/'><Button variant="contained" id="splash-screen-buttons">Login</Button></Link>
                <Button variant="contained" id="splash-screen-buttons">Continue as Guest</Button>
                <Link to='/register/'><Button variant="contained" id="splash-screen-buttons">Sign Up</Button></Link>
            </div>
            <div id="create">
                Created by Tamim Rahman
            </div>
        </div>
    )
}