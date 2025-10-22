'use client';

import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import dynamic from 'next/dynamic';
import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography, TablePagination, IconButton,
    Stack, TextField, Autocomplete,
    InputAdornment,
    DialogTitle, Drawer, Toolbar, Button, Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {rowsDemo} from "@/app/labels/navbarmodels";
import {Close, Search, SupportAgentOutlined} from '@mui/icons-material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {StyledTableContainer, HeaderBar, HeaderInner, Bold, DrawerSales, BoxInput} from "./style";
import ButtonProp from "@/app/components/buttons/buttonprop";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {theme} from '@/app/globalsmui';

const Home = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };


    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <HeaderBar>
                    <Toolbar disableGutters sx={{padding: '0 !important'}}>
                        <HeaderInner maxWidth={false}>
                            <Typography variant="h6"><Bold>GESTOR</Bold> Stocka</Typography>
                            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                                <IconButton onClick={toggleDrawer(true)}>
                                    <AddShoppingCartIcon sx={{color: 'var(--primarycolor)'}} fontSize='large'/>
                                </IconButton>
                            </Box>
                        </HeaderInner>
                    </Toolbar>
                </HeaderBar>
                <Box p='24px 0'>
                    <BoxInput>
                        <TextField
                            label="Pesquisar produto"
                            sx={{
                                '.MuiOutlinedInput-root': {
                                    borderRadius: '24px',
                                    background: 'white',
                                    height: '55px'
                                }
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Search/>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </BoxInput>
                </Box>
                <StyledTableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Código Produto</TableCell>
                                <TableCell>Produto</TableCell>
                                <TableCell>Valor de Custo</TableCell>
                                <TableCell sx={{width: '190px'}}>Valor de Venda</TableCell>
                                <TableCell sx={{width: '130px'}}>Quantidade</TableCell>
                                <TableCell align='center' sx={{width: '100px'}}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsDemo
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.nomeproduto}</TableCell>
                                        <TableCell sx={{maxWidth: '300px'}}>{item.valorpago}</TableCell>
                                        <TableCell>{item.valorvenda}</TableCell>
                                        <TableCell align='center'
                                                   sx={{width: '10px !important'}}>{item.quantidade}</TableCell>
                                        <TableCell sx={{display: 'flex'}} align='left'>
                                            <IconButton>
                                                <AddIcon/>
                                            </IconButton>
                                            <IconButton>
                                                <VisibilityOutlinedIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        sx={{backgroundColor: '#F3F7F9'}}
                        rowsPerPageOptions={[10, 15, 20]}
                        component="div"
                        count={rowsDemo.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Itens por página"
                    />
                </StyledTableContainer>
                <DrawerSales anchor="right" open={open} onClose={toggleDrawer(false)}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Novo Produto</Typography>
                        <IconButton onClick={toggleDrawer(false)}>
                            <Close/>
                        </IconButton>
                    </Box>
                </DrawerSales>
            </Box>
        </ThemeProvider>
    );
}

export default Home