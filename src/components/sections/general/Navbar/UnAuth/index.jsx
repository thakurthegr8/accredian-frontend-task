import React from 'react'
import { Link } from "react-router-dom"
import { AppBar, Button, Container, Divider, Stack, Toolbar, Typography } from '@mui/material';
import Logo from '../../../../elements/general/Logo';
import { useAuth } from '../../../../../providers/Auth';


const UnAuthNavbar = () => {
    const auth = useAuth();
    return (
        <>
            <AppBar position='static' color='default' variant='default'>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Logo />
                        <Stack sx={{ flexGrow: 1, justifyContent: "end", gap: 1 }} direction="horizontal">
                            {!auth?.user && <>
                                <Button variant='link' LinkComponent={Link} to="/login">login</Button>
                                <Button variant='contained' LinkComponent={Link} to="/register">register</Button>
                            </>}
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
            <Divider />
        </>

    )
}

export default UnAuthNavbar;