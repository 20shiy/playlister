import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const CommunityScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    // function handleCreateNewList() {
    //     store.createNewList();
    // }
    let listCard = "";
    // if (store && store.homeScreen) {
    //     listCard = 
    //         <List sx={{width: '60%' }}>
    //         {
    //             store.idNamePairs.map((pair) => (
    //                 <ListCard
    //                     key={pair._id}
    //                     idNamePair={pair}
    //                     selected={false}
    //                 />
    //             ))
                
    //         }
            
    //         </List>;
    if(store && store.communityScreen) {
        listCard = 
            <List sx={{width: '60%' }}>
            {
                store.listsSearch.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
                
            }
            
            </List>;
    } else if(store && store.userScreen) {
        
        listCard = 
            <List sx={{width: '60%' }}>
            {
                store.listSearchByUser.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
                
            }
            
            </List>;
    }
    return (
        // <div id="playlist-selector">
        <div id="listCardsComponent">
            {/* <div id="list-selector-heading">
            <Fab sx={{transform:"translate(-20%, 0%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                // onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                Your Playlists
            </div> */}
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
        </div>)
}

export default CommunityScreen;