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

export const ContainerSales = styled(Box)`
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    background: white;
    width: 100%;
    height: 300px;
    padding: 16px;
`
export const DisplayGrid = styled(Box)`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding-bottom: 24px;
    gap: 16px;
`

export const FlexCenter = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
`