'use client'

import * as React from 'react'
import {IMaskInput} from 'react-imask';
import {forwardRef} from 'react';
import { TextField, TextFieldProps } from "@mui/material";

type MaskProps = {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PhoneMask = forwardRef<HTMLInputElement, MaskProps>(function PhoneMask(
    {name, onChange, ...rest}, ref
) {
    return (
        <IMaskInput
            {...rest}
            inputRef={ref}
            mask={[
                {mask: '(00) 0000-0000'},
                {mask: '(00) 0 0000-0000'},
            ]}
            dispatch={(appended, masked) => {
                const digits = (masked.unmaskedValue + appended).replace(/\D/g, '');
                return masked.compiledMasks[digits.length > 10 ? 1 : 0];
            }}
            overwrite
            onAccept={(value) => onChange({target: {name, value}} as never)}
        />
    );
})

export const CpfCnpjMask = forwardRef<HTMLInputElement, MaskProps>(function CpfCnpjMask(
    { name, onChange, ...rest }, ref
) {
    return (
        <IMaskInput
            {...rest}
            inputRef={ref}
            mask={[
                { mask: '000.000.000-00' },
                { mask: '00.000.000/0000-00' },
            ]}
            dispatch={(appended, masked) => {
                const digits = (masked.unmaskedValue + appended).replace(/\D/g, '');
                return masked.compiledMasks[digits.length > 11 ? 1 : 0];
            }}
            onAccept={(value) => onChange({ target: { name, value } } as any)}
        />
    );
});

export const CepMask = forwardRef<HTMLInputElement, MaskProps>(function CepMask(
    { name, onChange, ...rest }, ref
) {
    return (
        <IMaskInput
            {...rest}
            inputRef={ref}
            mask="00000-000"
            onAccept={(value) => onChange({ target: { name, value } } as any)}
        />
    );
});

export const RgIeMask = forwardRef<HTMLInputElement, MaskProps>(function RgIeMask(
    { name, onChange, ...rest }, ref
) {
    return (
        <IMaskInput
            {...rest}
            inputRef={ref}
            mask={[
                { mask: '00.000.000-0'  },
                { mask: '00.000.000-00' },
                { mask: '000.000.000.000' },
            ]}

            dispatch={(appended, masked) => {
                const digits = (masked.unmaskedValue + appended).replace(/\D/g, '');
                if (digits.length <= 9) return masked.compiledMasks[0];
                if (digits.length === 10) return masked.compiledMasks[1];
                return masked.compiledMasks[2];
            }}
            onAccept={(value) =>
                onChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>)
            }
        />
    );
});

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export function validateCPF(raw: string): boolean {
    if (!raw) return false;

    const cpf = raw.replace(/\D/g, '');

    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const calcDV = (base: string, factorStart: number) => {
        let sum = 0;
        for (let i = 0; i < base.length; i++) {
            sum += parseInt(base[i], 10) * (factorStart - i);
        }
        const rest = (sum * 10) % 11;
        return rest === 10 ? 0 : rest;
    };

    const dv1 = calcDV(cpf.slice(0, 9), 10);
    if (dv1 !== parseInt(cpf[9], 10)) return false;

    const dv2 = calcDV(cpf.slice(0, 10), 11);
    if (dv2 !== parseInt(cpf[10], 10)) return false;

    return true;
}

export function validateEmail(email: string): boolean {
    return EMAIL_PATTERN.test(email || '');
}


type MoneyMaskProps = Omit<TextFieldProps, 'value' | 'onChange' | 'type'> & {
    valueCents?: number;
    onChangeCents?: (next: number) => void;
    locale?: 'pt-BR';
    currency?: 'BRL';
    showSymbol?: boolean;
    label?: string;
};
