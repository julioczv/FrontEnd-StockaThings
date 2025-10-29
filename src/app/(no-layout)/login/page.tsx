'use client'

import React from 'react'
import {Box, Stack, TextField, Typography} from "@mui/material";
import '../globals.css'
import ButtonProp from "@/app/components/buttons/buttonprop";


const Login = () => {
    return (


        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <Box sx={{display: 'flex'}}>
                <img src="/images/screenlogin.png" alt="imagem do login" width="800px" height="700px"/>
                <Box sx={{
                    background: 'white',
                    height: '700px',
                    width: '500px',
                    padding: '24px',
                    flexDirection: 'column',
                    display: 'flex',
                    gap: '24px',
                    justifyContent: 'center',

                }}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <img src="/images/Logo.png" alt="" width='200px'/>
                    </Box>
                    <TextField
                        label='Email'
                    />
                    <TextField
                        label='Senha'
                    />
                    <Box sx={{display: 'flex', justifyContent: 'end', color: 'var(--primarycolor)',}}>
                        <Typography sx={{fontWeight: '500', textDecoration: 'underline'}}>Esqueceu a senha
                            ?</Typography>
                    </Box>
                    <Stack direction='row' justifyContent='center' pt={2}>
                        <ButtonProp label="Entrar" width='60%'/>
                    </Stack>
                </Box>
            </Box>
        </Box>

    );
}

export default Login