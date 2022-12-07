import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import List from '@mui/material/List';
import ListCard from './ListCard.js';
import AuthContext from '../auth'

const  Comments= () => {
    const {store} = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    store.history = useHistory();

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            // let content = event.target.value;
            store.addComment(event.target.value);
            document.getElementById("commentInput").value="";
        }
        
    }

    let commentCard = "";
    if(store.currentList) {
        commentCard = 
            <div >
                {
                    store.currentList.comments.map((comment) => (
                        <div className="cardClass">
                            <b>{comment.owner}</b>
                            <p>{comment.content}</p>
                        </div>
                    ))
                }
            </div>
    }
    return (
        <div>
            <div id="commentsComponent">
                {commentCard}
                
            </ div>
            <input onKeyPress={handleKeyPress} id="commentInput" className='modal-textfield' type="text" style={{position: "absolute", marginBottom:"-15px", marginLeft: "10px"}}/>
        </div>
        
    )
}

export default Comments;