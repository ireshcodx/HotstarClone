import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton, Container, Typography, Box } from '@mui/material';
import getData from '../WrapperComponents/Axios';
import Movie from '../WrapperComponents/MovieSection/Movie';
import Sidebar from '../Sidebar/Sidebar';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getData('https://api.themoviedb.org/3/trending/movie/day');
                setMovies(data.results);
                setFilterData(data.results);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const HandleFilter = (e) => {
        const filter = movies.filter((movie) =>
            movie.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilterData(filter);
    };

    return (
        <Container maxWidth="lg" sx={{ marginLeft: { xs: 0, sm: '70px' }, padding: 2 }}>
            {/* Sidebar - Adjust position for small screens */}
            <Box
                sx={{
                    width: { xs: '100%', sm: '20%' }, // Sidebar takes full width on mobile and smaller screens
                    paddingRight: 2,
                    marginBottom: { xs: 2, sm: 0 }, // Add margin at the bottom on mobile
                }}
            >
                <Sidebar />
            </Box>

            {/* Main content - Adjust padding and margins for small screens */}
            <Box
                sx={{
                    width: { xs: '100%', sm: '80%' }, // Main content takes full width on small screens
                    padding: '10px',
                    marginTop: 5,
                }}
            >
                <TextField
                    id="text-field"
                    fullWidth
                    placeholder="Movies, shows and more"
                    variant="outlined"
                    onChange={HandleFilter}
                    sx={{
                        width: { xs: '100%', lg: '197%' },  // Make the search bar span the full container width
                        borderRadius: '10px',
                        backgroundColor: '#252833',
                        color: 'white',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgb(37, 40, 51)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgb(37, 40, 51)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(37, 40, 51)',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputBase-input::placeholder': {
                            fontWeight: 'bold',
                            fontSize: '20px',
                            color: '#8F98B2',
                        },
                        // Adjusting padding for small screen sizes to avoid overflow or horizontal scroll
                        paddingLeft: { xs: '8px', sm: '10px' },
                        paddingRight: { xs: '8px', sm: '10px' },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start" sx={{ color: 'white' }}>
                                    <IconButton aria-label="search for action">
                                        <SearchIcon sx={{ color: '#8F98B2' }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />



                <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 8, color: 'white' }}>
                    Trending in India
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
                    {filterData.length !== 0 ? (
                        !loading ? (
                            filterData.map((movie) => (
                                <Box key={movie.id}>
                                    <Movie movie={movie} />
                                </Box>
                            ))
                        ) : (
                            <Typography>Loading...</Typography>
                        )
                    ) : (
                        <Typography sx={{ color: 'white', fontSize: '20px' }}>No Movies</Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
}

export default Search;
