import { Box, Button, Link, TextField } from "@mui/material"
import styled from "styled-components"
import ButtonProp from "@/app/components/buttons/buttonprop";

export const InputLogin = styled(TextField)`
    fieldset {
        border: none;
        border-bottom: 1px solid var(--primarycolor) !important;
        border-radius: 0;
    }
`

export const LettersStyles = styled(Link)`
    font-weight: 500;
    color: var(--primarycolor);

    &:hover {
        cursor: pointer
    }
`

export const LoginArea = styled(Box)`
    background: white;
    height: 700px;
    width: 500px;
    padding: 24px;
    flex-direction: column;
    display: flex;
    gap: 24px;
    justify-content: center;
    border-radius: 0 16px 16px 0;
    @media(max-width: 1300px){
        width: 300px;
    }
    @media(max-width: 900px){
        height: 100dvh;
        width: 100dvw;
    }
`

export const ResponsiveButton = styled(Button)`
    width: 400px;
    background: var(--primarycolor);
    border-radius: 16px;
    color: white;
    text-transform: none;
    @media(max-width: 1300px){
        width: 250px;
       
    }
    @media(max-width: 900px){
        width: 350px;

    }

    @media(max-width: 400px){
        width: 200px;

    }
    &:disabled {
        background: rgba(0, 0, 0, 0.3);
    }

`