import { Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
            <Link to="/">
                <Typography variant='h6' fontWeight={800} letterSpacing={-1} >
                    Accredian
                </Typography>
            </Link>
        </Stack>
    )
}

export default Logo