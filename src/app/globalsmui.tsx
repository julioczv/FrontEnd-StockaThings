// theme.ts
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: { fontFamily: 'Montserrat, Arial, sans-serif' },

    palette: {
        primary: { main: '#0C5144' },
    },

    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0,0,0,0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary',
                        borderWidth: 1.5,
                    },
                },
            },
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: 'primary',
                    },
                },
            },
        },
    },
});
