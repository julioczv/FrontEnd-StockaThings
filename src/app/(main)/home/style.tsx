import styled from "styled-components";
import {AppBar, Box, Button, Container, Dialog, Drawer, TableContainer} from "@mui/material";

export const StyledTableContainer = styled(TableContainer)`
    background: #fff;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: block;
    overflow-y: auto;
    max-height: 80dvh;

    table {
        width: 100%;
        border-collapse: collapse;
    }

    .MuiTableHead-root .MuiTableCell-root {
        font-weight: 700;
        color: #fff;
        background: var(--primary-100);
        border-bottom: 1px solid rgba(2, 6, 23, .08);
    }

    .MuiTableBody-root .MuiTableCell-root {
        padding: 12px;
        
    }

    .MuiToolbar-root {
        background: white;
    }

    @media (max-width: 800px) {
        padding-right: 6px;
        background: transparent;
        border: none;

        thead {
            position: absolute;
            left: -10000px;
            top: -10000px;
            height: 1px;
            width: 1px;
            overflow: hidden;
        }

        tbody {
            display: grid;
            gap: 12px;
            padding: 0 12px 12px;
            width: 100%;
        }


        .MuiTableBody-root .MuiTableRow-root {
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 12px;
            overflow: hidden;
            background: white;
        }

        .MuiTableBody-root .MuiTableCell-root {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            padding: 12px 16px;
            font-size: 0.95rem;
            border: none;
        }

        .MuiTableBody-root .MuiTableCell-root::before {
            content: attr(data-label);
            font-weight: 600;
            color: #374151;
        }

        .MuiToolbar-root {
            background: white;
        }

        .cell-actions {
            grid-template-columns: 1fr;
            display: flex !important;
            align-items: center;
            gap: 8px;
            justify-content: flex-start;
            border-bottom: 0;
            padding: 12px 16px 16px;
        }
    }

    .MuiIconButton-root {
        padding: 4px;
    }
`;

export const BoxInput = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .MuiOutlinedInput-root {
        width: 400px;
    }

    @media (max-width: 900px) {
        .MuiOutlinedInput-root {
            width: 100%;
            max-width: 480px;
        }
    }

    @media (max-width: 800px) {
        padding-left: 9px;
    }
    @media (max-width: 600px) {
        .MuiOutlinedInput-root {
            width: 100%;
        }
    }
`;

export const Bold = styled("span")` font-weight: 700; `;

export const AddProduct = styled(Button)`
    background: var(--primarycolor);
    color: white;
    border-radius: 32px;
`

export const NewProductDialog = styled(Dialog)`
    .MuiPaper-root {
        background: white;
        width: 800px;
        border-radius: 16px;
        padding: 24px;
    }
`;

export const DrawerSales = styled(Drawer)`
    .MuiPaper-root { border-radius: 12px 0 0 12px; width: 420px; }
    @media (max-width: 600px) {
        .MuiPaper-root { width: 100%; border-radius: 0; }
    }
`;
