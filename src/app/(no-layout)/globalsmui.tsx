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
                        borderColor: '#0C5144',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0C5144',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0C5144',
                        borderWidth: 1.5,
                    },
                },
            },
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#0C5144',
                    },
                },
            },
        },
    },
});
