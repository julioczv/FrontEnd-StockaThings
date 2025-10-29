'use client';

import * as React from 'react';
import {ThemeProvider} from 'styled-components';
import {
    Box, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, TablePagination, IconButton, TextField,
    InputAdornment, Toolbar, useMediaQuery,
    Button, Autocomplete, Stack,
    Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {rowsDemo, Row} from "@/app/labels/navbarmodels";
import {Close, Search} from '@mui/icons-material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {StyledTableContainer, BoxInput, AddProduct, NewProductDialog} from "./style";
import {theme} from '@/app/globalsmui';
import ButtonProp from "@/app/components/buttons/buttonprop";
import {useCart} from '@/app/cart/CartProvider';


const unidMedida = ["Unidade", "Ml", "Pacote"]
const categoria = ["Insumo", "Venda", "Teste"]

const Home = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [open, setOpen] = useState(false);
    const [openNewProduct, setOpenNewProduct] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)', {noSsr: true});


    const handleOpenNewProduct = () => setOpenNewProduct(true);
    const handleCloseNewProduct = () => setOpenNewProduct(false);


    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{overflowY: 'hidden', maxHeight: '100dvh'}}>
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
                        {isMobile ? (
                            <Box>
                                <AddProduct onClick={handleOpenNewProduct}>
                                    <AddIcon/>
                                </AddProduct>
                            </Box>
                        ) : (
                            <Box>
                                <ButtonProp label='Adicionar Produto' startIcon={<AddIcon/>}
                                            onClick={handleOpenNewProduct}/>
                            </Box>
                        )}
                    </BoxInput>
                </Box>
                <StyledTableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Produto</TableCell>
                                <TableCell sx={{width: '160px'}} align='center'>Valor de Custo</TableCell>
                                <TableCell align='center'>Valor de Venda</TableCell>
                                <TableCell align='center'>Quantidade</TableCell>
                                <TableCell align='center' sx={{width: '100px'}}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsDemo
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell data-label="Código:">{item.id}</TableCell>
                                        <TableCell data-label="Produto:">{item.nomeproduto}</TableCell>
                                        <TableCell data-label="Valor de Custo:" align='center'>
                                            R$ {item.valorpago}
                                        </TableCell>
                                        <TableCell data-label="Valor de Venda:"
                                                   align="center">R$ {item.valorvenda}</TableCell>
                                        <TableCell data-label="Quantidade:" align="center">
                                            {item.quantidade}
                                        </TableCell>
                                        <TableCell data-label="Ações" className="cell-actions" align="left">
                                            <Box>
                                                <IconButton sx={{color: 'var(--primarycolor)'}}>
                                                    <AddIcon/>
                                                </IconButton>
                                                <IconButton sx={{color: 'var(--primarycolor)'}}>
                                                    <VisibilityOutlinedIcon/>
                                                </IconButton>
                                            </Box>
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

                <NewProductDialog open={openNewProduct} onClose={handleCloseNewProduct}>
                    <Stack direction='row' justifyContent='space-between' pb='24px'>
                        <Typography variant='h6'>Adicionar Produto</Typography>
                        <IconButton onClick={handleCloseNewProduct}>
                            <Close/>
                        </IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                label='Nome do Produto'
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                label='Descrição (Opcional)'
                                multiline
                                fullWidth
                                rows={5}
                            />
                        </Grid>
                        <Grid size={{xl: 4, lg: 4, md: 4, sm: 4, xs: 12}} >
                            <TextField
                                type='number'
                                label='Valor de Custo'
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{xl: 4, lg: 4, md: 4, sm: 4, xs: 12}} >
                            <TextField
                                type='number'
                                label='Valor de Venda'
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{xl: 4, lg: 4, md: 4, sm: 4, xs: 12}} >
                            <TextField
                                type='number'
                                label='Quantidade'
                                fullWidth
                            />
                        </Grid>
                        <Grid  size={12}>
                            <Autocomplete
                                options={unidMedida}
                                fullWidth={true}
                                renderInput={(params) => (
                                    <TextField {...params} label="Unidade de Medida"/>
                                )}
                            />
                        </Grid>
                        <Grid  size={12}>
                            <Autocomplete
                                options={categoria}
                                fullWidth={true}
                                renderInput={(params) => (
                                    <TextField {...params} label="Categoria"/>
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Stack direction='row' justifyContent='end' pt={2}>
                        <ButtonProp label='Adicionar Produto' startIcon={<AddIcon/>}/>
                    </Stack>
                </NewProductDialog>
            </Box>
        </ThemeProvider>
    );
}

export default Home