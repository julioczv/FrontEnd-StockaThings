// CartIcon.tsx
'use client';
import React, {useEffect, useMemo, useState} from 'react';
import {
    Badge, Drawer, IconButton, List, Box, Typography, styled, Stack, TextField, MenuItem, Autocomplete, CircularProgress
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AddIcon from "@mui/icons-material/Add";
import Close from '@mui/icons-material/Close';
import ButtonProp from "@/app/components/buttons/buttonprop";
import { api } from '@/app/interceptor/api';
import {createSale, getPaymentMethod} from '@/app/(main)/pages/vendas/service';
import toast from 'react-hot-toast';
import {useCart} from "@/app/cart/CartProvider";
import type {IPaymentMethod} from "@/app/domain/models/dto/ISales";


interface ICartProps {
    tipoDoPagamento: IPaymentMethod[];
}

const ModalRight = styled(Drawer)`
    .MuiPaper-root {
        border-radius: 24px 0 0 24px;
        width: 600px;
        overflow-y: hidden;
        @media (max-width: 799px) {
            width: 100dvw;
            border-radius: 0;

        }
    }
`;

const InputQty = styled(TextField)`
    width: 40px;

    .MuiInputBase-root {
        border: none;

        &::before, &::after {
            display: none;
        }
    }

    .MuiOutlinedInput-root {
        border: none;

        fieldset {
            border: none;
        }
    }

    & input::-webkit-outer-spin-button,
    & input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    & input[type=number] {
        -moz-appearance: textfield;
    }

    .MuiInputBase-input {
        padding: 0 !important;
        text-align: center;
        height: auto;
    }
`;

export const Scroll = styled(Box)`
    height: 80dvh;
    overflow-y: auto;
`;

export const ShoppingCard = styled(Stack)`
    justify-content: space-between;
    align-items: center;
    padding: 40px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const FooterModal = styled(Box)`
    padding: 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
`;



export const CartIcon: React.FC<ICartProps> = ({tipoDoPagamento}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { items, totalQty, totalVenda, add, remove, setQty, clear } = useCart();
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<IPaymentMethod | null>(null);
    const [payId, setPayId] = useState<number | null>(null);


    const incr = (id: number) => {
        const it = items.find(i => i.idProduto === id);
        if (it) setQty(id, it.qtd + 1);
    };
    const dec = (id: number) => {
        const it = items.find(i => i.idProduto === id);
        if (it) setQty(id, Math.max(0, it.qtd - 1));
    };

    const handleLaunchSale = async () => {
        if (items.length === 0) {
            toast.error('Carrinho vazio.');
            return;
        }
        if (!payId) {
            toast.error('Selecione o método de pagamento.');
            return;
        }
        try {
            const payload = {
                tipoPagamentoId: payId,
                items: items.map(i => ({ idProduto: i.idProduto, qtd: i.qtd })),
            };
            const resp = await createSale(api, payload);
            toast.success(`Venda #${resp.idVenda} lançada!`);
            clear();
            setDrawerOpen(false);
        } catch (e: any) {
            toast.error(e?.response?.data?.message ?? 'Erro ao lançar venda.');
        }
    };

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setPaymentLoading(true);
                const data = await getPaymentMethod(api);
                if (alive) setPaymentMethods(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Erro ao buscar métodos de pagamento:', err);
            } finally {
                if (alive) setPaymentLoading(false);
            }
        })();
        return () => { alive = false; };
    }, []);

    useEffect(() => {
        setPayId(selectedPayment?.idTipoPagamento ?? null);
    }, [selectedPayment]);

    useEffect(() => {
        console.log('paymentMethods state:', paymentMethods);
    }, [paymentMethods]);
    return (
        <>
            <IconButton onClick={() => setDrawerOpen(true)}>
                <Badge color="primary" badgeContent={totalQty}>
                    <AddShoppingCartIcon sx={{ color: 'var(--primarycolor)' }} fontSize="large" />
                </Badge>
            </IconButton>

            <ModalRight anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
                        sx={{ zIndex: (theme) => theme.zIndex.modal + 10 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" p={3}>
                    <Typography variant="h5" fontWeight={700}>Carrinho</Typography>
                    <IconButton onClick={() => setDrawerOpen(false)}><Close/></IconButton>
                </Stack>

                <Scroll>
                    <Box padding='0 24px'>
                        {items.map(it => (
                            <ShoppingCard key={it.idProduto} direction='row'>
                                <Box>
                                    <Typography fontWeight={500} variant='body1'>{it.nomeProduto}</Typography>
                                    <Typography variant='body2'>R$ {it.precoVenda.toFixed(2)}</Typography>
                                    <Typography variant='body2' pt={1}>{it.descricao}</Typography>
                                </Box>
                                <Box>
                                    <Stack direction='row' alignItems='center' spacing={1}>
                                        <Stack direction='row' alignItems='center'>
                                            <IconButton onClick={() => dec(it.idProduto)}><HorizontalRuleIcon/></IconButton>
                                            <InputQty
                                                type="number"
                                                value={it.qtd}
                                                onChange={(e) => setQty(it.idProduto, Math.max(0, Number(e.target.value) || 0))}
                                            />
                                            <IconButton onClick={() => incr(it.idProduto)}>
                                                <AddIcon/>
                                            </IconButton>
                                        </Stack>
                                        <Box>
                                            <Typography fontWeight={600}>R$ {(it.qtd * it.precoVenda).toFixed(2)}</Typography>
                                        </Box>
                                        <IconButton>
                                            <DeleteOutline sx={{color: 'red'}}/>
                                        </IconButton>
                                    </Stack>
                                </Box>
                            </ShoppingCard>
                        ))}
                    </Box>
                </Scroll>

                <FooterModal>
                    <Stack direction='row' justifyContent="space-between" alignItems="center" pb={2}>
                        <Typography fontWeight={500} variant='h5'>Total</Typography>
                        <Typography variant='h6'>R$ {totalVenda.toFixed(2)}</Typography>
                    </Stack>

                    <Autocomplete<IPaymentMethod>
                        options={paymentMethods}
                        value={selectedPayment}
                        onChange={(_, v) => setSelectedPayment(v)}
                        loading={paymentLoading}
                        getOptionLabel={(opt) => opt?.tipoPagamento ?? ''}
                        isOptionEqualToValue={(opt, val) => opt.idTipoPagamento === val?.idTipoPagamento}
                        disablePortal
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Método de Pagamento"
                                placeholder="Selecione..."
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {paymentLoading ? <CircularProgress size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                        noOptionsText={paymentLoading ? 'Carregando…' : 'Nenhuma opção'}
                    />

                    <Stack direction='row' spacing={2} justifyContent='end' pt={2}>
                        <ButtonProp label='Limpar Carrinho' color='red' onClick={clear}/>
                        <ButtonProp label='Lançar Venda' startIcon={<AddIcon/>} onClick={handleLaunchSale}/>
                    </Stack>
                </FooterModal>
            </ModalRight>
        </>
    );
};