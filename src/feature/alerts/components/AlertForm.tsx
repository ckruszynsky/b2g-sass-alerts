import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { validateInput, validateURLInput } from '../../../utils';
import { useAlertReducer } from '../contexts/AlertContext';
import { Alert, CreateDefaultAlert } from '../types';
import * as uuid from 'uuid';




export const AlertForm = () => {
    const { alerts, addAlert } = useAlertReducer();
    const [alert, setAlert] = useState<Alert>(CreateDefaultAlert);
    const [formChanged, setFormChanged] = useState(false);
    const [validId, setvalidId] = useState(true);
    const [errors, setErrors] = useState<{
        [key: string]: string
    }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formChanged) {
            setFormChanged(true);
        }
        if (e.target.name === 'id' && e.target.value !== '' && alerts.find(alert => alert.id === e.target.value)) {
            setvalidId(false);
        } else {
            setvalidId(true);
        }
        setAlert({ ...alert, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (alert.id === '') {
            alert.id = uuid.v4()
        }
        addAlert(alert);
        setAlert(CreateDefaultAlert(alert.type));
    };


    return (
        <Box
            component="form"
            sx={{
                borderRadius: '5px',
                border: '2px solid #E0E0E0',
                padding: '10px',
                '& .MuiTextField-root': { m: 1, width: '60ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Typography variant="h4" gutterBottom>New Alert</Typography>
            <div>
                <TextField
                    label='ID'
                    name='id'
                    onChange={handleChange}
                    error={!validId}
                    helperText={validId ? '' : 'ID already exists'}
                    value={alert.id}
                />
                <TextField
                    label='Title'
                    name='title'
                    onChange={handleChange}
                    onBlur={(e) => validateInput(e, setErrors, 'title', 'Title is required', errors)}
                    error={!!errors['title']}
                    helperText={errors['title']}
                    value={alert.title}
                />
            </div>
            <div>
                <TextField
                    label='Alert Text'
                    name='text'
                    onBlur={(e) => validateInput(e, setErrors, 'text', 'Text is required', errors)}
                    onChange={handleChange}
                    error={!!errors['text']}
                    helperText={errors['text']}
                    value={alert.text}
                />
                <TextField
                    label='Time Limit'
                    name='timeLimit'
                    type={'number'}
                    helperText='Time in seconds'
                    onChange={handleChange}
                    value={alert.timeLimit}
                />
            </div>
            <div>
                <TextField
                    label='Link'
                    name='link'
                    type={'url'}
                    onChange={handleChange}
                    onBlur={(e) => validateURLInput(e, setErrors, 'link', 'Link is not a valid URL', errors)}
                    value={alert.link}
                    error={!!errors['link']}
                    helperText={errors['link']}
                />
                <TextField
                    select
                    label='Type'
                    name='type'
                    value={alert.type}
                    onChange={handleChange}
                    SelectProps={{
                        native: true,
                    }}>
                    <option value='success'>Success</option>
                    <option value='error'>Error</option>
                    <option value='info'>Info</option>
                    <option value='warning'>Warning</option>
                </TextField>


            </div>
            <Button type='submit' variant='contained' disabled={
                !formChanged || !validId || Object.keys(errors).length > 0
            }>
                Submit
            </Button>
        </Box>
    )
}

