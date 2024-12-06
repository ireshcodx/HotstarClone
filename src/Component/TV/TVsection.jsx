import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, Stack } from '@mui/material';
import getData from '../WrapperComponents/Axios';
import Movie from '../WrapperComponents/MovieSection/Movie';
import Sidebar from '../Sidebar/Sidebar';
import styled from 'styled-components';
// import SearchIcon from '@mui/icons-material/Search';
import ImageCarousel from '../Carousel/ImageCarousel';

const StyledGridContainer = styled(Grid)`
  @media (max-width: 600px) {
    height: auto;
    padding-top: 60px;  /* Adjust the padding to prevent overlap with the sidebar icon */
  }
`;

function TVsection() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getData('https://api.themoviedb.org/3/discover/tv');
                setMovies(data.results);
                console.log('From TV', data.results);
                setFilterData(data.results);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    return (
        <StyledGridContainer maxWidth="lg" sx={{ marginLeft: { xs: 0, sm: '60px' } }}>
            <Box
                sx={{
                    width: { xs: '100%', sm: '20%' }, // Sidebar takes full width on mobile and smaller screens
                    paddingRight: 2,
                    marginBottom: { xs: 2, sm: 0 }, // Add margin at the bottom on mobile
                }}
            >
                <Sidebar />
            </Box>
            <StyledGridContainer
                sx={{
                    width: { xs: '100%', sm: '80%' }
                }}
            >
                <Stack sx={{width:{md:'190%', sm:'150%'}}}>
                    <ImageCarousel />
                </Stack>


                <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 5,marginLeft:'1%', color: 'white' }}>
                    Trending TV Shows
                </Typography>

                {/* Movie Grid */}
                <Box
                    sx={{
                        // overflowX: 'hidden',
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)', // 2 cards per row on small screens
                            sm: 'repeat(3, 1fr)', // 3 cards per row on medium screens
                            md: 'repeat(7, 1fr)', // 7 cards per row on large screens
                        },
                        gap: { xs: 1, sm: 2 }, // Reduce gap on small screens (1) and keep larger gap on medium/large screens (2)
                        marginTop: 2,
                        paddingLeft: { xs: 0, sm: '10px' }, // Remove padding left on small screens to prevent overflow
                        paddingRight: { xs: 0, sm: '10px' }, // Same for right padding
                    }}
                >
                    {!loading ? (
                        filterData.map((movie) => (
                            <Box key={movie.id}>
                                <Movie movie={movie} />
                            </Box>
                        ))
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </Box>
            </StyledGridContainer>
        </StyledGridContainer>
    );
}

export default TVsection;
