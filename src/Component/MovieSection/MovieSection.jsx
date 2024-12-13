import React, { useEffect, useState, useRef } from 'react';
import { Stack, Grid } from '@mui/material';
import styled from 'styled-components';
import { useMediaQuery, useTheme } from '@mui/material';
import './MovieSection.css';
import CircularProgress from '@mui/material/CircularProgress';
import getData from '../WrapperComponents/Axios';
import Movies from '../WrapperComponents/MovieSection/Movie';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

// Styled components for scroll buttons
const LeftScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  background-color: transparent;
  height: 370px;
  color: #fff;
  left: 5px;
  border: none;
  cursor: pointer;
  transition: background-image 0.3s;

  &:hover {
    background-image: linear-gradient(90deg, #020024 25%, transparent 100%);
  }

  @media (max-width: 600px) {
    height: 200px;
  }
`;

const RightScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  background-color: transparent;
  height: 370px;
  right: 0;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-image 0.3s;

  &:hover {
    background-image: linear-gradient(90deg, transparent 0%, #020024 100%);
  }

  @media (max-width: 600px) {
    height: 200px;
  }
`;

const MoviesSection = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false); // State for handling loading spinner
  const [error, setError] = useState(null); // State for handling errors
  const [isVisible, setIsVisible] = useState(false); // State for visibility
  
  const movieContainerRef = useRef(null); // Ref for horizontal scrollable container
  const observerRef = useRef(null); // Ref for the Intersection Observer

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const fetchMovies = async () => {
    if (!isVisible || loading) return; // Only fetch if visible and not already loading

    setLoading(true);
    setError(null);

    let url = '';
    if (category === 'Latest Releases') {
      url = 'https://api.themoviedb.org/3/trending/movie/day';
    } else if (category === 'Top Rated') {
      url = 'https://api.themoviedb.org/3/tv/top_rated';
    } else if (category === 'TV Shows') {
      url = 'https://api.themoviedb.org/3/trending/tv/day';
    }

    if (!url) {
      setError('Invalid category selected.');
      setLoading(false);
      return;
    }

    try {
      const data = await getData(url);
      console.log(`${category} Movies:`, data);
      setMovies(data.results); // Save fetched movies
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null, // Observe within the viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current); // Start observing the element
    }

    return () => {
      if (observerRef.current) {
        observer.disconnect(observerRef.current); // Clean up observer on unmount
      }
    };
  }, []);

  // Fetch movies when visibility changes
  useEffect(() => {
    if (isVisible) {
      fetchMovies();
    }
  }, [isVisible]);

  const scrollLeft = () => {
    if (movieContainerRef.current) {
      movieContainerRef.current.scrollBy({
        top: 0,
        left: isSmallScreen ? -250 : -1600,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (movieContainerRef.current) {
      movieContainerRef.current.scrollBy({
        top: 0,
        left: isSmallScreen ? 250 : 1600,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div ref={observerRef}>
      {/* Display the category name */}
      <p className="Category">{category}</p>

      {/* Wrapper for the entire movies section */}
      <div className="WrapperDIV">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          className="GridContainer"
        >
          {/* Left scroll button */}
          <LeftScrollButton onClick={scrollLeft} className="LeftScroll">
            <ArrowBackIosOutlinedIcon />
          </LeftScrollButton>

          <Grid item xs={12}>
            {/* Stack container for movies */}
            <Stack
              sx={{
                paddingTop: '20px',
                paddingBottom: '20px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
              ref={movieContainerRef} // Attach ref for scrolling
              direction="row"
              spacing={2}
            >
              {/* Show loading spinner */}
              {loading && <CircularProgress />}
              
              {/* Show error message if fetching fails */}
              {error && <p>Error loading movies: {error}</p>}

              {/* Render movie components */}
              {!loading &&
                !error &&
                movies.map((movie) => (
                  <div
                    key={movie.id}
                    style={{
                      display: 'inline-block',
                      marginRight: '10px',
                    }}
                  >
                    <Movies movie={movie} />
                  </div>
                ))}
            </Stack>
          </Grid>

          {/* Right scroll button */}
          <RightScrollButton onClick={scrollRight} className="RightScroll">
            <ArrowForwardIosOutlinedIcon />
          </RightScrollButton>
        </Grid>
      </div>
    </div>
  );
};

export default MoviesSection;
