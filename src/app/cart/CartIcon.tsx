// CartIcon.tsx
'use client';
import React, {useState} from 'react';
import {
    Badge, Drawer, IconButton, List, Box, Typography, styled, Stack, TextField,
    Button
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Remove from '@mui/icons-material/Remove';
import Add from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AddIcon from "@mui/icons-material/Add";
import ButtonProp from "@/app/components/buttons/buttonprop";

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

const ItemRow = styled('div')`
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #F1F5F9;
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


export const CartIcon: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [qty, setQty] = useState(1);

    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue < 1 || isNaN(newValue)) {
            setQty(0);
        } else {
            setQty(newValue);
        }
    };

    const incr = () => {
        setQty(prev => prev + 1);
    }

    const dec = () => {
        if (qty == 0) {
            return 0
        } else {
            setQty(prev => prev - 1);
        }
    }


    return (
        <>
            <IconButton onClick={() => setDrawerOpen(true)}>
                <Badge color="primary">
                    <AddShoppingCartIcon sx={{color: 'var(--primarycolor)'}} fontSize="large"/>
                </Badge>
            </IconButton>

            <ModalRight
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{zIndex: (theme) => theme.zIndex.modal + 10}}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" p={3}>
                    <Typography variant="h5" fontWeight={700}>Carrinho</Typography>
                    <IconButton onClick={() => setDrawerOpen(false)}><Close/></IconButton>
                </Stack>
                <Scroll>
                    <Box padding='0 24px'>
                        <ShoppingCard direction='row'>
                            <Box>
                                <Typography fontWeight={500} variant='body1'>Cerveja Heineken Longnek
                                    330ml </Typography>
                                <Typography variant='body2'>Descriçãozinha de cria</Typography>
                            </Box>
                            <Box>
                                <Stack direction='row' alignItems='center' spacing={1}>
                                    <Stack direction='row' alignItems='center'>
                                        <IconButton onClick={dec}>
                                            <HorizontalRuleIcon/>
                                        </IconButton>
                                        <InputQty
                                            type="number"
                                            value={qty}
                                            onChange={handleQtyChange}
                                        />
                                        <IconButton onClick={incr}>
                                            <AddIcon/>
                                        </IconButton>
                                    </Stack>
                                    <Box>
                                        <Typography fontWeight={600}>R$ 4.99</Typography>
                                    </Box>
                                    <IconButton>
                                        <DeleteOutline sx={{color: 'red'}}/>
                                    </IconButton>
                                </Stack>
                            </Box>
                        </ShoppingCard>
                    </Box>

                </Scroll>
                <FooterModal>
                    <Stack direction='row' justifyContent="space-between">
                        <Typography fontWeight={500} variant='h5'>Total</Typography>
                        <Typography variant='h6'>R$ 900.00</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2} justifyContent='end' pt={4}>
                        <ButtonProp label='Limpar Carrinho' color='red' startIcon={<DeleteOutline/>}/>
                        <ButtonProp label='Lançar Venda' startIcon={<AddIcon/>}/>
                    </Stack>
                </FooterModal>
            </ModalRight>
        </>
    );
};
