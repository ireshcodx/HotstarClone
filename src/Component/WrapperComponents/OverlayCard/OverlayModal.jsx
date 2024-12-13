import React from 'react';
import Modal from '@mui/material/Modal';
import { Grid, Stack, Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import './OverlayModal.css';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    // padding:'1%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '70%', md: '50%', lg: '40%' }, // Responsive width
    bgcolor: 'inherit',
    border: '2px solid #16181f',
    boxShadow: 24,
    m: 0,
    // p: 0,
};

function OverlayModal({ movie, releaseDate, open, handleClose }) {
    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >

            <Grid container justifyContent="center" alignItems="center" sx={style}>
                <Grid item xs={12}>
                    <Card className='overlay-card-content' sx={{ maxWidth: '100%', textAlign: 'justify' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height={350}
                                image={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                                alt={movie.name}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Stack spacing={1} al ignItems="center">
                                    <Typography gutterBottom variant="h6" component="div" color='#fff' textAlign={'center'}>
                                        {movie.name || movie.title} 🎬 • {releaseDate} • {movie.original_language.toUpperCase()} • <button className='UAbutton'>U/A{movie.adult ? '18+' : '16+'}</button> • {movie.vote_average.toFixed(1)} 🌟 • {movie.media_type ? movie.media_type.substring(0, 1).toUpperCase() + movie.media_type.substring(1) : 'Series'} 🍿
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#b1c1e6', fontWeight: 'lighter' }}>
                                        {movie.overview}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Modal>
    );
}

export default OverlayModal;
