import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import AddIcon from '@mui/icons-material/Add';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    function handleAddNewSong() {
        store.addNewSong();
    }
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let songs = "";
    if(store.currentList) {
        songs = 
        <List 
            id="playlist-cards" 
            sx={{overflow: 'scroll', height: '200px', width: '60%', bgcolor: '#8000F00F'}}
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
            <div className="list-card unselected-list-card" style={{width:"90%"}} onClick={handleAddNewSong}>
                <AddIcon style={{marginLeft: "50%"}}/>
            </div>
        </List>
    } else {
        songs = 
            <div className="list-card unselected-list-card" style={{width:"90%"}} onClick={handleAddNewSong}>
                <AddIcon style={{marginLeft: "50%"}}/>
            </div>
    }
    return (
        <div id="songListsComponent">
        {/* <List 
            id="playlist-cards" 
            sx={{overflow: 'scroll', height: '200px', width: '60%', bgcolor: '#8000F00F'}}
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
            <div className="list-card unselected-list-card" onClick={handleAddNewSong}>
                <AddIcon style={{marginLeft: "50%"}}/>
            </div>
         </List>             */}
         {songs}
         
         { modalJSX }
         </div>
    )
}

export default WorkspaceScreen;