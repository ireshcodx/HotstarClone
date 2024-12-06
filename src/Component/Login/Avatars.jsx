import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AvatarImg from './../../Assets/Avatars/Avatar.png';
import addMore from './../../Assets/Avatars/addMore.png';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function Avatars({userName}) {
  return (
    <Grid container spacing={5}>
      <Grid item>
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="AVT IMG" src={AvatarImg} sx={{ width: 95, height: 95 }} />
          </StyledBadge>
          <p className='UserName'>{userName}</p>
        </Box>
      </Grid>

      <Grid item>
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar alt="AVT IMG" src={addMore} sx={{ width: 95, height: 95, filter: 'brightness(80%) invert(0.4)'}} />
          </StyledBadge>
          <p className='UserName'>Add More</p>
        </Box>
      </Grid>
    </Grid>
  );
}