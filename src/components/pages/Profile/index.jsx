import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../../../providers/Auth'

const UserProfilePage = () => {
    const auth = useAuth();
    return (
        <Container maxWidth="2xl" sx={{ pt: 4 }}>
            <Stack>
                <Typography variant='h3' fontWeight={600} textAlign="center">
                    {`Welcome, ${auth.user.first_name} ${auth.user.last_name}`}
                </Typography>
            </Stack>
        </Container>
    )
}

export default UserProfilePage