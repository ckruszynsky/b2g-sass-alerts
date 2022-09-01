import { Container } from '@mui/material'
import React from 'react'
import { AlertForm } from './components/AlertForm'
import { AlertManager } from './components/AlertManager'

export const AlertExample = () => {
    return (
        <Container sx={{ marginTop: '100px' }}>
            <AlertManager />
            <AlertForm />
        </Container>
    )
}
