import React, { useState } from 'react';
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavItem } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser , cilSearch, cilHome, cilTv, cilMovie, cilAmericanFootball, cilApplications } from '@coreui/icons';
import  './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';

const Sidebar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); 
    // console.log(isSmallScreen);
    const navigate = useNavigate();
    const toggleDrawer = (open) => {
        setOpenDrawer(open);
    };
    const sidebarContent = (
        <>
            <CSidebarHeader>
                <CSidebarBrand>
                    <img src='https://img.hotstar.com/image/upload/v1656431456/web-images/logo-d-plus.svg' alt="LOGO" />
                </CSidebarBrand>
            </CSidebarHeader>
            <div className='ButtonDIV'>
                <button className='subscribeButton'>
                    Subscribe
                </button>
            </div>
            <CSidebarNav className='navItems'>
                <CNavItem href='#' onClick={() => { navigate('/login') }} className='navItm'>
                    <CIcon customClassName="nav-icon" style={{color:'#fff'}} icon={cilUser } /> My Space
                </CNavItem>
                <CNavItem href='#'  onClick={() => { navigate('/search') }} className='navItm'>
                    <CIcon customClassName="nav-icon" style={{color:'#fff'}}  icon={cilSearch} /> Search
                </CNavItem>
                <CNavItem href='#' onClick={() => { navigate('/') }}  className='navItm' >
                    <CIcon  customClassName="nav-icon"  style={{color:'#fff'}} icon={cilHome} /> Home
                </CNavItem>
                <CNavItem href='#' onClick={() => { navigate('/TV') }} className='navItm'>
                    <CIcon customClassName="nav-icon" style={{color:'#fff'}} icon={cilTv}  /> TV
                </CNavItem>
                <CNavItem  href="#" className='navItm'>
                    <CIcon customClassName="nav-icon" style={{color:'#fff'}} icon={cilMovie} /> Movies
                </CNavItem>
                <CNavItem  href="#" className='navItm'>
                    <CIcon customClassName="nav-icon" style={{color:'#fff'}} icon={cilAmericanFootball}  /> Sports
                </CNavItem>
                <CNavItem  href="#" className='navItm'>
                    <CIcon customClassName="nav-icon" style={{color:'#fff'}} icon={cilApplications} /> Category
                </CNavItem>
            </CSidebarNav>
        </>
    );

    return (
        <div>
            {/* Only show Sidebar component on large screens */}
            {isSmallScreen ? (
                <Drawer
                    open={openDrawer}
                    onClose={() => toggleDrawer(false)}
                    variant="temporary"
                    anchor="left"
                    className='drawer'
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            padding: '20px',
                            boxSizing: 'border-box',
                            backgroundColor: 'black',  // Dark background for the Drawer
                            color: 'white',  // White text color for the Drawer
                            display: 'flex',
                            flexDirection: 'column', // Align content vertically
                        },
                    }}
                >
                    <div className='sidebarContent'>{sidebarContent}</div>
                </Drawer>
            ) : (
                <CSidebar className='sidebar' unfoldable colorScheme="dark" position='fixed'>
                    {sidebarContent}
                </CSidebar>
            )}

            {/* Showing menu icon to toggle drawer on small screens */}
            {isSmallScreen && (
                <IconButton
                    color="secondary"
                    onClick={() => toggleDrawer(true)}
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        zIndex: 1300, // To keep the icon on top of other elements
                    }}
                >
                    <MenuIcon sx={{ color: 'white' }} />  {/* Ensure the menu icon is white */}
                </IconButton>
            )}
        </div>
    );
};

export default Sidebar;