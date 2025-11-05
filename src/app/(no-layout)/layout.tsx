import {Box} from '@mui/material';
import './globals.css'

export default function NoLayout({children}: { children: React.ReactNode }) {
    return (
        <Box>
            {children}
        </Box>
    );
}