import React, { useEffect, useState, useRef } from 'react';
import { Stack, Grid } from '@mui/material';
import styled from 'styled-components';
import './MovieSection.css';
import CircularProgress from '@mui/material/CircularProgress';
import getData from '../WrapperComponents/Axios';
import Movies from '../WrapperComponents/MovieSection/Movie';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';


const LeftScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  background-color: transparent;
  height: 370px;
  color: #fff;
  left:0;
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
  right:0;
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

  const [isComponentVisible, setComponentVisible] = useState(false);

  const componentRef = useRef(null); // Ref for the element to observe

  const handleIntersection = (entries) => {

    const [entry] = entries;

    if (entry.isIntersecting) {

      setComponentVisible(true); // Set to true when the component is in the viewport

    }

  };

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleMovieId, setVisibleMovieId] = useState([]);
  const movieContainerRef = useRef(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const movieId = entry.target.getAttribute('data-id');
          if (movieId && !visibleMovieId.includes(movieId)) {
            setVisibleMovieId((prev) => [...prev, movieId]);
          }
          observer.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 })
  );

  const fetchMovies = async () => {
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
      setMovies(data.results);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {

    if (movies.length > 0) {
      movies.forEach((movie) => {
        const element = document.querySelector(`[data-id="${movie.id}"]`);
        if (element) observer.current.observe(element);
      });
    }
  }, [movies]);
  const scrollLeft = () => {
    if (movieContainerRef.current) {
      movieContainerRef.current.scrollBy({
        top: 0,
        left: -280,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (movieContainerRef.current) {
      movieContainerRef.current.scrollBy({
        top: 0,
        left: 280,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <p className='Category'>{category}</p>
      <div className='WrapperDIV'>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          className='GridContainer'
        >
          <LeftScrollButton onClick={scrollLeft} className='LeftScroll'>
            <ArrowBackIosOutlinedIcon />
          </LeftScrollButton>

          <Grid item xs={12}>
            <Stack
              sx={{
                paddingTop: '20px',
                paddingBottom: '20px',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
              ref={movieContainerRef}
              direction="row"
              spacing={2}
            >
              {loading && <CircularProgress />}
              {error && <p>Error loading movies: {error}</p>}
              {!loading &&
                !error &&
                movies.map((movie) => (
                  <div
                    key={movie.id}
                    data-id={movie.id}
                    style={{
                      display: 'inline-block',
                      marginRight: '10px',
                    }}
                  >
                    {visibleMovieId.includes(String(movie.id)) && <Movies movie={movie} />}
                  </div>
                ))}
            </Stack>
          </Grid>

          <RightScrollButton onClick={scrollRight} className='RightScroll'>
            <ArrowForwardIosOutlinedIcon />
          </RightScrollButton>
        </Grid>
      </div>
    </>
  );
};

export default MoviesSection;
