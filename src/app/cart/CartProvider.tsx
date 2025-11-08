'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

export type CartItem = {
    idProduto: number;
    nomeProduto: string;
    descricao: string
    precoVenda: number;
    precoCusto: number;
    qtd: number;
};

type CartCtx = {
    items: CartItem[];
    add: (item: Omit<CartItem, 'qtd'>, qtd?: number) => void;
    remove: (idProduto: number) => void;
    setQty: (idProduto: number, qtd: number) => void;
    clear: () => void;
    totalQty: number;
    totalVenda: number;
};

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const add: CartCtx['add'] = (item, qtd = 1) => {
        setItems(prev => {
            const ix = prev.findIndex(p => p.idProduto === item.idProduto);
            if (ix >= 0) {
                const next = [...prev];
                next[ix] = { ...next[ix], qtd: next[ix].qtd + qtd };
                return next;
            }
            return [...prev, { ...item, qtd }];
        });
    };

    const remove = (idProduto: number) => {
        setItems(prev => prev.filter(p => p.idProduto !== idProduto));
    };

    const setQty = (idProduto: number, qtd: number) => {
        setItems(prev => prev.map(p => p.idProduto === idProduto ? { ...p, qtd: Math.max(0, qtd) } : p)
            .filter(p => p.qtd > 0));
    };

    const clear = () => setItems([]);

    const totalQty = useMemo(() => items.reduce((a, i) => a + i.qtd, 0), [items]);
    const totalVenda = useMemo(() => items.reduce((a, i) => a + i.qtd * i.precoVenda, 0), [items]);

    const value: CartCtx = { items, add, remove, setQty, clear, totalQty, totalVenda };
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useCart = () => {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
    return ctx;
};
