import styled from "styled-components";
import { AppBar, Box, Container, Drawer, TableContainer } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)`
    background: #fff;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    overflow-x: auto;
    max-height: 75dvh;

    @media (max-width: 768px) {
        height: 75dvh;
        overflow-y: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    .MuiTableHead-root .MuiTableCell-root {
        font-weight: 700;
        color: #fff;
        background: var(--primary-100);
        border-bottom: 1px solid rgba(2, 6, 23, 0.08);
    }

    .MuiTableBody-root .MuiTableCell-root {
        padding: 12px;
    }

    .MuiToolbar-root {
        background: white;
        @media(max-width: 768px){
            overflow-x: hidden;
            width: 100%;
        }
    }


    @media (max-width: 900px) {
        .MuiTableCell-root {
            padding: 10px;
            font-size: 0.9rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 200px;
        }
    }
    
    @media (max-width: 600px) {
        th:nth-child(3),
        th:nth-child(4),
        td:nth-child(3),
        td:nth-child(4) {
            display: none;
        }
        .MuiTableCell-root {
            padding: 8px;
            font-size: 0.85rem;
            max-width: 140px;
        }
    }
`;

export const HeaderBar = styled(AppBar)`
    grid-area: header;
    position: sticky !important;
    top: 0;
    box-shadow: none;
    background: var(--secondarycolor);
    color: inherit;
    z-index: 1200;
`;

export const HeaderInner = styled(Container)`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 12px;
    padding: 0;
    
    @media (max-width: 900px) {
        gap: 10px;
    }
    
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        row-gap: 8px;
        justify-items: stretch;
    }
`;

export const BoxInput = styled(Box)`
    .MuiOutlinedInput-root {
        width: 400px;
        @media (max-width: 600px) {
            width: 250px;
        }
    }
`;

export const Bold = styled("span")`
    font-weight: 700;
`;

export const DrawerSales = styled(Drawer)`
    .MuiPaper-root {
        border-radius: 12px 0 0 12px;
        width: 420px;
    }

    /* ↓ mobile: drawer ocupa a tela toda */
    @media (max-width: 600px) {
        .MuiPaper-root {
            width: 100%;
            border-radius: 0;
        }
    }
`;
