'use client';
import React, { createContext, useContext, useMemo, useRef, useState } from 'react';

export type CartItem = { id: number; name: string; price: number; qty: number; subtitle?: string };

type CartCtx = {
    items: CartItem[];
    count: number;
    add: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
    remove: (id: number) => void;
    clear: () => void;
    inc: (id: number) => void;
    dec: (id: number) => void;
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cartIconRef: React.RefObject<HTMLButtonElement | null>;
};

const Ctx = createContext<CartCtx | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const cartIconRef = useRef<HTMLButtonElement | null>(null);

    const add = (item: Omit<CartItem, 'qty'>, qty = 1) => {
        setItems(prev => {
            const i = prev.findIndex(p => p.id === item.id);
            if (i >= 0) {
                const copy = [...prev];
                copy[i] = { ...copy[i], qty: copy[i].qty + qty };
                return copy;
            }
            return [...prev, { ...item, qty }];
        });
    };
    const remove = (id: number) => setItems(prev => prev.filter(p => p.id !== id));
    const clear = () => setItems([]);

    const count = items.reduce((s, p) => s + p.qty, 0);

    const inc = (id: number) =>
        setItems(prev => prev.map(p => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));

    const dec = (id: number) =>
        setItems(prev =>
            prev
                .map(p => (p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))
        );

    const value = useMemo(
        () => ({ items, count, add, remove, clear, inc, dec, drawerOpen, setDrawerOpen, cartIconRef }),
        [items, count, drawerOpen]
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useCart = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error('useCart deve ser usado dentro do CartProvider');
    return v;
};
