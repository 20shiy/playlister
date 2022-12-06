import { useContext, useState } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SortIcon from '@mui/icons-material/Sort';
import HomeScreen from './HomeScreen'
import RightComponent from './RightComponent';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';

const MainScreen = () => {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    function handleCreateNewList() {
    store.createNewList();
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const handleHouseClick = () => {
        store.closeCurrentList();
    }

    function handleSelectHome() {
        store.homeScreenSelected();

    }

    function handleSelectCommunity() {
        store.communityScreenSelected();

    }

    function handleSelectUser() {
        store.userScreenSelected();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    // let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        // if (store.currentList) {
        //     editToolbar = <EditToolbar />;
        // }
    }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <AccountCircle />;
    }

    let iconClass = "icons-disabled";
    let homeIconClass = store.homeScreen ? "icons" : iconClass;
    let communityIconClass = store.communityScreen ? "icons" : iconClass;
    let userIconClass = store.userScreen ? "icons" : iconClass;

    return (
        <div id="mainContainer">
            <div id="mainScreenBanner">
                <img id="mainScreenLogo" src="/playlisterLogo.png" />
                <IconButton 
                    className="icons"
                    fontSize="medium" 
                    aria-controls={menuId} 
                    aria-label="account of current user"
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen ? 'true' : undefined}
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    sx={{mt: 0.5, mr: 0.5}}>
                        { getAccountMenu(auth.loggedIn) }
                </IconButton>
            </div>

            <div id="iconsBanner">
                <div id="listControlIcons">
                    {/* <IconButton>
                        <HomeIcon fontSize="large"/>
                    </IconButton>
                    <IconButton>
                        <GroupsIcon  sx={{ml: 1}} fontSize="large"/>
                    </IconButton>
                    <IconButton>
                        <PersonIcon  sx={{ml: 1}} fontSize="large"/>
                    </IconButton> */}

                    <IconButton onClick={handleSelectHome}>
                        <HomeIcon className={homeIconClass} fontSize="large"/>
                    </IconButton>
                    <IconButton onClick={handleSelectCommunity}>
                        <GroupsIcon className={communityIconClass}  sx={{ml: 1}} fontSize="large"/>
                    </IconButton>
                    <IconButton onClick={handleSelectUser}>
                        <PersonIcon className={userIconClass}  sx={{ml: 1}} fontSize="large"/>
                    </IconButton>
                </div>
                
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', ml:-5, display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <InputBase
                        className="searchBar"
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                </Paper>
                <div id="sortSection">
                    <b>SORT BY</b>
                    <SortIcon className="icons" fontSize="large" sx={{ml: 1}}/>
                </div>
            </div>

            <div id="leftAndRightComponent">
                <HomeScreen />
                <RightComponent />
            </div>

            <div id="bottomToolBar">
                <Fab sx={{transform:"translate(-20%, 0%)"}}
                    className="icons"
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                Your Lists
            </div>

            {menu}
            {/* <MUIDeleteModal />
            { modalJSX } */}
            
        </div>
    )
}

export default MainScreen;