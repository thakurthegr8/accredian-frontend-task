import { Stack, Typography } from '@mui/material'
import React from 'react'

const Logo = () => {
    return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
        <Typography variant='h6' color="default" fontWeight={800} letterSpacing={-1}>
            Accredian
        </Typography>
    </Stack>
    )
}

export default Logo