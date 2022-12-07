import Button from '@mui/material/Button';
import { useContext } from 'react';
import AuthContext from '../auth'
import Link from '@mui/material/Link';

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);

    return (
        <div id="splashContainer">
            <div className="topBanner">
                <img src="/playlisterLogo.png" />
                <p>Developed by Shiying Lin</p>
            </div>
            <div id="splashMain">
                <h1>Welcome</h1>
                <h5>A platform that allows you to create and share Youtube music playlists.</h5>
                <Link href='/register/'><Button sx={{mt:3}} className="splashButton" variant="contained">Create Account</Button></Link>
                <Link href='/login/'><Button sx={{m:2}} className="splashButton" variant="contained">Login</Button></Link>
                <Link href='/guest/'><Button className="splashButton" variant="contained">Continue as guest</Button></Link>
            </div>
        </div>
    )
}