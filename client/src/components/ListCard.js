import { useContext, useState } from 'react'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Accordion,Typography, Card, CardHeader,Stack, Link} from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import {ThumbUpOutlined, ThumbDownOutlined, DeleteOutlined} from '@mui/icons-material'
import WorkspaceScreen from './WorkspaceScreen'
import Button from '@mui/material/Button'

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    // const [expanded, setExpanded] = useState(null);


    function handleLoadList(event, id) {
        if(event.detail == 2) {
            handleToggleEdit(event);
            return;
        }
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);
            // setExpanded(!expanded);
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    function handleDuplicateList(event, id) {
        event.stopPropagation();
        store.duplicateList(id);
        // setExpanded(!expanded);
    }

    function handlePublish(event, id) {
        store.handlePublish(id);
        // store.loadPublishedLists();
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let backgroundColor = "white";
    if(idNamePair.published) {
        backgroundColor = "#d5d3f4";
    }
    
    if(store.currentList && idNamePair._id == store.currentList._id) {
        console.log("current Playing?");
        backgroundColor = "#d3b242"
    }
    let cardElement =
        // <ListItem
        //     id={idNamePair._id}
        //     key={idNamePair._id}
        //     className="list-card"
        //     sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
        //     style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}
        //     button
        //     onClick={(event) => {
        //         handleLoadList(event, idNamePair._id)
        //     }}
        // >
        //     <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
        //     <Box sx={{ p: 1 }}>
        //         <IconButton onClick={handleToggleEdit} aria-label='edit'>
        //             <EditIcon style={{fontSize:'48pt'}} />
        //         </IconButton>
        //     </Box>
        //     <Box sx={{ p: 1 }}>
        //         <IconButton onClick={(event) => {
        //                 handleDeleteList(event, idNamePair._id)
        //             }} aria-label='delete'>
        //             <DeleteIcon style={{fontSize:'48pt'}} />
        //         </IconButton>
        //     </Box>
            
            <Accordion 
                className="list-card"
                style={{borderRadius: "25px", backgroundColor: `${backgroundColor}`, borderStyle: "solid", borderWidth: "1px"}}
                
                >
                <AccordionSummary
                    id={idNamePair._id}
                    key={idNamePair._id}
                    // className={cardClass}
                    sx={{borderRadius:"25px", p: "5px", marginTop: '5px', display: 'flex', p: 1 }}
                    style={{width: '98%', fontSize: '18pt' }}
                    
                    // button
                    onClick={(event) => {
                        handleLoadList(event, idNamePair._id)
                    }}
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                >   
                    <div id="listTitle">
                        <b>{idNamePair.name}</b>
                        <p style={{fontSize: '8pt'}}>By: &nbsp; <u style={{color: "blue"}}>{idNamePair.userName}</u></p>
                    </div>

                    {/* <Box sx={{ p: 1 }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <EditIcon style={{fontSize:'48pt'}} />
                        </IconButton>
                    </Box> */}
                    {/* <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                            <DeleteIcon style={{fontSize:'48pt'}} />
                        </IconButton>
                    </Box> */}
                </AccordionSummary>
                <AccordionDetails>
                    <WorkspaceScreen />
                    <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={0}>
                            <Button variant="contained"
                                disabled={!store.canUndo()}
                                id='undo-button'
                                onClick={handleUndo}>
                                    Undo
                            </Button>
                            <Button variant="contained"
                                disabled={!store.canRedo()}
                                id='redo-button'
                                onClick={handleRedo}>
                                    Redo
                            </Button>
                        </Stack>
                        <Stack direction="row" spacing={0}>
                            <Button variant="contained"
                                onClick={(event) => {handlePublish(event, idNamePair._id)}}>
                                    Publish
                            </Button>
                            <Button variant="contained" 
                                onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                Delete
                            </Button>
                            <Button variant="contained"
                                onClick={(event) => 
                                    {handleDuplicateList(event, idNamePair._id)}}>
                                Duplicate
                            </Button>
                        </Stack>
                    </Stack>
                </AccordionDetails>
            </Accordion>
            
        // </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;