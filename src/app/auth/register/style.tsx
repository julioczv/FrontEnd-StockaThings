import {Box, Link, styled, TextField, Typography } from "@mui/material"

export const InputRegister = styled(TextField)`
   
`

export const RegisterArea = styled(Box)`
    background: #FFFFFF;
    height: 700px;
    width: 1000px;
    padding: 24px;
    border-radius: 16px;
`

export const Title = styled(Typography)`
   color: var(--primarycolor);
    padding-top: 24px;
`

export const LettersStyles = styled(Link)`
    font-weight: 500;
    color: var(--primarycolor);

    &:hover {
        cursor: pointer
    }
`