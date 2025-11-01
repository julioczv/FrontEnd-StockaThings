'use client'

import React, { useMemo, useState } from 'react'
import {
    Box,
    Stack,
    IconButton,
    InputAdornment,
    CircularProgress,
    TextField,
    Typography,
    Button
} from '@mui/material'
import { Search, Visibility, VisibilityOff } from '@mui/icons-material'
import consultaCep from 'cep-promise'

// Se você JÁ tem esses estilos, mantenha:
import { InputRegister, RegisterArea } from './style'

// Caso não tenha, descomente e use as linhas abaixo no lugar do import acima:
// import { styled } from '@mui/material/styles'
// const InputRegister = styled(TextField)`
//   fieldset { border: none; border-bottom: 1px solid var(--primarycolor) !important; border-radius: 0; }
// `
// const RegisterArea = styled(Box)`
//   background: #fff; height: auto; width: 520px; padding: 24px; display: flex; gap: 16px; flex-direction: column; border-radius: 12px;
// `

import { CepMask, CnpjMask, validateEmail, validateCNPJ, onlyDigits } from '@/app/utils/Masks'

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/

type FormState = {
    razaoSocial: string
    nomeFantasia: string
    cnpj: string
    email: string
    telefone: string
    cep: string
    endereco: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    senha: string
    confirmarSenha: string
}

export default function Register() {
    const [form, setForm] = useState<FormState>({
        razaoSocial: '',
        nomeFantasia: '',
        cnpj: '',
        email: '',
        telefone: '',
        cep: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        senha: '',
        confirmarSenha: '',
    })

    const [loadingCep, setLoadingCep] = useState(false)
    const [errors, setErrors] = useState<Record<keyof FormState | 'geral', string | undefined>>({} as any)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    // ---------- handlers ----------
    const setField = (name: keyof FormState, value: string) => {
        setForm(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, [name]: undefined, geral: undefined }))
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target as { name: keyof FormState; value: string }
        if (!name) return
        setField(name, value)

        if (name === 'email') {
            setErrors(prev => ({ ...prev, email: value && !validateEmail(value) ? 'E-mail inválido' : undefined }))
        }
        if (name === 'cnpj') {
            const digits = onlyDigits(value)
            if (digits.length > 0 && digits.length < 14) {
                setErrors(prev => ({ ...prev, cnpj: 'CNPJ incompleto' }))
            } else {
                setErrors(prev => ({ ...prev, cnpj: undefined }))
            }
        }
        if (name === 'senha') validatePassword(value)
        if (name === 'confirmarSenha') validateConfirm(form.senha, value)
    }

    const validatePassword = (value: string) => {
        const ok = passwordRegex.test(value)
        setErrors(prev => ({ ...prev, senha: ok ? undefined : 'Mín. 8, 1 maiúscula, 1 número e 1 caractere especial.' }))
        return ok
    }

    const validateConfirm = (pass: string, confirm: string) => {
        const ok = confirm.length > 0 && pass === confirm
        setErrors(prev => ({ ...prev, confirmarSenha: ok ? undefined : 'As senhas não coincidem.' }))
        return ok
    }

    const handleBlurCep = async () => {
        const digits = onlyDigits(form.cep)
        if (digits.length !== 8) {
            setErrors(prev => ({ ...prev, cep: 'CEP incompleto' }))
            return
        }
        try {
            setLoadingCep(true)
            const data = await consultaCep(digits)
            setForm(prev => ({
                ...prev,
                cep: data.cep, // já vem 00000-000
                endereco: data.street || prev.endereco,
                bairro: data.neighborhood || prev.bairro,
                cidade: data.city || prev.cidade,
                uf: data.state || prev.uf,
            }))
            setErrors(prev => ({ ...prev, cep: undefined }))
        } catch (err) {
            setErrors(prev => ({ ...prev, cep: 'CEP não encontrado' }))
        } finally {
            setLoadingCep(false)
        }
    }

    // ---------- validações globais ----------
    const emailOk = form.email.length > 0 && validateEmail(form.email)
    const cnpjOk = form.cnpj.length === 0 ? false : validateCNPJ(form.cnpj)
    const senhaOk = passwordRegex.test(form.senha)
    const confirmOk = form.confirmarSenha.length > 0 && form.senha === form.confirmarSenha

    const obrigatoriosOk =
        !!form.razaoSocial &&
        !!form.nomeFantasia &&
        !!form.endereco &&
        !!form.numero &&
        !!form.bairro &&
        !!form.cidade &&
        !!form.uf &&
        !!form.cep

    const isFormValid = useMemo(
        () => emailOk && cnpjOk && senhaOk && confirmOk && obrigatoriosOk,
        [emailOk, cnpjOk, senhaOk, confirmOk, obrigatoriosOk]
    )

    const handleSubmit = () => {
        // validações finais
        if (!validateCNPJ(form.cnpj)) {
            setErrors(prev => ({ ...prev, cnpj: 'CNPJ inválido' }))
            return
        }
        if (!validatePassword(form.senha) || !validateConfirm(form.senha, form.confirmarSenha)) return
        if (!validateEmail(form.email)) {
            setErrors(prev => ({ ...prev, email: 'E-mail inválido' }))
            return
        }
        if (!obrigatoriosOk) {
            setErrors(prev => ({ ...prev, geral: 'Preencha todos os campos obrigatórios (*)' }))
            return
        }

        // aqui você envia pro backend
        console.log('payload:', form)
        alert('Cadastro válido! (veja o console para o payload)')
    }

    return (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Box sx={{ display: 'flex' }}>
                <RegisterArea>
                    <Stack direction="row" justifyContent="center" mb={1}>
                        <img src="/images/Logo.png" alt="" width="200" />
                    </Stack>

                    {/* Empresa */}
                    <InputRegister
                        label="Razão Social *"
                        name="razaoSocial"
                        value={form.razaoSocial}
                        onChange={handleChange}
                        fullWidth
                    />
                    <InputRegister
                        label="Nome Fantasia *"
                        name="nomeFantasia"
                        value={form.nomeFantasia}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* CNPJ */}
                    <InputRegister
                        label="CNPJ *"
                        name="cnpj"
                        value={form.cnpj}
                        onChange={handleChange}
                        error={!!errors.cnpj}
                        helperText={errors.cnpj ?? ''}
                        fullWidth
                        slotProps={{ input: { inputComponent: CnpjMask } }}
                    />

                    {/* E-mail */}
                    <InputRegister
                        label="E-mail *"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={(e) => setErrors(prev => ({ ...prev, email: e.target.value && !validateEmail(e.target.value) ? 'E-mail inválido' : undefined }))}
                        error={!!errors.email}
                        helperText={errors.email ?? ''}
                        fullWidth
                    />

                    {/* CEP */}
                    <InputRegister
                        label="CEP *"
                        name="cep"
                        value={form.cep}
                        onChange={handleChange}
                        onBlur={handleBlurCep}
                        error={!!errors.cep}
                        helperText={errors.cep ?? ''}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={handleBlurCep} disabled={loadingCep}>
                                        {loadingCep ? <CircularProgress size={20} /> : <Search />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        slotProps={{ input: { inputComponent: CepMask } }}
                    />

                    {/* Endereço preenchido pelo CEP (permite editar) */}
                    <InputRegister
                        label="Endereço *"
                        name="endereco"
                        value={form.endereco}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Stack direction="row" gap={2}>
                        <InputRegister
                            label="Número *"
                            name="numero"
                            value={form.numero}
                            onChange={handleChange}
                            sx={{ flex: 1 }}
                        />
                        <InputRegister
                            label="Bairro *"
                            name="bairro"
                            value={form.bairro}
                            onChange={handleChange}
                            sx={{ flex: 2 }}
                        />
                    </Stack>

                    <Stack direction="row" gap={2}>
                        <InputRegister
                            label="Cidade *"
                            name="cidade"
                            value={form.cidade}
                            onChange={handleChange}
                            sx={{ flex: 2 }}
                        />
                        <InputRegister
                            label="UF *"
                            name="uf"
                            value={form.uf}
                            onChange={handleChange}
                            inputProps={{ maxLength: 2 }}
                            sx={{ flex: 1 }}
                        />
                    </Stack>

                    {/* Senha */}
                    <InputRegister
                        label="Senha *"
                        name="senha"
                        type={showPassword ? 'text' : 'password'}
                        value={form.senha}
                        onChange={handleChange}
                        onBlur={(e) => validatePassword(e.target.value)}
                        error={!!errors.senha}
                        helperText={errors.senha ?? ''}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(s => !s)} edge="end" aria-label="Mostrar/Ocultar senha">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <InputRegister
                        label="Confirme a Senha *"
                        name="confirmarSenha"
                        type={showConfirm ? 'text' : 'password'}
                        value={form.confirmarSenha}
                        onChange={handleChange}
                        onBlur={(e) => validateConfirm(form.senha, e.target.value)}
                        error={!!errors.confirmarSenha}
                        helperText={errors.confirmarSenha ?? ''}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirm(s => !s)} edge="end" aria-label="Mostrar/Ocultar confirmação">
                                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {errors.geral && (
                        <Typography variant="body2" color="error" sx={{ mt: -1 }}>
                            {errors.geral}
                        </Typography>
                    )}

                    <Stack direction="row" justifyContent="center" pt={1.5}>
                        <Button
                            variant="contained"
                            disabled={!isFormValid}
                            onClick={handleSubmit}
                            sx={{ width: 300, borderRadius: 2 }}
                        >
                            Registrar
                        </Button>
                    </Stack>
                </RegisterArea>
            </Box>
        </Box>
    )
}
