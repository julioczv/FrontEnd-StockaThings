import {Box} from '@mui/material';

export default function NoLayout({children}: { children: React.ReactNode }) {
    return (
        <Box>
            {children}
        </Box>
    );
}