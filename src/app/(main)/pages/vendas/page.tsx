'use client'

import * as React from 'react'
import {useEffect, useMemo, useState} from 'react'
import dayjs from 'dayjs'
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {MobileDatePicker, LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {ptBR} from 'date-fns/locale'
import {
    Box,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useMediaQuery,
} from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import ButtonProp from '@/app/components/buttons/buttonprop'
import {
    StyledTableContainer,
    ContainerSales,
    DisplayGrid,
    FlexCenter,
    Inputs,
    Filter,
    Root,
    ModalProp, QtdProducts
} from './style'
import {api} from '@/app/interceptor/api'
import {deleteSales, getPaymentMethod, getSales} from './service'
import type {IPaymentMethod, ISalesGetResponse} from '@/app/domain/models/dto/ISales'
import {DeleteOutlined as Trash} from '@mui/icons-material';
import toast, {Toaster} from "react-hot-toast";
import {getUnityMeasure} from "@/app/(main)/pages/home/service";

type Metric = 'Custo' | 'Faturamento' | 'Lucro'

const COLORS_BY_NAME: Record<Metric, string> = {
    Custo: '#D96C00',
    Faturamento: '#1BAE90',
    Lucro: '#0C5144',
}
const GREY = '#E4EAED'
const GREY_STROKE = '#D3DADD'



function MetricDonut({value, active}: { value: number; active: Metric }) {
    const data = useMemo(
        () => [
            {name: 'Lucro', value: active === 'Lucro' ? value : 0},
            {name: 'Custo', value: active === 'Custo' ? value : 0},
            {name: 'Faturamento', value: active === 'Faturamento' ? value : 0},
        ],
        [value, active]
    )

    return (
        <Box sx={{width: 200, height: 200}}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius="45%"
                        outerRadius="70%"
                        paddingAngle={4}
                        stroke={GREY_STROKE}
                        strokeWidth={1}
                    >
                        {data.map((d) => (
                            <Cell
                                key={d.name}
                                fill={d.name === active ? COLORS_BY_NAME[active] : GREY}
                                opacity={d.name === active ? 1 : 0.9}
                            />
                        ))}
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </Box>
    )
}
type SaleDetail = ISalesGetResponse['sales'][number];

const currency = (n: number | undefined | null) =>
    (n ?? 0).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

export default function Vendas() {
    const isMobile = useMediaQuery('(max-width:600px)', {noSsr: true})
    const [inicioData, setInicioData] = useState<Date | null>(new Date())
    const [fimData, setFimData] = useState<Date | null>(new Date())
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [salesData, setSalesData] = useState<ISalesGetResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [toDelete, setToDelete] = useState<{ id: number; name: string } | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)


    const [viewSale, setViewSale] = useState<SaleDetail | null>(null);
    const openView = Boolean(viewSale);

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true)
    }
    const handleCloseDeleteModal = () => setOpenDeleteModal(false)

    const fetchSales = async (from: string, to: string) => {
        try {
            setLoading(true)
            setError(null)
            const data = await getSales(api, from, to)
            setSalesData(data)
            setPage(0)
        } catch (e) {
            setError('Falha ao carregar vendas.')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        const from = dayjs().format('YYYY-MM-DD')
        const to = dayjs().format('YYYY-MM-DD')
        fetchSales(from, to)
    }, [])

    const handleConfirmDelete = async () => {
        if (!toDelete) return;
        try {
            await deleteSales(api, toDelete.id);
            const from = inicioData ? dayjs(inicioData).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
            const to = fimData ? dayjs(fimData).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
            toast.success(`Venda ${toDelete.id} deletada com sucesso!`);
            await fetchSales(from, to);

        } catch (e) {
            toast.error('Erro ao excluir a venda.');
        } finally {
            setOpenDeleteModal(false);
            setToDelete(null);
        }
    };

    const handleFilter = () => {
        const from = inicioData ? dayjs(inicioData).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')
        const to = fimData ? dayjs(fimData).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')
        fetchSales(from, to)
    }
    const mainPieData = useMemo(() => {
        const s = salesData?.summary
        return [
            {name: 'Lucro', value: s?.lucro ?? 0},
            {name: 'Custo', value: s?.custo ?? 0},
            {name: 'Faturamento', value: s?.faturado ?? 0},
        ]
    }, [salesData])

    type SaleRow = {
        idVenda: number
        dataVenda: string
        pagamento: string
        totalItens: number
        totalFaturado: number
    }

    const saleRows: SaleRow[] = useMemo(() => {
        if (!salesData?.sales) return []
        return salesData.sales.map((sale) => ({
            idVenda: sale.idVenda,
            dataVenda: dayjs(sale.dataVenda).format('DD/MM/YYYY HH:mm'),
            pagamento: sale.pagamento,
            totalItens: sale.totals?.totalItens ?? sale.items.reduce((acc, it) => acc + it.quantidade, 0),
            totalFaturado: sale.totals?.faturado ?? sale.items.reduce((acc, it) => acc + it.subTotalVenda, 0),
        }))
    }, [salesData])

    const pagedSales = useMemo(
        () => saleRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [saleRows, page, rowsPerPage]
    )
    const summary = salesData?.summary

    const totalItensPeriodo = useMemo(() => {
        if (summary?.totalItens != null) return summary.totalItens;
        if (!salesData?.sales) return 0;
        return salesData.sales.reduce((acc, sale) => {
            const qtd = sale.items.reduce((a, it) => a + it.quantidade, 0);
            return acc + qtd;
        }, 0);
    }, [summary, salesData]);



    const handleOpenView = (id: number) => {
        const sel = salesData?.sales.find(s => s.idVenda === id) ?? null;
        setViewSale(sel);
    };

    const handleCloseView = () => setViewSale(null);



    return (
        <Root>
            <Toaster position='top-center'/>
            <DisplayGrid>
                <PieChart width='100%' height={300}>
                    <Pie
                        data={mainPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {mainPieData.map((d) => (
                            <Cell key={d.name} fill={COLORS_BY_NAME[d.name as Metric]}/>
                        ))}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
                <ContainerSales>
                    <Typography variant="h6">Custo</Typography>
                    <FlexCenter>
                        <Box sx={{width: 200, height: 200}}>
                            <MetricDonut active="Custo" value={summary?.custo ?? 0}/>
                        </Box>
                    </FlexCenter>
                    <Stack direction="row" justifyContent="center">
                        <Typography variant="h6">{currency(summary?.custo)}</Typography>
                    </Stack>
                </ContainerSales>
                <ContainerSales>
                    <Typography variant="h6">Faturamento</Typography>
                    <FlexCenter>
                        <Box sx={{width: 200, height: 200}}>
                            <MetricDonut active="Faturamento" value={summary?.faturado ?? 0}/>
                        </Box>
                    </FlexCenter>
                    <Stack direction="row" justifyContent="center">
                        <Typography variant="h6">{currency(summary?.faturado)}</Typography>
                    </Stack>
                </ContainerSales>
                <ContainerSales>
                    <Typography variant="h6">Lucro</Typography>
                    <FlexCenter>
                        <Box sx={{width: 200, height: 200}}>
                            <MetricDonut active="Lucro" value={summary?.lucro ?? 0}/>
                        </Box>
                    </FlexCenter>
                    <Stack direction="row" justifyContent="center">
                        <Typography variant="h6">{currency(summary?.lucro)}</Typography>
                    </Stack>
                </ContainerSales>
                <ContainerSales>
                    <Typography variant="h6">Quantidade de itens vendidos</Typography>
                    <QtdProducts>
                        <Typography variant='h2' fontWeight='600' color='rgba(0, 0, 0, 0.8)'>{totalItensPeriodo}</Typography>
                    </QtdProducts>
                </ContainerSales>
            </DisplayGrid>
            <Box>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                    <Filter>
                        <Inputs>
                            <MobileDatePicker
                                label="Data Início"
                                value={inicioData}
                                onChange={(v) => setInicioData(v)}
                                sx={{background: 'white'}}
                            />
                            <MobileDatePicker
                                label="Data Fim"
                                value={fimData}
                                onChange={(v) => setFimData(v)}
                                sx={{background: 'white'}}
                            />
                        </Inputs>
                        <ButtonProp label="Filtrar Vendas" width="140px" height="40px" onClick={handleFilter}/>
                    </Filter>
                </LocalizationProvider>
            </Box>
            <Box paddingBottom='24px'/>
            <StyledTableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: '270px'}}>Código Venda</TableCell>
                            <TableCell sx={{width: '300px'}}>Data da Venda</TableCell>
                            <TableCell sx={{width: '200px'}} align="center">
                                Método de Pagamento
                            </TableCell>
                            <TableCell align="center">Quantidade Itens</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center" sx={{width: '100px'}}>
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">Carregando…</TableCell>
                            </TableRow>
                        )}

                        {error && !loading && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">{error}</TableCell>
                            </TableRow>
                        )}

                        {!loading && !error && pagedSales.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">Nenhuma venda encontrada no período.</TableCell>
                            </TableRow>
                        )}

                        {!loading && !error && pagedSales.map((r) => (
                            <TableRow key={r.idVenda} hover>
                                <TableCell data-label="Código Venda:">{r.idVenda}</TableCell>
                                <TableCell data-label="Data da Venda:">{r.dataVenda}</TableCell>
                                <TableCell data-label="Pagamento:" align="center">{r.pagamento}</TableCell>
                                <TableCell data-label="Quantidade Itens:" align="center">{r.totalItens}</TableCell>
                                <TableCell data-label="Total:" align="center">{currency(r.totalFaturado)}</TableCell>
                                <TableCell data-label="Ações" className="cell-actions" align="left">
                                    <Box>
                                        <IconButton
                                            sx={{ color: 'var(--primarycolor)' }}
                                            onClick={() => handleOpenView(r.idVenda)}
                                        >
                                            <VisibilityOutlinedIcon />
                                        </IconButton>
                                        <IconButton sx={{color: 'var(--primarycolor)'}} onClick={() => {
                                            setToDelete({id: r.idVenda, name: r.dataVenda});
                                            setOpenDeleteModal(true);
                                        }}>
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
                    count={saleRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, p) => setPage(p)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10))
                        setPage(0)
                    }}
                    labelRowsPerPage="Itens por página"
                />
            </StyledTableContainer>
            <ModalProp open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <Stack spacing={2}>
                    <Typography> Tem certeza que deseja deletar a venda de número: {toDelete?.id} ?</Typography>
                    <Stack direction="row" justifyContent="flex-end" spacing={1} pt={4}>
                        <ButtonProp onClick={handleCloseDeleteModal} label='Cancelar'/>
                        <ButtonProp color="red" onClick={handleConfirmDelete} label='Deletar'/>
                    </Stack>
                </Stack>
            </ModalProp>
            <ModalProp open={openView} onClose={handleCloseView}>
                {viewSale && (
                    <Stack spacing={2}>
                        <Typography variant="h6">
                            Venda #{viewSale.idVenda}
                        </Typography>

                        <Stack spacing={0.5}>
                            <Typography variant="body2">
                                <strong>Data:</strong> {dayjs(viewSale.dataVenda).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Método de pagamento:</strong> {viewSale.pagamento}
                            </Typography>
                        </Stack>

                        {/* Itens da venda */}
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produto</TableCell>
                                    <TableCell align="center">Qtd</TableCell>
                                    <TableCell align="right">Preço Unit.</TableCell>
                                    <TableCell align="right">Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {viewSale.items.map(it => (
                                    <TableRow key={it.idItemVenda}>
                                        <TableCell>{it.nomeProduto}</TableCell>
                                        <TableCell align="center">{it.quantidade}</TableCell>
                                        <TableCell align="right">
                                            {currency(it.precoUnitario)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {currency(it.subTotalVenda)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Stack direction="row" spacing={4}>
                            <Stack>
                                <Typography variant="body2"><strong>Total de Itens:</strong> {viewSale.totals.totalItens}</Typography>
                                <Typography variant="body2"><strong>Faturado:</strong> {currency(viewSale.totals.faturado)}</Typography>
                                <Typography variant="body2"><strong>Custo:</strong> {currency(viewSale.totals.custo)}</Typography>
                                <Typography variant="body2"><strong>Lucro:</strong> {currency(viewSale.totals.lucro)}</Typography>
                            </Stack>
                        </Stack>

                        <Stack direction="row" justifyContent="flex-end" pt={2}>
                            <ButtonProp label="Fechar" onClick={handleCloseView} />
                        </Stack>
                    </Stack>
                )}
            </ModalProp>

        </Root>
    )
}
