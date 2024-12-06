import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LoginModal from './LoginModal';
import Avatars from './Avatars';
import ContinueWatchingMovieSection from '../WrapperComponents/WatchHistory/WatchHistory';
import EditIcon from '@mui/icons-material/Edit';
import './LoginModal.css'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useMediaQuery, useTheme } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Fade from '@mui/material/Fade';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

function Login() {

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const navigate = useNavigate();

    const handleLogin = (status) => {
        setIsUserLoggedIn(status)
    }

    const handleLogout = () => {
        setIsUserLoggedIn(false)
        localStorage.clear();
    }
    console.log(userDetails.userName);
    useEffect(() => {
        const userLoginStatus = localStorage.getItem('isUserLoggedIn');
        if (userLoginStatus === 'true') {
            const loggedInUser = localStorage.getItem('userData')
            const userJSON = JSON.parse(loggedInUser);
            setUserDetails(userJSON);
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, [isUserLoggedIn]);

    return (
        <>
            {isUserLoggedIn ? (
                <div className='LogInWrapper'>
                    <Sidebar />
                    <Container maxWidth="xxl">
                        <Box sx={{
                            bgcolor: 'linear-gradient(351deg, rgba(12,33,44,1) 3%, rgba(38,54,84,1) 45%, rgba(15,16,20,1) 100%)',
                            padding: '50px',
                            marginLeft: { sm: '0px', md: '50px' }
                        }}>
                            <Grid container spacing={3} sx={{ paddingTop: 2, paddingBottom: 4 }}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        <span className='SubTagline'>Subscribe to enjoy Disney + Hotstar <ArrowForwardIosIcon sx={{ color: 'goldenrod' }} /></span>
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {userDetails.fullName}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} container justifyContent={isLargeScreen ? 'flex-end' : 'flex-start'} spacing={2}>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: 'rgb(8,78,211)',
                                                color: 'white',
                                                width: '200px',
                                                padding: '12px',
                                                fontWeight: 'bold',
                                                borderRadius: '4%'
                                            }}
                                            onClick={()=> navigate('/subscription')}
                                        >
                                            Subscribe
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: 'rgb(32,40,58)',
                                                color: 'white',
                                                width: '200px',
                                                padding: '12px',
                                                fontWeight: 'bold',
                                                borderRadius: '4%'
                                            }}>
                                            <HelpOutlineOutlinedIcon sx={{ marginRight: 1 }} /> Help & Support
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            onClick={handleLogout}
                                            variant="contained"
                                            sx={{
                                                backgroundColor: 'rgb(32,40,58)',
                                                color: 'white',
                                                width: '200px',
                                                padding: '12px',
                                                fontWeight: 'bold',
                                                borderRadius: '4%'
                                            }}>
                                            <LogoutOutlinedIcon sx={{ marginRight: 1 }} /> Log Out
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <hr />

                            <Grid container spacing={3} sx={{ paddingTop: 3 }}>
                                <Grid item xs={6} sm={6}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Profiles
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={6} container justifyContent="flex-end">
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        <EditIcon fontSize="small" sx={{ marginRight: 1 }} /> Edit
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} sx={{ marginTop: 3 }}>
                                <Grid item xs={12}>
                                    <Avatars userName={userDetails.userName} />
                                </Grid>
                            </Grid>
                            <div className='WachHistoryDiv'>
                                <ContinueWatchingMovieSection username={userDetails.userName} />
                            </div>
                        </Box>
                    </Container>
                </div>
            ) : (
                <Container maxWidth="xxl">
                    <Sidebar />
                    <Box sx={{ bgcolor: 'linear-gradient(351deg, rgba(12,33,44,1) 3%, rgba(38,54,84,1) 45%, rgba(15,16,20,1) 100%)' }}>

                        <Grid container justifyContent="flex-end" spacing={2} sx={{ paddingTop: 5, marginBottom: 5 }}>
                            <Grid item>
                                <Button variant="contained" sx={{ backgroundColor: 'rgb(32,40,58)', color: 'white', width: '200px', padding: '12px', fontWeight: 'bold' }}>
                                    <HelpOutlineOutlinedIcon sx={{ marginRight: 1 }} /> Help & Support
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="center">
                            <img
                                src="https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/feature/myspace/my_space_login_in.png"
                                alt="Login Illustration"
                                className='LoginImg'
                            />
                        </Grid>

                        <Grid container justifyContent="center" sx={{ marginTop: 5 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                Login to Disney + Hotstar
                            </Typography>
                        </Grid>

                        <Grid container justifyContent="center">
                            <Typography variant="body1" sx={{ color: 'rgb(143,152,178,0.7)', fontWeight: 'bold' }}>
                                Start watching from where you left off, personalize for kids and more
                            </Typography>
                        </Grid>

                        <Grid container justifyContent="center" sx={{ paddingTop: 2 }}>
                            <LoginModal handleLogin={handleLogin} />
                        </Grid>

                    </Box>
                </Container>
            )}
        </>
    )
}

export default Login;
