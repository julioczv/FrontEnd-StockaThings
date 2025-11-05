'use client'

import * as React from 'react';
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "@/app/globalsmui";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import Login from './auth/login/page';

const checkAuth = () => {
    if (localStorage.getItem("token") != undefined) {
        return true;
    } else {
        return false;
    }
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    const [pageLoaded, setPageLoaded] = React.useState(false);
    const [autenticate, setAutenticate] = React.useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.startsWith('/pages')) {
            setAutenticate(checkAuth());
            setPageLoaded(true);
        } else {
            setAutenticate(true);
            setPageLoaded(true);
        }

    }, [pathname]);

    return (
        <html lang="pt-BR">
        <title>Stocka Things</title>
        <body>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {autenticate ? (
                <Box>
                    {children}
                </Box>
            ) : (
                <Login/>
            )}
        </ThemeProvider>
        </body>
        </html>
    );
}
