import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
const HomePage = () => {
    return (
        <Container maxWidth="md">
            <Stack mt={8} justifyContent="center" alignItems="center" gap={4}>
                <Typography variant="h3" align='center' sx={{ fontWeight: "bold" }}>Accredian auth demonstration</Typography>
                <Stack direction="row" gap={2}>
                    <Button variant='link' LinkComponent={Link} to="/login" size="large">Login</Button>
                    <Button variant='contained' LinkComponent={Link} to="/signup" size="large">Signup</Button>
                </Stack>
                <img src="https://illustrations.popsy.co/violet/engineer.svg" style={{ maxWidth: 320, mixBlendMode: "darken" }} />
            </Stack >
        </Container >
    )
}

export default HomePage;