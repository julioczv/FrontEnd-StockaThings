'use client'

import React, {useState} from 'react'
import axios from 'axios'
import {Box, Stack, Alert, useMediaQuery} from "@mui/material";
import '../../(no-layout)/globals.css'
import ButtonProp from "@/app/components/buttons/buttonprop";
import {validateEmail} from "@/app/utils/Masks";
import {useRouter} from 'next/navigation';
import {LoginService} from './service';
import {Toaster, toast} from "react-hot-toast";
import {api} from "@/app/interceptor/api";
import {ILogin} from "@/app/domain/models/dto/ILogin";
import {InputLogin, LettersStyles, LoginArea, ResponsiveButton} from "./style";


const Login = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const isMobile = useMediaQuery('(max-width:900px)', {noSsr: true});
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();


    const limparEstados = () => {
        setLogin('')
        setSenha('')
    }


    const efetuarLogin = async () => {
        const payload: ILogin = {login, senha}

        setIsLoading(true)
        setErr(null)

        try {
            const {token} = await LoginService(api, payload)
            localStorage.setItem('token', token)
            toast.success('Bem-vindo!')
            router.push('/pages/home')
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status
                if (status === 403) {
                    toast.error('Login ou senha inválidos')
                    limparEstados()
                } else if (status === 500) {
                    toast.error('Erro interno no servidor')
                    limparEstados()
                }
            } else {
                toast.error('Falha ao conectar. Tente novamente.')
            }
        } finally {
            setIsLoading(false)
        }
    }


    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextEmail = event.target.value ?? ''; //Garante que o value começa vazio ou da erro
        setLogin(nextEmail);

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
        if (login.length > 0) {
            const isValid = validateEmail(login);
            setEmailError(!isValid);
            setEmailHelperText(!isValid ? 'Por favor, insira um e-mail válido.' : '');
        }
    };


    return (
        <>
            <Toaster position='top-center'/>
            <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <Box sx={{display: 'flex'}}>
                    {!isMobile && (
                        <img src="/images/screenlogin.png" alt="imagem do login" width="800px" height="700px"
                             style={{borderRadius: '16px 0 0 16px'}}/>
                    )}
                    <LoginArea>
                        <Stack direction='row' justifyContent='center'>
                            <img src="/images/Logo.png" alt="" width='200px'/>
                        </Stack>
                        <InputLogin
                            label="E-mail"
                            type='email'
                            value={login}
                            required
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            error={emailError}
                            helperText={emailHelperText}
                            fullWidth
                        />
                        <InputLogin
                            label='Senha'
                            value={senha}
                            type='password'
                            onChange={(e) => setSenha(e.target.value)}
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
                            <Stack direction='row' justifyContent='center'>
                                <ResponsiveButton onClick={() => efetuarLogin()}
                                          type='submit'
                                            disabled={emailError || login.trim() === '' || senha.trim() === ''}
                                >{isLoading ? 'Entrando...' : 'Entrar'}</ResponsiveButton>
                            </Stack>
                        </Stack>
                    </LoginArea>
                </Box>
            </Box>
        </>

    );
}

export default Login