import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import './OverlayModal.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: 'fitcontent',
    bgcolor: '#0f1014',
    border: '2px solid #16181f  ',
    boxShadow: 24,
    m: 0,
    p: 0,
};

function OverlayModal({ movie, releaseDate,open, handleClose }) {
    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Card className='overlay-card-content' sx={{ maxWidth: '100%', textAlign:'justify' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height={350}
                            image={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                            alt={movie.name}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" color='#fff' textAlign={'center'}>
                                {releaseDate} • {movie.original_language.toUpperCase()}  • <button className='UAbutton'>U/A{movie.adult ? '18+' : '16+'}</button> • {movie.vote_average} <StarsRoundedIcon /> • {movie.media_type ? movie.media_type.substring(0, 1).toUpperCase() + movie.media_type.substring(1) : 'Series'} <MovieCreationRoundedIcon />
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#b1c1e6', fontWeight: 'lighter' }}>
                                {movie.overview}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Modal>
    )
}

export default OverlayModal;