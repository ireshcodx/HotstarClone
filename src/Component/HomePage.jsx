import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar/Sidebar';
import ImageCarousel from './Carousel/ImageCarousel';
import MovieSection from './MovieSection/MovieSection';
import ContinueWatchingMovieSection from './WrapperComponents/WatchHistory/WatchHistory';
import styled from 'styled-components';

const StyledGridContainer = styled(Grid)`
  @media (max-width: 600px) {
    height: auto;
    padding-top: 60px;  /* Adjust the padding to prevent overlap with the sidebar icon */
  }
`;

function HomePage() {
    const categories = ['Latest Releases', 'Top Rated', 'TV Shows'];

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));


    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const userLoginStatus = localStorage.getItem('isUserLoggedIn');
        if (userLoginStatus === 'true') {
            const loggedInUser = localStorage.getItem('userData');
            const userJSON = JSON.parse(loggedInUser);
            setUserDetails(userJSON);
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, []);

    return (
        <Grid container className='Wrapper'>
            <Grid item xs={12} md={0.3} className='Sidebar'>
                <Sidebar />
            </Grid>
            <StyledGridContainer item xs={12} md={11.7} className='Main'>
                <ImageCarousel />
                <div className='Main' style={{
                    paddingLeft: isLargeScreen ? '1%' : '0px' 
                }}>
                    {isUserLoggedIn && (
                        <ContinueWatchingMovieSection username={userDetails.userName} />
                    )}
                </div>
                {categories.map((category, index) => (
                    <MovieSection key={index} category={category} />
                ))}
            </StyledGridContainer>
        </Grid>
    );
}

export default HomePage;
