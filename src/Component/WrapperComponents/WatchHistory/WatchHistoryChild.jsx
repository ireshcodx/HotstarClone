import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ProgressBar from './ProgressBar';

export default function ContinueWatching({movie}) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="190"
                    image={movie.img}
                    alt={movie.name}
                />
                <ProgressBar />
                <CardContent sx={{ backgroundColor: 'rgb(18,18,18)' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {movie.timeLeft}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}