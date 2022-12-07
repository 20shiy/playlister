import Player from './Player.js';
import Comments from './Comments.js';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { GlobalStoreContext } from '../store'
import { useContext, useState } from 'react'

const RightComponent = () => {
    const { store } = useContext(GlobalStoreContext);

    function handleSelectComment() {
        store.commentSectionSelected();
    }
    
    function handleSelectPlayer() {
        store.playerSectionSelected();
    }
    
    return (
        <div id="rightComponent">
            <Stack spacing={0} style={{marginTop: "15px"}} direction="row">
                
                <Button variant="contained" onClick={handleSelectPlayer}>Player</Button>
                <Button variant="contained" onClick={handleSelectComment}>Comments</Button>
                
            </Stack>
            {store.playerSection ? <Player /> : <Comments />}
        </div>
    )
}

export default RightComponent;