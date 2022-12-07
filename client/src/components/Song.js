import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function Song(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;

    let songText = "";
    if(song) {
        songText = (index + 1) + ". " + song.title + " by " + song.artist;
    }

    return (
        <ListItem>
            <ListItemText style={{color: '#d3b242'}} primary={`${songText}`} />
        </ListItem>
    )
}

export default Song;