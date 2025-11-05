'use client'

import react, {useState} from 'react'
import dayjs, {Dayjs} from 'dayjs'
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {StyledTableContainer, ContainerSales, DisplayGrid, FlexCenter} from "./style";
import {MobileDatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {ptBR} from 'date-fns/locale';
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
    useMediaQuery
} from "@mui/material";
import {rowsDemo} from "@/app/labels/navbarmodels";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import * as React from "react";
import ButtonProp from "@/app/components/buttons/buttonprop";

type Metric = 'Custo' | 'Faturamento' | 'Lucro'

const data = [
    {name: 'Lucro', value: 12000},
    {name: 'Custo', value: 8000},
    {name: 'Faturamento', value: 20000},
];

const COLORS_BY_NAME: Record<Metric, string> = {
    Custo: '#D96C00',
    Faturamento: '#1BAE90',
    Lucro: '#0C5144',
}

const GREY = '#E4EAED'
const GREY_STROKE = '#D3DADD'

function MetricDonut({active}: { active: Metric }) {
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

const Vendas = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [inicioData, setInicioData] = useState<Date | null>(null)
    const [fimData, setFimData] = useState<Date | null>(null)

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <Box paddingBottom='24px'>
            <DisplayGrid>

                <PieChart width={300} height={300}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((d) => (
                            <Cell key={d.name} fill={COLORS_BY_NAME[d.name as Metric]}/>
                        ))}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
                <ContainerSales>
                    <Typography variant='h6'>Custo</Typography>
                    <FlexCenter>
                        <Box sx={{width: 200, height: 200,}}>
                            <MetricDonut active="Custo"/>
                        </Box>
                    </FlexCenter>
                    <Stack direction='row' justifyContent='center'>
                        <Typography variant='h6'>R$8000,00</Typography>
                    </Stack>
                </ContainerSales>
                <ContainerSales>
                    <Typography variant='h6'>Faturamento</Typography>
                    <FlexCenter>
                        <Box sx={{width: 200, height: 200,}}>
                            <MetricDonut active="Faturamento"/>
                        </Box>
                    </FlexCenter>
                    <Stack direction='row' justifyContent='center'>
                        <Typography variant='h6'>R$20.000,00</Typography>
                    </Stack>
                </ContainerSales>
                <ContainerSales>
                    <Typography variant='h6'>Lucro</Typography>
                    <FlexCenter>
                        <Box sx={{width: 200, height: 200,}}>
                            <MetricDonut active="Lucro"/>
                        </Box>
                    </FlexCenter>
                    <Stack direction='row' justifyContent='center'>
                        <Typography variant='h6'>R$12.000,00</Typography>
                    </Stack>
                </ContainerSales>
            </DisplayGrid>
            <Box>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                    <Stack direction='row' spacing={2} pb={2} alignItems='center' justifyContent='space-between'>
                        <Stack direction='row' spacing={2}>
                        <MobileDatePicker
                            label="Data Início"
                            value={inicioData}
                            onChange={(newValue) => setInicioData(newValue)}
                            sx={{background: 'white'}}
                        />
                        <MobileDatePicker
                            label="Data Fim"
                            value={fimData}
                            onChange={(newValue) => setFimData(newValue)}
                            sx={{background: 'white'}}

                        />
                        </Stack>
                        <ButtonProp label='Filtrar Vendas' width='140px' height='40px'/>
                    </Stack>
                </LocalizationProvider>
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
        </Box>
    )
}

export default Vendas;
