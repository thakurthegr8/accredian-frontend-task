import React from 'react'
import { Link } from "react-router-dom"
import { AppBar, Button, Container, Divider, Stack, Toolbar, Typography } from '@mui/material';
import Logo from '../../../../elements/general/Logo';
import { useAuth } from '../../../../../providers/Auth';


const AuthNavbar = () => {
    const auth = useAuth();
    return (
        <>
            <AppBar position='static' color='default' variant='default'>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Logo />
                        <Stack sx={{ flexGrow: 1, justifyContent: "end", gap: 1 }} direction="horizontal">
                            <Button variant='contained' type="error" onClick={auth.signOutHandler}>Sign out</Button>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
            <Divider />
        </>

    )
}

export default AuthNavbar;