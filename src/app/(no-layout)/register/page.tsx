'use client'

import React, {useMemo, useState} from 'react'
import {
    Box, Stack, IconButton, InputAdornment, CircularProgress, Typography, Button,
    Grid
} from '@mui/material'
import {Search, Visibility, VisibilityOff} from '@mui/icons-material'
import consultaCep from 'cep-promise'
import {InputRegister, RegisterArea, Title} from './style'
import {CepMask, CnpjMask, validateEmail, validateCNPJ, onlyDigits} from '@/app/utils/Masks'
import ButtonProp from "@/app/components/buttons/buttonprop";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/

type FormState = {
    login: string
    senha: string
    confirmarSenha: string
    nome: string
    cnpj: string
    nomeSocial: string
    telefone: string
    cep: string
    endereco: string
    numEndereco: string
    bairro: string
    cidade: string
    estado: string
}

type Errors = Partial<Record<keyof FormState | 'geral', string>>

export default function Register() {
    const [form, setForm] = useState<FormState>({
        login: '',
        senha: '',
        confirmarSenha: '',
        nome: '',
        cnpj: '',
        nomeSocial: '',
        telefone: '',
        cep: '',
        endereco: '',
        numEndereco: '',
        bairro: '',
        cidade: '',
        estado: '',
    })

    const [errors, setErrors] = useState<Errors>({})
    const [loadingCep, setLoadingCep] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const setField = (name: keyof FormState, value: string) => {
        setForm(prev => ({...prev, [name]: value}))
        setErrors(prev => ({...prev, [name]: undefined, geral: undefined}))
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const {name, value} = e.target as { name: keyof FormState; value: string }
        if (!name) return
        setField(name, value)

        if (name === 'login') {
            setErrors(prev => ({...prev, login: value && !validateEmail(value) ? 'E-mail inválido' : undefined}))
        }
        if (name === 'cnpj') {
            const digits = onlyDigits(value)
            setErrors(prev => ({
                ...prev,
                cnpj: digits.length > 0 && digits.length < 14 ? 'CNPJ incompleto' : undefined
            }))
        }
        if (name === 'senha') validatePassword(value)
        if (name === 'confirmarSenha') validateConfirm(form.senha, value)
    }

    const validatePassword = (value: string) => {
        const ok = passwordRegex.test(value)
        setErrors(prev => ({...prev, senha: ok ? undefined : 'Mín. 8, 1 maiúscula, 1 número e 1 caractere especial.'}))
        return ok
    }

    const validateConfirm = (pass: string, confirm: string) => {
        const ok = confirm.length > 0 && pass === confirm
        setErrors(prev => ({...prev, confirmarSenha: ok ? undefined : 'As senhas não coincidem.'}))
        return ok
    }

    const handleBlurCep = async () => {
        const digits = onlyDigits(form.cep)
        if (digits.length !== 8) {
            setErrors(prev => ({...prev, cep: 'CEP incompleto'}))
            return
        }
        try {
            setLoadingCep(true)
            const data = await consultaCep(digits)
            setForm(prev => ({
                ...prev,
                cep: data.cep,
                endereco: data.street || prev.endereco,
                bairro: data.neighborhood || prev.bairro,
                cidade: data.city || prev.cidade,
                estado: data.state || prev.estado,
            }))
            setErrors(prev => ({...prev, cep: undefined}))
        } catch {
            setErrors(prev => ({...prev, cep: 'CEP não encontrado'}))
        } finally {
            setLoadingCep(false)
        }
    }

    const emailOk = form.login.length > 0 && validateEmail(form.login)
    const cnpjOk = form.cnpj.length > 0 && validateCNPJ(form.cnpj)
    const senhaOk = passwordRegex.test(form.senha)
    const confirmOk = form.confirmarSenha.length > 0 && form.senha === form.confirmarSenha

    const obrigatoriosOk =
        !!form.login && !!form.senha && !!form.nome &&
        !!form.endereco && !!form.numEndereco && !!form.bairro &&
        !!form.cidade && !!form.estado && !!form.cep

    const isFormValid = useMemo(
        () => emailOk && cnpjOk && senhaOk && confirmOk && obrigatoriosOk,
        [emailOk, cnpjOk, senhaOk, confirmOk, obrigatoriosOk]
    )

    const handleSubmit = () => {
        if (!validateCNPJ(form.cnpj)) {
            setErrors(prev => ({...prev, cnpj: 'CNPJ inválido'}))
            return
        }
        if (!validatePassword(form.senha) || !validateConfirm(form.senha, form.confirmarSenha)) return
        if (!validateEmail(form.login)) {
            setErrors(prev => ({...prev, login: 'E-mail inválido'}))
            return
        }
        if (!obrigatoriosOk) {
            setErrors(prev => ({...prev, geral: 'Preencha todos os campos obrigatórios (*)'}))
            return
        }
    }

    return (
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            {/*   <Box sx={{display: 'flex'}}>
                <RegisterArea>
                    <Stack direction="row" justifyContent="center" mb={1}>
                        <img src="/images/Logo.png" alt="" width="200"/>
                    </Stack>
                    <Typography variant='h6' color='var(--primarycolor)'>Empresa</Typography>
                    <Grid container spacing={2}>
                        <Grid size={{xl: 4}}>
                            <InputRegister
                                label="CNPJ"
                                name="cnpj"
                                value={form.cnpj}
                                onChange={handleChange}
                                error={!!errors.cnpj}
                                helperText={errors.cnpj ?? ''}
                                fullWidth
                                slotProps={{input: {inputComponent: CnpjMask}}}
                            />
                        </Grid>
                        <Grid size={{xl: 4}}>
                            <InputRegister
                                label="Nome Empresa"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{xl: 4}}>

                            <InputRegister
                                label="Nome Fantasia"
                                name="nomeSocial"
                                value={form.nomeSocial}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Typography variant='h6' color='var(--primarycolor)'>Endereço</Typography>
                    <Grid container spacing={2}>
                        <Grid size={{xl: 4}}>
                            <InputRegister
                                label="CEP"
                                name="cep"
                                value={form.cep}
                                onChange={handleChange}
                                onBlur={handleBlurCep}
                                error={!!errors.cep}
                                helperText={errors.cep ?? ''}
                                fullWidth
                                slotProps={{
                                    input: {
                                        inputComponent: CepMask,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={handleBlurCep} disabled={loadingCep}>
                                                    {loadingCep ? <CircularProgress size={20}/> : <Search/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>
                        <Grid size={{xl: 6}}>
                            <InputRegister
                                label="Endereço"
                                name="endereco"
                                value={form.endereco}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{xl: 2}}>
                            <InputRegister
                                label="Número"
                                name="numEndereco"
                                fullWidth
                                value={form.numEndereco}
                                onChange={handleChange}
                                sx={{flex: 1}}
                            />
                        </Grid>
                        <Grid size={{xl: 5}}>
                            <InputRegister
                                label="Bairro"
                                name="bairro"
                                fullWidth
                                value={form.bairro}
                                onChange={handleChange}
                                sx={{flex: 2}}
                            />
                        </Grid>
                        <Grid size={{xl: 5}}>
                            <InputRegister
                                label="Cidade"
                                name="cidade"
                                fullWidth
                                value={form.cidade}
                                onChange={handleChange}
                                sx={{flex: 2}}
                            />
                        </Grid>
                        <Grid size={{xl: 2}}>
                            <InputRegister
                                label="UF"
                                name="estado"
                                fullWidth
                                value={form.estado}
                                onChange={handleChange}
                                inputProps={{maxLength: 2}}
                                sx={{flex: 1}}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant='h6' color='var(--primarycolor)'>Email</Typography>
                    <Grid container spacing={2}>
                        <Grid size={{xl: 4}}>

                            <InputRegister
                                label="E-mail"
                                name="login"
                                value={form.login}
                                onChange={handleChange}
                                onBlur={(e) =>
                                    setErrors(prev => ({
                                        ...prev,
                                        login: e.target.value && !validateEmail(e.target.value) ? 'E-mail inválido' : undefined
                                    }))
                                }
                                error={!!errors.login}
                                helperText={errors.login ?? ''}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{xl: 4}}>
                            <InputRegister
                                label="Senha"
                                name="senha"
                                type={showPassword ? 'text' : 'password'}
                                value={form.senha}
                                onChange={handleChange}
                                onBlur={(e) => validatePassword(e.target.value)}
                                error={!!errors.senha}
                                helperText={errors.senha ?? ''}
                                fullWidth
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(s => !s)} edge="end"
                                                            aria-label="Mostrar/Ocultar senha">
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                        </Grid>
                        <Grid size={{xl: 4}}>
                            <InputRegister
                                label="Confirme a Senha"
                                name="confirmarSenha"
                                type={showConfirm ? 'text' : 'password'}
                                value={form.confirmarSenha}
                                onChange={handleChange}
                                onBlur={(e) => validateConfirm(form.senha, e.target.value)}
                                error={!!errors.confirmarSenha}
                                helperText={errors.confirmarSenha ?? ''}
                                fullWidth
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowConfirm(s => !s)} edge="end"
                                                            aria-label="Mostrar/Ocultar confirmação">
                                                    {showConfirm ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),

                                    }
                                }}
                            />
                        </Grid>
                    </Grid>


                    {errors.geral && (
                        <Typography variant="body2" color="error" sx={{mt: -1}}>
                            {errors.geral}
                        </Typography>
                    )}

                    <Stack direction="row" justifyContent="center" pt={1.5}>
                        <Button
                            variant="contained"
                            disabled={!isFormValid}
                            onClick={handleSubmit}
                            sx={{width: 300, borderRadius: 2}}
                        >
                            Registrar
                        </Button>
                    </Stack>
                </RegisterArea>
            </Box>*/}
            <RegisterArea>

                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <img src="/images/Logotipo.png" alt="" width="40"/>
                </Box>
                <Box sx={{display: 'flex', paddingTop: '24px'}}>
                    <Box sx={{flex: 1}}>
                        <Title variant='h6'>Empresa</Title>
                        <Grid container spacing={2}>
                            <Grid size={{xl: 12}}>
                                <InputRegister
                                    label="CNPJ"
                                    name="cnpj"
                                    value={form.cnpj}
                                    onChange={handleChange}
                                    error={!!errors.cnpj}
                                    helperText={errors.cnpj ?? ''}
                                    fullWidth
                                    slotProps={{input: {inputComponent: CnpjMask}}}
                                />
                            </Grid>
                            <Grid size={{xl: 12}}>
                                <InputRegister
                                    label="Nome Empresa"
                                    name="nome"
                                    value={form.nome}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{xl: 12}}>

                                <InputRegister
                                    label="Nome Fantasia"
                                    name="nomeSocial"
                                    value={form.nomeSocial}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Title variant='h6'>Endereço</Title>
                        <Grid container spacing={1}>
                            <Grid size={{xl: 8}}>
                                <InputRegister
                                    label="CEP"
                                    name="cep"
                                    value={form.cep}
                                    onChange={handleChange}
                                    onBlur={handleBlurCep}
                                    error={!!errors.cep}
                                    helperText={errors.cep ?? ''}
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            inputComponent: CepMask,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" onClick={handleBlurCep}
                                                                disabled={loadingCep}>
                                                        {loadingCep ? <CircularProgress size={20}/> : <Search/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{xl: 4}}>
                                <InputRegister
                                    label="Número"
                                    name="numEndereco"
                                    fullWidth
                                    value={form.numEndereco}
                                    onChange={handleChange}
                                    sx={{flex: 1}}
                                />
                            </Grid>
                            <Grid size={{xl: 6}}>
                                <InputRegister
                                    label="Endereço"
                                    name="endereco"
                                    value={form.endereco}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{xl: 6}}>
                                <InputRegister
                                    label="Bairro"
                                    name="bairro"
                                    fullWidth
                                    value={form.bairro}
                                    onChange={handleChange}
                                    sx={{flex: 2}}
                                />
                            </Grid>
                            <Grid size={{xl: 10}}>
                                <InputRegister
                                    label="Cidade"
                                    name="cidade"
                                    fullWidth
                                    value={form.cidade}
                                    onChange={handleChange}
                                    sx={{flex: 2}}
                                />
                            </Grid>
                            <Grid size={{xl: 2}}>
                                <InputRegister
                                    label="UF"
                                    name="estado"
                                    fullWidth
                                    value={form.estado}
                                    onChange={handleChange}
                                    inputProps={{maxLength: 2}}
                                    sx={{flex: 1}}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{flex: 1, paddingLeft: '24px', display: 'flex', alignItems: 'center'}}>
                        <Grid container spacing={1}>
                        <Title variant='h6'>Email</Title>
                            <Grid size={{ xl: 12 }}>
                                <InputRegister
                                    label="E-mail"
                                    name="login"
                                    value={form.login}
                                    onChange={handleChange}
                                    onBlur={(e) =>
                                        setErrors(prev => ({
                                            ...prev,
                                            login: e.target.value && !validateEmail(e.target.value) ? 'E-mail inválido' : undefined
                                        }))
                                    }
                                    error={!!errors.login}
                                    helperText={errors.login ?? ''}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{ xl: 12 }}>
                                <InputRegister
                                    label="Senha"
                                    name="senha"
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.senha}
                                    onChange={handleChange}
                                    onBlur={(e) => validatePassword(e.target.value)}
                                    error={!!errors.senha}
                                    helperText={errors.senha ?? ''}
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(s => !s)} edge="end"
                                                                aria-label="Mostrar/Ocultar senha">
                                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xl: 12 }}>
                                <InputRegister
                                    label="Confirme a Senha"
                                    name="confirmarSenha"
                                    type={showConfirm ? 'text' : 'password'}
                                    value={form.confirmarSenha}
                                    onChange={handleChange}
                                    onBlur={(e) => validateConfirm(form.senha, e.target.value)}
                                    error={!!errors.confirmarSenha}
                                    helperText={errors.confirmarSenha ?? ''}
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowConfirm(s => !s)} edge="end"
                                                                aria-label="Mostrar/Ocultar confirmação">
                                                        {showConfirm ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),

                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{paddingTop: '36px', display: 'flex', justifyContent: 'center'}}>
                    <ButtonProp label='Registrar' width='240px'/>
                </Box>
            </RegisterArea>
        </Box>
    )
}
