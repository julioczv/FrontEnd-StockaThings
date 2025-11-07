'use client';

import * as React from 'react';
import {ThemeProvider} from 'styled-components';
import {
    Box, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, TablePagination, IconButton, TextField,
    InputAdornment, useMediaQuery, Autocomplete, Stack, Grid
} from '@mui/material';
import {useEffect, useMemo, useState} from 'react';
import {Close, Search} from '@mui/icons-material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {StyledTableContainer, BoxInput, AddProduct, NewProductDialog, DeleteModalDialog} from './style';
import {theme} from '@/app/globalsmui';
import ButtonProp from '@/app/components/buttons/buttonprop';
import {
    deleteProduct,
    getCategory,
    getProductById,
    getProducts,
    getUnityMeasure,
    postProducts,
    putProduct
} from './service';
import {api} from "@/app/interceptor/api";
import {IProductId, IProducts} from "@/app/domain/models/dto/IProducts";
import {IUnityMeasure} from "@/app/domain/models/dto/IUnityMeasure";
import {ICategory} from "@/app/domain/models/dto/ICategory";
import {DeleteOutlineOutlined as Trash, Edit, Add} from '@mui/icons-material';
import toast, {Toaster} from 'react-hot-toast';
import {useCart} from '@/app/cart/CartProvider';


type FormState = {
    nomeProduto: string;
    descricaoProduto: string;
    valorPagoProduto: string;
    valorVendaProduto: string;
    qtdProduto: string;
    unidadeMedida: IUnityMeasure | null;
    categoria: ICategory | null;
};


const emptyForm: FormState = {
    nomeProduto: '',
    descricaoProduto: '',
    valorPagoProduto: '',
    valorVendaProduto: '',
    qtdProduto: '',
    unidadeMedida: null,
    categoria: null,
};


const Home = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [products, setProducts] = useState<IProductId[]>([]);
    const [unityMeasure, setUnityMeasure] = useState<IUnityMeasure[]>([]);
    const [category, setCategory] = useState<ICategory[]>([]);
    const [query, setQuery] = useState('');
    const [edit, setEdit] = useState<boolean>(true);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [toDelete, setToDelete] = useState<{ id: number; name: string } | null>(null);

    const isMobile = useMediaQuery('(max-width:600px)', {noSsr: true});

    const {add} = useCart();

    const handleOpenNewProduct = () => {
        setSelectedId(null);
        setForm(emptyForm);
        setOpenModal(true);
        setEdit(false);
    };

    const handleOpenEditProduct = async (idProduto: number) => {
        setSelectedId(idProduto);
        setOpenModal(true);
        setEdit(true);


        try {
            const productData = await getProductById(api, idProduto)

            if (productData) {
                const selectedCategory = category.find(c => c.categoriaId === productData.categoriaId) ?? null;
                const selectedUnityMeasure = unityMeasure.find(u => u.unidadeMedidaId === productData.unidadeMedidaId) ?? null;

                setForm({
                    nomeProduto: productData.nomeProduto ?? '',
                    descricaoProduto: productData.descricaoProduto ?? '',
                    valorPagoProduto: String(productData.valorPagoProduto),
                    valorVendaProduto: String(productData.valorVendaProduto),
                    qtdProduto: String(productData.qtdProduto),
                    unidadeMedida: selectedUnityMeasure,
                    categoria: selectedCategory,
                })
            }
        } catch (error) {
            console.error(`Erro ao buscar produto #${idProduto} para edição: `, error);
            setOpenModal(false);
        }
    };

    const handleOpenModalDelete = (idProduto: number) => {
        const p = products.find(p => p.idProduto === idProduto);
        setToDelete({id: idProduto, name: p?.nomeProduto ?? ''});
        setOpenModalDelete(true);
    };

    const handleConfirmDelete = async () => {
        if (!toDelete) return;
        try {
            await deleteProduct(api, toDelete.id);
            await productsTable();
            toast.success(`Produto "${toDelete.name}" deletado com sucesso!`);
        } catch {
            toast.error('Erro ao excluir o produto pois o produto já está lançado como histórico de venda.');
        } finally {
            setOpenModalDelete(false);
            setToDelete(null);
        }
    };

    const handleCloseModal = () => setOpenModal(false);

    const handleChange =
        (field: keyof FormState) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm(prev => ({...prev, [field]: e.target.value}));
            };


    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };


    const productsTable = async () => {
        try {
            const response = await getProducts(api);
            setProducts(response.content);
        } catch (error) {
            console.error("Erro ao buscar produtos: ", error);
        }
    }

    useEffect(() => {
        productsTable();
    }, [api]);

    useEffect(() => {
        async function unityMeasure() {
            try {
                const response = await getUnityMeasure(api);
                setUnityMeasure(Array.isArray(response) ? response : []);
            } catch (error) {
                console.error("Erro ao buscar produtos: ", error);
            }
        }

        unityMeasure();
    }, []);

    useEffect(() => {
        async function category() {
            try {
                const response = await getCategory(api);
                setCategory(Array.isArray(response) ? response : []);
            } catch (error) {
                console.error("Erro ao buscar produtos: ", error);
            }
        }

        category();
    }, []);


    const norm = (s: unknown) =>
        String(s ?? '')
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase();

    const filteredProducts = useMemo(() => {
        if (!query.trim()) return products;
        const q = norm(query);
        return products.filter((p) => {
            return (
                norm(p.nomeProduto).includes(q) ||
                norm(p.descricaoProduto).includes(q) ||
                norm(p.idProduto).includes(q) ||
                norm(p.valorPagoProduto).includes(q) ||
                norm(p.valorVendaProduto).includes(q) ||
                norm(p.qtdProduto).includes(q)
            );
        });
    }, [products, query]);


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setPage(0);
    };

    const toNumber = (v: string) => Number(String(v).replace(',', '.')) || 0;


    const isInvalid =
        !form.nomeProduto.trim() ||
        !form.unidadeMedida ||
        !form.categoria ||
        !form.valorPagoProduto ||
        !form.valorVendaProduto ||
        !form.qtdProduto;

    const handleSubmit = async () => {
        if (isInvalid) return;

        const isEditing = selectedId !== null;
        const payload: IProducts = {
            nomeProduto: form.nomeProduto,
            descricaoProduto: form.descricaoProduto,
            valorPagoProduto: toNumber(form.valorPagoProduto),
            valorVendaProduto: toNumber(form.valorVendaProduto),
            qtdProduto: toNumber(form.qtdProduto),
            unidadeMedidaId: form.unidadeMedida?.unidadeMedidaId ?? 0,
            categoriaId: form.categoria?.categoriaId ?? 0,
        };

        try {
            if (isEditing) {
                await putProduct(api, selectedId!, payload);
                toast.success(`Produto ${selectedId} atualizado com sucesso!`);

            } else {
                await postProducts(api, payload);
                toast.success('Produto criado com sucesso!');
            }
            await productsTable();
            handleCloseModal();
            setForm(emptyForm);

        } catch (error) {
            console.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} o produto: `, error);
            toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} o produto: `);
        }
    };

    const qtySx = (q?: number) => {
        const n = q ?? 0;
        return {
            color: n >= 10 ? 'success.main' : n <= 5 ? 'error.main' : 'warning.main',
            fontWeight: 700,
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Toaster position='top-center'/>
            <Box sx={{overflowY: 'hidden', maxHeight: '100dvh'}}>
                <Box p="24px 0">
                    <BoxInput>
                        <TextField
                            label="Pesquisar produto"
                            value={query}
                            onChange={handleSearch}
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
                                            <Search/>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        {isMobile ? (
                            <Box>
                                <AddProduct onClick={handleOpenNewProduct}>
                                    <Add/>
                                </AddProduct>
                            </Box>
                        ) : (
                            <Box>
                                <ButtonProp label="Adicionar Produto" startIcon={<Add/>}
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
                                <TableCell sx={{width: '160px'}} align="center">
                                    Valor de Custo
                                </TableCell>
                                <TableCell align="center">Valor de Venda</TableCell>
                                <TableCell align="center">Quantidade</TableCell>
                                <TableCell align="center" sx={{width: '100px'}}>
                                    Ações
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                                <TableRow key={item.idProduto} hover>
                                    <TableCell data-label="Código:">{item.idProduto}</TableCell>
                                    <TableCell data-label="Produto:">{item.nomeProduto}</TableCell>
                                    <TableCell data-label="Valor de Custo:" align="center">
                                        R$ {item.valorPagoProduto}
                                    </TableCell>
                                    <TableCell data-label="Valor de Venda:" align="center">
                                        R$ {item.valorVendaProduto}
                                    </TableCell>
                                    <TableCell data-label="Quantidade:" align="center" sx={qtySx(item.qtdProduto)}>
                                        {item.qtdProduto ?? 0}
                                    </TableCell>
                                    <TableCell data-label="Ações" className="cell-actions" align="center" width='150px'>
                                        <Box>
                                            <IconButton
                                                sx={{color: 'var(--primarycolor)'}}
                                                onClick={() => add({
                                                    idProduto: item.idProduto,
                                                    nomeProduto: item.nomeProduto ?? '',
                                                    descricao: item.descricaoProduto ?? '',
                                                    precoVenda: Number(item.valorVendaProduto),
                                                    precoCusto: Number(item.valorPagoProduto),
                                                }, 1)}
                                                aria-label={`Adicionar ${item.nomeProduto} ao carrinho`}
                                            >
                                                <Add/>
                                            </IconButton>
                                            <IconButton
                                                sx={{color: 'var(--primarycolor)'}}
                                                onClick={() => handleOpenEditProduct(item.idProduto)}
                                                aria-label={`Editar produto ${item.idProduto}`}
                                            >
                                                <VisibilityOutlinedIcon/>
                                            </IconButton>
                                            <IconButton sx={{color: 'var(--primarycolor)'}}
                                                        onClick={() => handleOpenModalDelete(item.idProduto)}>
                                                <Trash/>
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
                        count={filteredProducts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Itens por página"
                    />
                </StyledTableContainer>

                <NewProductDialog open={openModal} onClose={handleCloseModal}>
                    <Stack direction="row" justifyContent="space-between" pb="24px" alignItems="center">
                        <Typography
                            variant="h6">{edit ? `Editar ${form.nomeProduto}` : 'Adicionar Produto'}</Typography>
                        <IconButton onClick={handleCloseModal}>
                            <Close/>
                        </IconButton>
                    </Stack>

                    <Grid container spacing={2}>
                        <Grid size={{xs: 12}}>
                            <TextField
                                label="Nome do Produto"
                                disabled={edit}
                                fullWidth
                                value={form.nomeProduto}
                                onChange={handleChange('nomeProduto')}
                            />
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <TextField
                                label="Descrição (Opcional)"
                                multiline
                                fullWidth
                                rows={4}
                                value={form.descricaoProduto}
                                onChange={handleChange('descricaoProduto')}
                            />
                        </Grid>

                        <Grid size={{xs: 12, sm: 4}}>
                            <TextField
                                type="number"
                                label="Valor de Custo"
                                fullWidth
                                value={form.valorPagoProduto}
                                onChange={handleChange('valorPagoProduto')}
                            />
                        </Grid>

                        <Grid size={{xs: 12, sm: 4}}>
                            <TextField
                                type="number"
                                label="Valor de Venda"
                                fullWidth
                                value={form.valorVendaProduto}
                                onChange={handleChange('valorVendaProduto')}
                            />
                        </Grid>

                        <Grid size={{xs: 12, sm: 4}}>
                            <TextField
                                type="number"
                                label="Quantidade"
                                fullWidth
                                value={form.qtdProduto}
                                onChange={handleChange('qtdProduto')}
                            />
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <Autocomplete<ICategory>
                                options={category}
                                value={form.categoria}
                                onChange={(_, v) => setForm(prev => ({...prev, categoria: v}))}
                                getOptionLabel={(opt) => opt?.nomeCategoria ?? ''}
                                isOptionEqualToValue={(opt, val) => opt.categoriaId === val?.categoriaId}
                                renderInput={(params) => <TextField {...params} label="Categoria"/>}
                            />
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <Autocomplete<IUnityMeasure>
                                options={unityMeasure}
                                value={form.unidadeMedida}
                                onChange={(_, v) => setForm(prev => ({...prev, unidadeMedida: v}))}
                                getOptionLabel={(opt) => opt?.unidMedida ?? ''}
                                isOptionEqualToValue={(opt, val) => opt.unidadeMedidaId === val?.unidadeMedidaId}
                                renderInput={(params) => <TextField {...params} label="Unidade de Medida"/>}
                            />
                        </Grid>
                    </Grid>

                    <Stack direction="row" justifyContent="end" pt={2}>
                        <ButtonProp
                            label={edit ? 'Editar' : 'Adicionar'}
                            startIcon={edit ? <Edit/> : <Add/>}
                            disabled={isInvalid}
                            onClick={handleSubmit}

                        />
                    </Stack>
                </NewProductDialog>
                <DeleteModalDialog open={openModalDelete} onClose={() => setOpenModalDelete(false)}>
                    <Stack spacing={2}>
                        <Typography> Tem certeza que deseja deletar o produto {toDelete?.name} ?</Typography>
                        <Stack direction="row" justifyContent="flex-end" spacing={1} pt={4}>
                            <ButtonProp onClick={() => setOpenModalDelete(false)} label='Cancelar'/>
                            <ButtonProp color="red" onClick={handleConfirmDelete} label='Deletar'/>
                        </Stack>
                    </Stack>
                </DeleteModalDialog>
            </Box>
        </ThemeProvider>
    );
};

export default Home;