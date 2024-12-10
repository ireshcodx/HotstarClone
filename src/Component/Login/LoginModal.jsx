import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, Grid, Alert } from '@mui/material';
import QR from '../../Assets/QR.png';
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 1000 }, // Responsive width
    maxHeight: '90vh', // Restrict max height
    bgcolor: 'rgb(22, 24, 31)',
    border: '2px solid #000',
    boxShadow: 24,
    p: { xs: 2, sm: 5 }, // Reduced padding for small screens
    borderRadius: '16px',
    overflow: 'auto', // Enable scrolling when content exceeds height
};

export default function LoginModal(props) {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState();

    const userData = useSelector(state => state.userData);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setError();
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = userData.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            const userJSON = JSON.stringify(user);
            localStorage.setItem('userData', userJSON);
            localStorage.setItem('isUserLoggedIn', true);
            props.handleLogin(true);
            handleClose();
        } else {
            setEmail('');
            setPassword('');
            setError("Incorrect username or password");
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                sx={{ backgroundColor: 'rgb(8,82,217)', color: 'white', width: '200px', padding: '12px', fontWeight: 'bold' }}
                onClick={handleOpen}
            >
                Log In
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" align='center' sx={{ fontWeight: 'bold' }}>
                        Login or sign up to continue
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" align='center'>
                        Scan QR code or enter phone number to login
                    </Typography>
                    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                        {/* QR Code Section */}
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                borderRight: { xs: 'none', sm: '2px solid rgb(255,255,255,0.5)' },
                                padding: '20px',
                            }}
                        >
                            <div className='QRsection'>
                                <img src={QR} alt="QR Code" height={200} width={200} />
                                <p className='QRtext'>Use Camera App to Scan QR</p>
                                <p className='QRsubText'>
                                    Click on the link generated to redirect to Disney+ Hotstar mobile app
                                </p>
                            </div>
                        </Grid>

                       
                        <Grid item xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
                            <form onSubmit={handleSubmit} className='loginForm'>
                                {error && <Alert severity="error" sx={{ margin: 2 }}>{error}</Alert>}
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Stack direction="row" spacing={2} sx={{ marginTop: '20px' }} justifyContent={'center'}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="success"
                                        size="large"
                                    >
                                        Login
                                    </Button>
                                </Stack>
                            </form>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
