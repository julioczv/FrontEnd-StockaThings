'use client';

import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {
    Box, AppBar, Toolbar, Container, TextField, useMediaQuery,
    IconButton, Button, Avatar, List, ListItemButton, ListItemIcon, ListItemText, Divider,
    Typography,
    Collapse
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import "../globals.css"
import {usePathname, useRouter} from 'next/navigation';
import {NAV} from "../labels/navbarmodels";
import {ChevronRight} from "@mui/icons-material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useState} from "react";
import {Bold} from "@/app/(main)/pages/home/style";
import {CartIcon} from "@/app/cart/CartIcon";
import {CartProvider} from "@/app/cart/CartProvider";


type NavLeaf = { key: string; label: string; icon: React.ReactNode; href: string };
type NavGroup = { key: string; label: string; icon: React.ReactNode; children: NavItem[] };
type NavItem = NavLeaf | NavGroup;


const SIDEBAR_W = 300;
const SIDEBAR_RAIL = 72;


const Root = styled(Box)`
    min-height: 100vh;
    background: var(--secondarycolor);
`;

const HeaderBar = styled(AppBar)`
    grid-area: header;
    position: sticky !important;
    top: 0;
    box-shadow: none;
    background: var(--secondarycolor);
    color: inherit;
`;

const HeaderInner = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 0;

    @media (max-width: 900px) {
        gap: 10px;
    }

`;

const Sidebar = styled(Box)<{ $open: boolean }>`
    position: fixed;
    inset: 0 auto 0 0;
    width: ${({$open}) => ($open ? `${SIDEBAR_W}px` : `${SIDEBAR_RAIL}px`)};
    min-height: 100dvh;
    z-index: 1300;
    background: #fff;
    border-right: 1px solid rgba(2, 6, 23, .06);
    box-shadow: 0 10px 30px rgba(15, 23, 42, .06);
    border-radius: 0 20px 0 0;
    overflow-y: auto;
    transition: width .24s ease;

    & ::-webkit-scrollbar {
        width: 6px;
    }

    & ::-webkit-scrollbar-thumb {
        background-color: red;
        border-radius: 6px;
    }

    & ::-webkit-scrollbar-thumb:hover {
        background-color: #00476b;
    }

    & ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
    }

    scrollbar-width: thin;
    scrollbar-color: #C4C4C4 #f2f2f2;
    scrollbar-border-radius: 6px;

    @media (max-width: 799px) {
        display: ${({$open}) => ($open ? 'block' : 'none')};
        width: 100vw;
        height: 100dvh;
        border-radius: 0;
        border-right: none;
        box-shadow: 0 10px 30px rgba(15, 23, 42, .12);
        z-index: 1400;
        position: fixed;
        inset: 0;
    }
`;

const BoxImage = styled(Box)<{ $open: boolean }>`
    justify-content: ${({$open}) => ($open ? `start` : `center`)};
    align-items: center;
    display: flex;
    padding: ${({$open}) => ($open ? `16px` : `26px`)};

`;

const Shell = styled(Box)`

    min-height: 100dvh;
    display: flex;
    flex-direction: column;
`;

const BoxArea = styled(Box)<{ $open: boolean }>`
    --rail: ${SIDEBAR_RAIL}px;
    --side: ${SIDEBAR_W}px;

    padding-left: ${({$open}) =>
            $open
                    ? `clamp(0px, calc(var(--side) - ((100vw - 1600px) / 2)), var(--side))`
                    : `clamp(0px, calc(var(--rail) - ((100vw - 1600px) / 2)), var(--rail))`
    };

    @media (max-width: 799px) {
        padding-left: 0;
    }

    width: 100%;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    transition: padding-left .24s ease;
`;

const ContentBand = styled(Box)`
    width: 100%;
    background: var(--secondarycolor);
`;


const pillWhenOpen = {
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 6,
        height: '40%',
        borderRadius: '0 5px 5px 0',
        background: 'var(--primarycolor)',
        opacity: 0,
        transition: 'height .2s ease, opacity .2s ease',
    },
    '&.Mui-selected::before': {opacity: 1, height: '40%'},
    '&:hover::before': {opacity: 0.4},
} as const;


const hidePillWhenClosed = {
    '&::before, &.Mui-selected::before, &:hover::before': {
        display: 'none',
    },
} as const;

export default function RootLayout({children}: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(true);
    const toggleSidebar = () => setOpen(v => !v);
    const isMobile = useMediaQuery('(max-width:799px)', {noSsr: true});
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();

    React.useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
    }, [mobileOpen]);

    const handleLeafClick = (e: React.MouseEvent, href: string) => {
        if (href === '/home' && isActive(href)) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            window.location.reload();
        }
    };

    const pathname = usePathname();
    const [openKeys, setOpenKeys] = React.useState<Set<string>>(new Set());

    const isActive = (href: string) =>
        href === '/home'
            ? pathname === '/' || pathname.startsWith('/home')
            : pathname === href || pathname.startsWith(href + '/');

    const hasActive = (item: NavItem): boolean =>
        'href' in item ? isActive(item.href) : item.children.some(hasActive);

    const toggleGroup = (k: string) => {
        setOpenKeys(prev => {
            const s = new Set(prev);
            s.has(k) ? s.delete(k) : s.add(k);
            return s;
        });
    };

    React.useEffect(() => {
        const parents = new Set<string>();
        const walk = (items: NavItem[]) => {
            items.forEach(i => {
                if ('children' in i) {
                    if (i.children.some(hasActive)) parents.add(i.key);
                    walk(i.children);
                }
            });
        };
        walk(NAV);
        setOpenKeys(prev => {
            const merged = new Set(prev);
            parents.forEach(k => merged.add(k));
            return merged;
        });
    }, [pathname]);

    const renderItem = (item: NavItem, depth = 0): React.ReactNode => {
        if ('href' in item) {
            return (
                <ListItemButton
                    key={item.key}
                    component={Link}
                    href={"/pages" + item.href}
                    onClick={(e) => handleLeafClick(e, item.href)}
                    selected={isActive(item.href)}
                    sx={{
                        my: .5,
                        borderRadius: 2,
                        color: 'text.secondary',
                        position: 'relative',
                        overflow: 'hidden',
                        pl: open ? 4 + depth * 2 : 2,
                        '&.Mui-selected': {backgroundColor: 'var(--primarycolor)', color: 'white'},
                        '&.Mui-selected:hover': {backgroundColor: 'var(--primarycolor)'},
                        '&:hover': {backgroundColor: 'var(--primary-100)', color: 'white'},
                        ...(open ? pillWhenOpen : hidePillWhenClosed),
                    }}
                >
                    <ListItemIcon sx={{minWidth: 36, color: 'inherit'}}>{item.icon}</ListItemIcon>
                    {open && <ListItemText primary={item.label}/>}
                </ListItemButton>
            );
        }

        const expanded = openKeys.has(item.key);
        const active = hasActive(item);

        return (

            <Box key={item.key}>
                <ListItemButton
                    onClick={() => toggleGroup(item.key)}
                    sx={{
                        my: .5,
                        borderRadius: 2,
                        color: active ? 'var(--primarycolor)' : 'text.secondary',
                        '&:hover': {backgroundColor: 'var(--primary-100)', color: 'white'},
                        ...(active && {backgroundColor: 'var(--primary-100)'}),
                    }}
                >
                    <ListItemIcon sx={{minWidth: 36, color: 'inherit'}}>{item.icon}</ListItemIcon>
                    {open && <ListItemText primary={item.label}/>}
                    {open && (
                        <ChevronRight
                            sx={{
                                ml: 'auto',
                                transition: 'transform .2s',
                                transform: expanded ? 'rotate(90deg)' : 'none',
                            }}
                        />
                    )}
                </ListItemButton>

                {open && (
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            {item.children.map(child => renderItem(child))}
                        </List>
                    </Collapse>
                )}
            </Box>
        );
    };

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/firstpage');
    }

    return (
        <Root>
            <CartProvider>

                <Sidebar $open={open}>
                    <BoxImage $open={open}>
                        {open ? (
                            <img src="/images/Logo.png" alt="logo" width={160} height={50} onClick={toggleSidebar}/>
                        ) : (
                            <img src="/images/Logotipo.png" alt="logo" width={40} height={30} onClick={toggleSidebar}/>
                        )}
                    </BoxImage>
                    <Divider/>

                    <List sx={{px: 1, pt: 1}}>
                        {NAV.map(item => renderItem(item))}
                    </List>

                    <Box flexGrow={1}/>
                    <Divider/>
                    <Box p={2} display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{width: 36, height: 36}}>N</Avatar>
                        {open && (
                            <Box>
                                <Typography sx={{fontWeight: 600, fontSize: 14}}>Usuário</Typography>
                                <Typography sx={{color: 'text.secondary', fontSize: 12}}>email@exemplo.com</Typography>
                            </Box>
                        )}
                    </Box>
                    <Box p={2} display="flex" alignItems="center" gap={1}>
                        {open ? (
                            <Button onClick={logout} sx={{color: 'red', display: 'flex', gap: '15px', borderRadius: '24px', width: '140px','&:hover':{background: 'rgba(180, 0, 0, 0.07)'}}}><LogoutIcon/>Deslogar</Button>
                        ) : (
                            <LogoutIcon sx={{color: 'red', display: 'flex', justifyContent: 'center', width: '100%' }}/>
                        )}
                    </Box>
                </Sidebar>
                <BoxArea $open={open}>
                    <Shell>
                        <HeaderBar>
                            <Toolbar disableGutters sx={{padding: '0 !important'}}>
                                <HeaderInner maxWidth={false}>
                                    {isMobile ? (
                                        <Box sx={{display: 'flex', alignItems: 'center', pl: '24px'}}>
                                            <IconButton onClick={toggleSidebar}>
                                                <img
                                                    src="/images/Logotipo.png"
                                                    alt="Drixx"
                                                    height={45}
                                                    style={{display: 'block'}}
                                                />
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        <Box pl='24px'>
                                            <Typography variant="h6"><Bold>GESTOR</Bold> S.G.I</Typography>
                                        </Box>
                                    )}
                                    <Box pr='30px'>
                                        <CartIcon />
                                    </Box>
                                </HeaderInner>
                            </Toolbar>
                        </HeaderBar>
                        <ContentBand>
                            <Box sx={{overflowY: 'visible', minWidth: 0, padding: '0 24px 0 24px'}}>
                                {children}
                            </Box>
                        </ContentBand>
                    </Shell>
                </BoxArea>
            </CartProvider>
        </Root>
    )
        ;
}