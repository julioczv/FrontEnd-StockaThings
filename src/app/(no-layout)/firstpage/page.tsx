'use client';

import React from 'react';
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Toolbar,
    Typography,
    ThemeProvider,
    createTheme,
    Stack,
    Divider,
} from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {CTAButton, FeatureCard, Features, Footer, Header, Hero, IconBubble, PriceCard, Pricing, Ribbon } from './style';


const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0C5144',
            light: '#1FA287',
            dark: '#083B32',
        },
        secondary: {
            main: '#147865',
        },
        background: {
            default: '#F9FAFB',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#374151',
        },
    },
    shape: {borderRadius: 12},
    typography: {
        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        fontWeightBold: 700,
    },
});



export default function LandingStockaThings() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>

            {/* Header */}
            <Header position="sticky" elevation={0}>
                <Toolbar sx={{py: 1}}>
                    <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <img src="images/Logotipo.png" width={35} height={35} alt=""/>

                        <Stack direction="row" spacing={3} sx={{display: {xs: 'none', md: 'flex'}}}>
                            <Button color="inherit" href="#features">Funcionalidades</Button>
                            <Button color="inherit" href="#pricing">Planos</Button>
                            <Button color="inherit" href="#contact">Contato</Button>
                        </Stack>

                        <CTAButton variant="contained" color="primary" href='/auth/login'>
                            Logue na Sua Conta
                        </CTAButton>
                    </Container>
                </Toolbar>
            </Header>

            <main>
                <Hero>
                    <Container maxWidth="lg">
                        <Typography variant="h2" fontWeight={800} gutterBottom
                                    sx={{fontSize: {xs: 36, md: 56}, color: '#111827'}}>
                            Gerencie seu estoque de forma <Box component="span"
                                                               sx={{color: '#1FA287'}}>inteligente</Box>
                        </Typography>

                        <Typography sx={{maxWidth: 840, mx: 'auto', mb: 3}} variant="h6" color="text.primary">
                            Simplifique o controle do seu negócio com a Stocka Things. A ferramenta completa para gestão
                            de estoque, vendas, finanças e muito mais.
                        </Typography>

                        <CTAButton href="#pricing" size="large" variant="contained"
                                   sx={{bgcolor: '#1FA287', '&:hover': {bgcolor: '#147865'}}}>
                            Ver Planos
                        </CTAButton>
                    </Container>
                </Hero>
                <Features id="features">
                    <Container maxWidth="lg">
                        <Box textAlign="center" mb={6}>
                            <Typography variant="h4" fontWeight={800} gutterBottom color="black">
                                Principais funcionalidades
                            </Typography>
                            <Typography color="text.secondary" sx={{maxWidth: 720, mx: 'auto'}}>
                                Com recursos pensados para o dia a dia da sua loja, nosso sistema vai além do básico.
                            </Typography>
                        </Box>

                        <Box sx={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', width: '100%', display: 'grid', gap: '16px'}}>
                            <FeatureCard variant='outlined'>
                                <IconBubble>
                                    <Inventory2OutlinedIcon fontSize="large"/>
                                </IconBubble>
                                <Typography variant='h6' fontWeight={600} gutterBottom color='black'>Controle de estoque</Typography>
                                <Typography color="text.secondary">Cadastre produtos de sua preferência para organiza-los melhor !</Typography>
                            </FeatureCard>
                            <FeatureCard variant='outlined'>
                                <IconBubble>
                                    <ShoppingCartOutlinedIcon fontSize="large"/>
                                </IconBubble>
                                <Typography variant='h6' fontWeight={600} gutterBottom color='black'>Vendas</Typography>
                                <Typography color="text.secondary">Registre vendas de qualquer tipo, controle formas de pagamento e tenha acesso ao histórico sempre que precisar. Rápido, simples e organizado.</Typography>
                            </FeatureCard>
                            <FeatureCard variant='outlined'>
                                <IconBubble>
                                    <BuildOutlinedIcon fontSize="large"/>
                                </IconBubble>
                                <Typography variant='h6' fontWeight={600} gutterBottom color='black'>Suporte 24 / 7</Typography>
                                <Typography color="text.secondary">Crie chamados para a equipe de T.i e receba ajuda em minutos</Typography>
                            </FeatureCard>
                            <FeatureCard variant='outlined'>
                                <IconBubble>
                                    <ReceiptLongOutlinedIcon fontSize="large"/>
                                </IconBubble>
                                <Typography variant='h6' fontWeight={600} gutterBottom color='black'>Relatórios</Typography>
                                <Typography color="text.secondary">Acompanhe faturamentos, vendas, lucros tudo atualizado na hora !</Typography>
                            </FeatureCard>
                            <FeatureCard variant='outlined'>
                                <IconBubble>
                                    <PaymentsOutlinedIcon fontSize="large"/>
                                </IconBubble>
                                <Typography variant='h6' fontWeight={600} gutterBottom color='black'>Financeiro</Typography>
                                <Typography color="text.secondary">Saiba exatamente quanto a sua loja está faturando. Painel simples e acessível de qualquer lugar.</Typography>
                            </FeatureCard>
                            <FeatureCard variant='outlined'>
                                <IconBubble>
                                    <DescriptionOutlinedIcon fontSize="large"/>
                                </IconBubble>
                                <Typography variant='h6' fontWeight={600} gutterBottom color='black'>Documentos Profissionais</Typography>
                                <Typography color="text.secondary">Emita recibos, garantias, termos de compra e outros documentos profissionais direto do sistema.</Typography>
                            </FeatureCard>
                        </Box>
                    </Container>
                </Features>
                <Pricing id="pricing">
                    <Container maxWidth="lg">
                        <Box textAlign="center" mb={6}>
                            <Typography variant="h4" sx={{color: '#1FA287', fontWeight: 700}}>
                                Preço
                            </Typography>
                            <Typography variant="h4" fontWeight={800} color="black" mt={1}>
                                Tudo o que sua loja precisa por um preço justo
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="center">
                            <PriceCard elevation={6}>
                                <Ribbon>Teste por 7 dias!</Ribbon>

                                <Typography variant="h5" fontWeight={800} color="black" mb={1}>
                                    Starter
                                </Typography>

                                <Box display="flex" alignItems="baseline" mb={2}>
                                    <Typography variant="h3" fontWeight={800} color="black">
                                        R$ 49,90
                                    </Typography>
                                    <Typography ml={1} color="text.secondary">
                                        / Por mês
                                    </Typography>
                                </Box>

                                <Stack spacing={1.2} mb={3}>
                                    {[
                                        'Ordens de serviço ilimitadas',
                                        'Vendas ilimitadas',
                                        'Usuários ilimitados',
                                        'Relatórios (Single Analytics)',
                                        'Dados para tráfego pago',
                                        'Suporte rápido e humanizado',
                                    ].map((t, i) => (
                                        <Box key={i} display="flex" alignItems="center" gap={1}>
                                            <CheckCircleRoundedIcon sx={{color: '#1FA287'}}/>
                                            <Typography color="black">{t}</Typography>
                                        </Box>
                                    ))}
                                </Stack>

                                <CTAButton fullWidth variant="contained"
                                           sx={{bgcolor: '#3B82F6', '&:hover': {bgcolor: '#2563EB'}}}>
                                    Quero conhecer!
                                </CTAButton>
                            </PriceCard>
                        </Box>
                    </Container>
                </Pricing>
            </main>
            <Footer id="contact">
                <Container maxWidth="md">
                    <Typography variant="h4" fontWeight={800} mb={1}>
                        Pronto para começar?
                    </Typography>
                    <Typography sx={{maxWidth: 680, mx: 'auto', mb: 3}}>
                        Junte-se a centenas de lojistas que já estão otimizando sua gestão com a Stocka Things.
                    </Typography>

                    <CTAButton variant="contained" href='/auth/register'
                               sx={{bgcolor: '#fff', color: '#0C5144', '&:hover': {bgcolor: '#E5E7EB'}}}>
                        Crie sua conta
                    </CTAButton>

                    <Divider sx={{my: 4, borderColor: 'rgba(255,255,255,0.22)'}}/>
                    <Typography variant="body2" sx={{color: 'rgba(255,255,255,0.8)'}}>
                        © {new Date().getFullYear()} Stocka Things. Todos os direitos reservados.
                    </Typography>
                </Container>
            </Footer>
        </ThemeProvider>
    );
}
