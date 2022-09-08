

import { Alert, AlertTitle, Box, Snackbar } from '@mui/material';
import React from 'react'
import { useAlertState } from '../contexts/AlertContext'

export const AlertManager = () => {
    const { alerts } = useAlertState();
    console.log('Alert Manager render');

    return (
        <Snackbar
            sx={{ width: '15%' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={true}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                {alerts.map((alert, index) => (
                    <Alert
                        onClick={() => {
                            if (alert.link) {
                                window.open(alert.link, "_blank");
                            }
                        }}
                        key={alert.id} severity={alert.type === 'info' ? 'info' :
                            alert.type === 'success' ? 'success' :
                                alert.type === 'warning' ? 'warning' : 'error'}
                        sx={{ width: '100%', marginBottom: '15px' }}>
                        <AlertTitle>{alert.title}</AlertTitle>
                        {alert.text}
                    </Alert>
                ))}
            </Box>
        </Snackbar>
    )
}
