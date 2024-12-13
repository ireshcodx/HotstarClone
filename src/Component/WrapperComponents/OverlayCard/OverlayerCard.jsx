import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieToWatchList } from '../../../Redux/WatchListSlice';
import Snackbar from '@mui/material/Snackbar';
import { createPortal } from 'react-dom';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import OverlayModal from './OverlayModal';

export default function MultiActionAreaCard({ movie }) {


  const dispatch = useDispatch();
  const movies = useSelector((state) => state.watchList);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [Message, setMessage] = React.useState();
  const navigate = useNavigate();
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` || 'https://via.placeholder.com/500x300';

  const addMovieToWatchListHandler = () => {
    const getRandomTimeLeft = () => {
      const hours = Math.floor(Math.random() * 3) + 1; // Random hours between 1 and 3
      const minutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59
      return `${hours}h ${minutes}m left`;
    };
    const MovieTitle=movie.title || movie.name;
    const movieToAdd = {
      id: movie.id,
      name: MovieTitle,
      timeLeft: getRandomTimeLeft(),
      img: imageUrl,
    };

    const found = movies.some(data => data.id === movieToAdd.id);
    if (movies.length >= 5) {
      setSnackbarOpen(true);
      setMessage('You can only add up to 5 movies to your watchlist.')
    }
    else if (found) {
      setSnackbarOpen(true);
      setMessage('This movie is already in your watchlist.')
    }
    else {
      dispatch(addMovieToWatchList(movieToAdd));
    }
  };

  const shortOverview = movie.overview.substring(0, 90);
  var releaseDate = '';
  if (movie.release_date) {
    releaseDate = movie.release_date.substring(0, 4);
  }
  else {
    releaseDate = movie.first_air_date.substring(0, 4);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (isLogIn) {
      setOpen(true);
    }
    else {
      navigate('/login')
    }
  }
  const handleClose = () => { setOpen(false) };
  const isLogIn = localStorage.getItem('isUserLoggedIn')

  return (
    <>
      <Card className="overlay-card-content" sx={{ maxWidth: { lg: '100%', xs: '70%' }, backgroundColor: '#16181f' }}>
        <div>
          <CardMedia
            component="img"
            height={150}
            image={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : 'https://via.placeholder.com/500x300?text=No+Poster'}
            alt={movie.name}
            sx={{ objectFit: 'cover' }}
          />
          <CardActions>
              <Button onClick={handleOpen} fullWidth variant="contained" sx={{fontSize:{lg:'12px',xs:'9px'}, backgroundColor: '#fff', color: '#16181f' }}>
                <PlayArrowIcon /> {isLogIn ? 'Watch Now' : 'Login Now'}
              </Button>
              <Button variant="outlined" sx={{ color: '#fff' }} onClick={addMovieToWatchListHandler} disabled={!isLogIn}>
                <AddIcon />
              </Button>
          </CardActions>
          <CardContent>
            <Typography gutterBottom component="div" color="#fff">
            {movie.name || movie.title} • {movie.original_language.toUpperCase()}  • <button className='UAbutton'>U/A{movie.adult ? '18+' : '16+'}</button>
            </Typography>
            <Typography variant="body2" sx={{ color: '#8690a8' }}>
              {shortOverview}...
            </Typography>
          </CardContent>
        </div>
      </Card>

      {open && <OverlayModal movie={movie} releaseDate={releaseDate} open={open} handleClose={handleClose} />}
      {createPortal(
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          sx={{ backgroundColor: '#16181f' }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right', 
          }}
        >
          <Alert
            severity="warning"
            onClose={() => setSnackbarOpen(false)}
            sx={{
              backgroundColor: '#16181f',
              color: '#fff',
            }}
          >
            {Message}
          </Alert>
        </Snackbar>,
        document.body  // Rendering Snackbar at the body level
      )}
    </>
  );
}
