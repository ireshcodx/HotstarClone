import {  Grid } from '@mui/material';
import React from 'react';
import ContinueWatching from './WatchHistoryChild';
import { useSelector } from 'react-redux';
import './WatchHistory.css'

const ContinueWatchingMovieSection = ({ username }) => {
    const movies = useSelector(state => state.watchList);

    return (
        <>
            <p className='Heading'>
                Watch history
            </p>
            <div className="movieContainer">
                <Grid
                    container
                    spacing={2}
                    justifyContent="left"
                    alignItems="center"
                >
                    {movies.map(movie => (
                        <Grid item xs={6} sm={3} md={2} key={movie.id}>
                            <ContinueWatching movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default ContinueWatchingMovieSection;