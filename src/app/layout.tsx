'use client'

import * as React from 'react';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "@/app/globalsmui";



export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
        <title>Stocka Things</title>
        <body>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
