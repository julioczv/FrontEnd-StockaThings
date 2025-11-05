'use client';

import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import {
    Box, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, TablePagination, IconButton, TextField,
    InputAdornment, useMediaQuery, Autocomplete, Stack, Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useMemo, useState } from 'react';
import { rowsDemo } from '@/app/labels/navbarmodels';
import { Close, Search } from '@mui/icons-material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { StyledTableContainer, BoxInput, AddProduct, NewProductDialog } from './style';
import { theme } from '@/app/globalsmui';
import ButtonProp from '@/app/components/buttons/buttonprop';

type FormState = {
    nomeProduto: string;
    descricaoProduto: string;
    valorPagoProduto: string;
    valorVendaProduto: string;
    quantidadeProduto: string;
    unidadeMedida: string | null;
    categoria: string | null;
};

const unidMedida = ['Unidade', 'Ml', 'Pacote'];
const categorias = ['Insumo', 'Venda', 'Teste'];

const emptyForm: FormState = {
    nomeProduto: '',
    descricaoProduto: '',
    valorPagoProduto: '',
    valorVendaProduto: '',
    quantidadeProduto: '',
    unidadeMedida: null,
    categoria: null,
};

type Mode = 'create' | 'edit';

const Home = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [openModal, setOpenModal] = useState(false);
    const [mode, setMode] = useState<Mode>('create');
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);

    const isMobile = useMediaQuery('(max-width:600px)', { noSsr: true });


    const handleOpenNewProduct = () => {
        setMode('create');
        setSelectedId(null);
        setForm(emptyForm);
        setOpenModal(true);
    };

    const handleOpenEditProduct = async (id: number) => {
        setMode('edit');
        setSelectedId(id);
        setOpenModal(true);

    };

    const handleCloseModal = () => setOpenModal(false);

    const handleChange =
        (field: keyof FormState) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm(prev => ({ ...prev, [field]: e.target.value }));
            };

    const handleSubmit = async () => {
        const payload = {
            nomeProduto: form.nomeProduto.trim(),
            descricaoProduto: form.descricaoProduto.trim() || null,
            valorPagoProduto: form.valorPagoProduto ? Number(form.valorPagoProduto) : null,
            valorVendaProduto: form.valorVendaProduto ? Number(form.valorVendaProduto) : null,
            quantidadeProduto: form.quantidadeProduto ? Number(form.quantidadeProduto) : 0,
            unidadeMedida: form.unidadeMedida,
            categoria: form.categoria,
        };

        if (mode === 'create') {
            await apiCreateProduct(payload);
        } else if (mode === 'edit' && selectedId != null) {
            await apiUpdateProduct(selectedId, payload);
        }

        setOpenModal(false);
        setForm(emptyForm);
        setSelectedId(null);
    };

    const buttonLabel = useMemo(() => (mode === 'create' ? 'Adicionar Produto' : 'Atualizar Produto'), [mode]);
    const modalTitle = useMemo(() => (mode === 'create' ? 'Adicionar Produto' : `Editar Produto #${selectedId}`), [mode, selectedId]);

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ overflowY: 'hidden', maxHeight: '100dvh' }}>
                <Box p="24px 0">
                    <BoxInput>
                        <TextField
                            label="Pesquisar produto"
                            sx={{
                                '.MuiOutlinedInput-root': {
                                    borderRadius: '24px',
                                    background: 'white',
                                    height: '55px',
                                },
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        {isMobile ? (
                            <Box>
                                <AddProduct onClick={handleOpenNewProduct}>
                                    <AddIcon />
                                </AddProduct>
                            </Box>
                        ) : (
                            <Box>
                                <ButtonProp label="Adicionar Produto" startIcon={<AddIcon />} onClick={handleOpenNewProduct} />
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
                                <TableCell sx={{ width: '160px' }} align="center">
                                    Valor de Custo
                                </TableCell>
                                <TableCell align="center">Valor de Venda</TableCell>
                                <TableCell align="center">Quantidade</TableCell>
                                <TableCell align="center" sx={{ width: '100px' }}>
                                    Ações
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsDemo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                                <TableRow key={item.id} hover>
                                    <TableCell data-label="Código:">{item.id}</TableCell>
                                    <TableCell data-label="Produto:">{item.nomeproduto}</TableCell>
                                    <TableCell data-label="Valor de Custo:" align="center">
                                        R$ {item.valorpago}
                                    </TableCell>
                                    <TableCell data-label="Valor de Venda:" align="center">
                                        R$ {item.valorvenda}
                                    </TableCell>
                                    <TableCell data-label="Quantidade:" align="center">
                                        {item.quantidade}
                                    </TableCell>
                                    <TableCell data-label="Ações" className="cell-actions" align="left">
                                        <Box>
                                            {/* aqui poderia adicionar ao carrinho etc. */}
                                            <IconButton sx={{ color: 'var(--primarycolor)' }}>
                                                <AddIcon />
                                            </IconButton>
                                            <IconButton
                                                sx={{ color: 'var(--primarycolor)' }}
                                                onClick={() => handleOpenEditProduct(item.id)}
                                                aria-label={`Editar produto ${item.id}`}
                                            >
                                                <VisibilityOutlinedIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <TablePagination
                        sx={{ backgroundColor: '#F3F7F9' }}
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

                {/* Modal único para criar/editar */}
                <NewProductDialog open={openModal} onClose={handleCloseModal}>
                    <Stack direction="row" justifyContent="space-between" pb="24px" alignItems="center">
                        <Typography variant="h6">{modalTitle}</Typography>
                        <IconButton onClick={handleCloseModal}>
                            <Close />
                        </IconButton>
                    </Stack>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Nome do Produto"
                                fullWidth
                                value={form.nomeProduto}
                                onChange={handleChange('nomeProduto')}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Descrição (Opcional)"
                                multiline
                                fullWidth
                                rows={4}
                                value={form.descricaoProduto}
                                onChange={handleChange('descricaoProduto')}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                type="number"
                                label="Valor de Custo"
                                fullWidth
                                value={form.valorPagoProduto}
                                onChange={handleChange('valorPagoProduto')}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                type="number"
                                label="Valor de Venda"
                                fullWidth
                                value={form.valorVendaProduto}
                                onChange={handleChange('valorVendaProduto')}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }} >
                            <TextField
                                type="number"
                                label="Quantidade"
                                fullWidth
                                value={form.quantidadeProduto}
                                onChange={handleChange('quantidadeProduto')}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Autocomplete
                                options={unidMedida}
                                value={form.unidadeMedida}
                                onChange={(_, v) => setForm(prev => ({ ...prev, unidadeMedida: v }))}
                                renderInput={params => <TextField {...params} label="Unidade de Medida" />}
                                fullWidth
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Autocomplete
                                options={categorias}
                                value={form.categoria}
                                onChange={(_, v) => setForm(prev => ({ ...prev, categoria: v }))}
                                renderInput={params => <TextField {...params} label="Categoria" />}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Stack direction="row" justifyContent="end" pt={2}>
                        <ButtonProp label={buttonLabel} startIcon={<AddIcon />} onClick={handleSubmit} />
                    </Stack>
                </NewProductDialog>
            </Box>
        </ThemeProvider>
    );
};

export default Home;
