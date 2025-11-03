'use client'

import React, {useState} from 'react'
import {Box, Stack, styled, TextField, Link, Alert} from "@mui/material";
import '../globals.css'
import ButtonProp from "@/app/components/buttons/buttonprop";
import {validateEmail} from "@/app/utils/Masks";
import {useRouter, useSearchParams} from 'next/navigation';


const InputLogin = styled(TextField)`
    fieldset {
        border: none;
        border-bottom: 1px solid var(--primarycolor) !important;
        border-radius: 0;
    }
`

const LettersStyles = styled(Link)`
    font-weight: 500;
    color: var(--primarycolor);

    &:hover {
        cursor: pointer
    }
`

const LoginArea = styled(Box)`
    background: white;
    height: 700px;
    width: 500px;
    padding: 24px;
    flex-direction: column;
    display: flex;
    gap: 24px;
    justify-content: center;
    border-radius: 0 16px 16px 0;
`

const Login = () => {
    const router = useRouter();
    const params = useSearchParams();
    const redirectTo = params.get('from') || '/home';
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);



    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextEmail = event.target.value;
        setEmail(nextEmail);

        if (nextEmail.length > 0) {
            const isValid = validateEmail(nextEmail);
            if (isValid) {
                setEmailError(false);
                setEmailHelperText('');
            } else {
                setEmailError(true);
                setEmailHelperText('Formato de e-mail inválido.');
            }
        } else {
            setEmailError(false);
            setEmailHelperText('');
        }
    };
    const handleEmailBlur = () => {
        if (email.length > 0) {
            const isValid = validateEmail(email);
            setEmailError(!isValid);
            setEmailHelperText(!isValid ? 'Por favor, insira um e-mail válido.' : '');
        }
    };

    return (


        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <Box sx={{display: 'flex'}}>
                <img src="/images/screenlogin.png" alt="imagem do login" width="800px" height="700px"
                     style={{borderRadius: '16px 0 0 16px'}}/>
                <LoginArea>
                    <Box component='form' onSubmit={onSubmit}>
                        <Stack direction='row' justifyContent='center'>
                            <img src="/images/Logo.png" alt="" width='200px'/>
                        </Stack>
                        <InputLogin
                            label="E-mail"
                            value={email}
                            type='email'
                            required
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            error={emailError}
                            helperText={emailHelperText}
                            fullWidth
                        />
                        <InputLogin
                            label='Senha'
                            type='password'
                            required
                        />
                        {err && <Alert severity='error'>{err}</Alert>}
                        <Box sx={{display: 'flex', justifyContent: 'end'}}>
                            <LettersStyles>Esqueceu a senha ?</LettersStyles>
                        </Box>
                        <Stack direction='column' justifyContent='center' pt={2} alignItems='center' spacing={2}>
                            <Box>
                                <LettersStyles href='./register' pb={2}>Não tem uma conta ? Crie uma
                                    agora</LettersStyles>
                            </Box>
                            <Box>
                                <ButtonProp label="Entrar" width='300px' type='submit'/>
                            </Box>
                        </Stack>
                    </Box>
                </LoginArea>
            </Box>
        </Box>

    );
}

export default Login