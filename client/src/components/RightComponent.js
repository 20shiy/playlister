import Player from './Player.js';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const RightComponent = () => {
    return (
        <div id="rightComponent">
            <Stack spacing={0} style={{marginTop: "15px"}} direction="row">
                
                <Button variant="contained">Player</Button>
                <Button variant="contained">Comments</Button>
                
            </Stack>
            <Player />
        </div>
    )
}

export default RightComponent;