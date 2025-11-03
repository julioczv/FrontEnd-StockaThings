'use client';

import * as React from 'react';
import Button from '@mui/material/Button';

type ButtonProps = {
    label: string;
    width?: number | string;
    height?: number | string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit';
    color?: string;
    startIcon?: React.ReactNode;
};

const ButtonProp: React.FC<ButtonProps> = ({ label, width = 'auto', onClick, disabled, startIcon, height, color, type='button' }) => {

    const customBg = color
        ? {
            bgcolor: color,
            color: '#fff',
        }
        : {
            bgcolor: 'var(--primarycolor)'
        };


    return (
        <Button
            variant="contained"
            disableElevation
            onClick={onClick}
            disabled={disabled}
            type={type}
            startIcon={startIcon}
            sx={{
                width,
                height,
                minWidth: 0,
                textTransform: 'none',
                borderRadius: 5,
                px: 2,
                ...customBg
            }}
        >
            {label}
        </Button>
    );
};

export default ButtonProp;
