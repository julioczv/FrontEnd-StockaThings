export default function NoLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
        <body>{children}</body>
        </html>
    );
}