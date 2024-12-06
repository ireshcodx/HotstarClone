import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, CssBaseline, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';
import CheckIcon from '@mui/icons-material/Check';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import './Subscription.css';
import { useNavigate } from 'react-router-dom';
import RazorpayPayment from './PaymentGateway';

function Subscription() {
    const navigate = useNavigate();

    const handlePayment = () => {
        return <RazorpayPayment />;
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xxl" className="subscription-container">
                <Box className="subscription-box">
                    <Box>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={6} className="logo-container">
                                <CloseIcon fontSize='large' className="close-icon" onClick={() => { navigate('/login') }} />
                                <img src='https://img.hotstar.com/image/upload/v1656431456/web-images/logo-d-plus.svg' alt="LOGO" />
                            </Grid>
                            <Grid item xs={12} md={6} className="help-button-container">
                                <Button
                                    variant="contained"
                                    className="language-button"
                                >
                                    English
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box className="subscription-content">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4} className="left-column">
                                <p className="heading">Subscribe now and start streaming</p>
                                <div className="offer-box">
                                    <h6 className="offer-text">
                                        <DiscountIcon className="discount-icon" />
                                        Flat 150 Rs Off for you.
                                    </h6>
                                </div>
                            </Grid>

                            <Grid item md={1}></Grid>
                            <Grid item xs={12} md={7}>
                                <TableContainer>
                                    <Table className="subscription-table" aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell className="super-plan align-center">Super</TableCell>
                                                <TableCell className="premium-plan align-center">Premium</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    All Content
                                                    <br />
                                                    <span className='subText'>Movies, Live Sports, TV, Specials</span>
                                                </TableCell>
                                                <TableCell className="super-cell align-center"><CheckIcon /></TableCell>
                                                <TableCell className="align-center"><CheckIcon /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Watch on TV or Laptop
                                                </TableCell>
                                                <TableCell className="super-cell align-center"><CheckIcon /></TableCell>
                                                <TableCell className="align-center"><CheckIcon /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Ads free movies and shows (except sports)
                                                </TableCell>
                                                <TableCell className="super-cell align-center"><CloseIcon /></TableCell>
                                                <TableCell className="align-center"><CheckIcon /></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Number of devices that can be logged in
                                                </TableCell>
                                                <TableCell className="super-cell align-center">2</TableCell>
                                                <TableCell className="align-center">4</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Max video quality
                                                </TableCell>
                                                <TableCell className="super-cell align-center">Full HD <br />1080p</TableCell>
                                                <TableCell className="align-center">4K 2160p <br />+ Dolby Vision</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Max audio quality
                                                    <br />
                                                    <span className='subText'>Atmos available on select titles only</span>
                                                </TableCell>
                                                <TableCell className="super-cell align-center">Dolby Atmos</TableCell>
                                                <TableCell className="align-center">Dolby Atmos</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Grid item md={12}>
                                    <div className="plan-toggle">
                                        <div className="plan-options">
                                            <h5 className='plans'>Quarterly<CheckCircleRoundedIcon className="check-icon" /></h5>
                                            <h5 className='plans'>Yearly</h5>
                                            <h5 className='plans'>Monthly</h5>
                                        </div>
                                    </div>
                                </Grid>

                                <Grid container>
                                    <Grid item xs={12} md={6} className="plan-box">
                                        <div className="super-plan-box">
                                            <p className="plan-name">Super</p>
                                            <p className="plan-price">
                                                <span className="price">₹149</span>
                                                <sub className="duration">/3 Months</sub>
                                            </p>
                                            <p className="discount-details">
                                                <span className="original-price">₹299</span> <span className="discount">₹150 OFF</span>
                                            </p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6} className="plan-box">
                                        <div className="premium-plan-box">
                                            <p className="plan-name">Premium</p>
                                            <p className="plan-price">
                                                <span className="price">₹349</span>
                                                <sub className="duration">/3 Months</sub>
                                            </p>
                                            <p className="discount-details">
                                                <span className="original-price">₹499</span> <span className="discount">₹150 OFF</span>
                                            </p>
                                        </div>
                                    </Grid>
                                </Grid>

                                <div className="continue-button-container">
                                    <RazorpayPayment />
                                    {/* <Button variant='contained' fullWidth className="continue-button" onClick={handlePayment}>Continue With Super <NavigateNextIcon /></Button> */}
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default Subscription;
