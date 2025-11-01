'use client'
import React, { forwardRef } from 'react'
import type { InputBaseComponentProps } from '@mui/material/InputBase'


export const onlyDigits = (v: string) => (v || '').replace(/\D/g, '')


export const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)


export const validateCNPJ = (cnpjMaskedOrDigits: string) => {
    const cnpj = onlyDigits(cnpjMaskedOrDigits)
    if (cnpj.length !== 14) return false
    if (/^(\d)\1{13}$/.test(cnpj)) return false

    const calc = (base: string, factor: number[]) =>
        (base.split('').reduce((acc, n, i) => acc + parseInt(n, 10) * factor[i], 0) % 11)

    const b1 = cnpj.slice(0, 12)
    const f1 = [5,4,3,2,9,8,7,6,5,4,3,2]
    const d1 = calc(b1, f1)
    const dv1 = d1 < 2 ? 0 : 11 - d1

    const b2 = cnpj.slice(0, 12) + String(dv1)
    const f2 = [6,5,4,3,2,9,8,7,6,5,4,3,2]
    const d2 = calc(b2, f2)
    const dv2 = d2 < 2 ? 0 : 11 - d2

    return cnpj.endsWith(String(dv1) + String(dv2))
}

export const CepMask = forwardRef<HTMLInputElement, InputBaseComponentProps>(
    function CepMask(props, ref) {
        const { onChange, value, name, ...other } = props

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const digits = onlyDigits(e.target.value).slice(0, 8)
            const masked = digits.replace(/(\d{5})(\d{0,3})/, (_, a: string, b: string) => (b ? `${a}-${b}` : a))
            onChange?.({
                ...e,
                target: { ...e.target, name, value: masked },
            } as unknown as React.ChangeEvent<HTMLInputElement>)
        }

        return (
            <input
                {...other}
                ref={ref}
                value={typeof value === 'string' || typeof value === 'number' ? String(value) : ''}
                onChange={handleChange}
                inputMode="numeric"
                autoComplete="postal-code"
                pattern=".*"
            />
        )
    }
)

export const CnpjMask = forwardRef<HTMLInputElement, InputBaseComponentProps>(
    function CnpjMask(props, ref) {
        const { onChange, value, name, ...other } = props

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const digits = onlyDigits(e.target.value).slice(0, 14)
            // 00.000.000/0000-00
            const masked = digits
                .replace(/^(\d{2})(\d)/, '$1.$2')
                .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                .replace(/\.(\d{3})(\d)/, '.$1/$2')
                .replace(/(\d{4})(\d)/, '$1-$2')

            onChange?.({
                ...e,
                target: { ...e.target, name, value: masked },
            } as unknown as React.ChangeEvent<HTMLInputElement>)
        }

        return (
            <input
                {...other}
                ref={ref}
                value={typeof value === 'string' || typeof value === 'number' ? String(value) : ''}
                onChange={handleChange}
                inputMode="numeric"
                autoComplete="on"
                pattern=".*"
            />
        )
    }
)
