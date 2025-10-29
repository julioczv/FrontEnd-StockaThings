// IMPORTS — use estes
import {
    // topo
    HomeOutlined,
    PeopleOutlined,
    ReceiptLongOutlined,
    LocalShippingOutlined,
    Inventory2Outlined,
    PrecisionManufacturingOutlined,
    ReceiptOutlined,
    SettingsOutlined,
    GroupsOutlined,
    AssessmentOutlined,

    // financeiros
    TodayOutlined,
    RequestQuoteOutlined,
    PaymentOutlined,
    PaidOutlined,
    DoneAllOutlined,
    TrendingUpOutlined,
    TrendingDownOutlined,
    QrCode2Outlined,
    InsightsOutlined,
    DescriptionOutlined,
    AssignmentReturnOutlined,
    PercentOutlined,
    WaterfallChartOutlined,
    CreditCardOutlined,
    CancelOutlined,
    DonutSmallOutlined,
    DonutLargeOutlined,
    CompareArrowsOutlined,
    SummarizeOutlined,

    // produtos
    MoveToInboxOutlined,
    FileUploadOutlined,
    FactCheckOutlined,
    WarehouseOutlined,
    CalculateOutlined,

    // produção
    EngineeringOutlined,
    ShoppingCartOutlined,

    // fiscal
    RequestPageOutlined,
    KeyboardReturnOutlined,
    HandshakeOutlined,
    VolunteerActivismOutlined,
    ArticleOutlined,
    ListAltOutlined,

    // RH
    BadgeOutlined,
    AttachMoneyOutlined,
    AccountBalanceOutlined,

    // configuração
    BusinessOutlined,
    CategoryOutlined,
    ClassOutlined,
    AdminPanelSettingsOutlined,
    PersonAddOutlined,
    RuleOutlined,
    PersonSearchOutlined,
    TuneOutlined,

    // relatórios (grupos raiz)

    InsertChartOutlined,
    ShoppingBagOutlined,
    PrecisionManufacturingOutlined as PrecisionManufacturingOutlined2,
    Groups2Outlined,
    BusinessCenterOutlined,
    AccountBalanceWalletOutlined,
} from '@mui/icons-material';



// TIPOS
type NavLeaf  = { key: string; label: string; icon: React.ReactNode; href: string };
type NavGroup = { key: string; label: string; icon: React.ReactNode; children: NavItem[] };
type NavItem  = NavLeaf | NavGroup;

// NAV — cole no lugar do seu const NAV
export const NAV: NavItem[] = [
    { key: 'home',     label: 'Página inicial',        icon: <HomeOutlined/>,          href: '/home' },
    { key: 'clientes', label: 'Cadastro de clientes',  icon: <PeopleOutlined/>,        href: '/clientes' },
    { key: 'despesas', label: 'Lançar despesas',       icon: <ReceiptLongOutlined/>,   href: '/despesas' },
    { key: 'forn',     label: 'Fornecedor/Transporte', icon: <LocalShippingOutlined/>, href: '/fornecedores' },

    // ===================== FINANCEIRO =====================
    {
        key: 'fin',
        label: 'Financeiro',
        icon: <AssessmentOutlined/>, // pasta/área
        children: [
            { key: 'fin-mov',     label: 'Movimento diário',            icon: <TodayOutlined/>,            href: '/movimento-diario' },
            { key: 'fin-rec',     label: 'Contas à receber',            icon: <RequestQuoteOutlined/>,     href: '/contas-receber' },
            { key: 'fin-pag',     label: 'Contas à pagar',              icon: <PaymentOutlined/>,          href: '/contas-pagar' },
            { key: 'fin-receb',   label: 'Contas recebidas',            icon: <PaidOutlined/>,             href: '/contas-recebidas' },
            { key: 'fin-pagas',   label: 'Contas pagas',                icon: <DoneAllOutlined/>,          href: '/contas-pagas' },
            { key: 'fin-ent-no',  label: 'Entradas não operacionais',   icon: <TrendingUpOutlined/>,       href: '/entradas-nao-operacionais' },
            { key: 'fin-sai-no',  label: 'Saídas não operacionais',     icon: <TrendingDownOutlined/>,     href: '/saidas-nao-operacionais' },
            { key: 'fin-boleto',  label: 'Gerar remessa boleto',        icon: <QrCode2Outlined/>,          href: '/remessa-boleto' },
            { key: 'fin-ctrl',    label: 'Controle financeiro',         icon: <InsightsOutlined/>,         href: '/controle-financeiro' },
            { key: 'fin-extrato', label: 'Extrato conta',               icon: <DescriptionOutlined/>,      href: '/extrato-conta' },
            { key: 'fin-retbol',  label: 'Retorno remessa boleto',      icon: <AssignmentReturnOutlined/>, href: '/retorno-remessa-boleto' },
            { key: 'fin-comiss',  label: 'Comissões',                   icon: <PercentOutlined/>,          href: '/comissoes' },

            {
                key: 'fin-rel',
                label: 'Relatórios',
                icon: <InsertChartOutlined/>, // grupo de relatórios
                children: [
                    { key: 'rel-fin-mov',      label: 'Movimento Diário',            icon: <SummarizeOutlined/>,       href: '/relatorios/financeiro/movimento-diario' },
                    { key: 'rel-fin-saldo',    label: 'Saldo Caixa',                 icon: <AccountBalanceOutlined/>,  href: '/relatorios/financeiro/saldo-caixa' },
                    { key: 'rel-fin-fluxo',    label: 'Fluxo de Caixa',              icon: <WaterfallChartOutlined/>,  href: '/relatorios/financeiro/fluxo-caixa' },
                    { key: 'rel-fin-rec',      label: 'Contas a Receber',            icon: <RequestQuoteOutlined/>,    href: '/relatorios/financeiro/contas-receber' },
                    { key: 'rel-fin-pag',      label: 'Contas a Pagar',              icon: <CreditCardOutlined/>,      href: '/relatorios/financeiro/contas-pagar' },
                    { key: 'rel-fin-receb',    label: 'Contas Recebidas',            icon: <PaidOutlined/>,            href: '/relatorios/financeiro/contas-recebidas' },
                    { key: 'rel-fin-pagas',    label: 'Contas Pagas',                icon: <DoneAllOutlined/>,         href: '/relatorios/financeiro/contas-pagas' },
                    { key: 'rel-fin-cancel',   label: 'Contas Canceladas',           icon: <CancelOutlined/>,          href: '/relatorios/financeiro/contas-canceladas' },
                    { key: 'rel-fin-ctrl',     label: 'Controle Financeiro',         icon: <InsightsOutlined/>,        href: '/relatorios/financeiro/controle-financeiro' },
                    { key: 'rel-fin-ent-no',   label: 'Entrada não Operacional',     icon: <TrendingUpOutlined/>,      href: '/relatorios/financeiro/entrada-nao-operacional' },
                    { key: 'rel-fin-sai-no',   label: 'Saída não Operacional',       icon: <TrendingDownOutlined/>,    href: '/relatorios/financeiro/saida-nao-operacional' },
                    { key: 'rel-fin-cc-real',  label: 'Centro de Custo Realizado',   icon: <DonutLargeOutlined/>,      href: '/relatorios/financeiro/centro-custo-realizado' },
                ],
            },
        ],
    },

    // ===================== PRODUTOS =====================
    {
        key: 'prod',
        label: 'Produtos',
        icon: <Inventory2Outlined/>,
        children: [
            { key: 'prod-entrada',   label: 'Entrada de produtos',       icon: <MoveToInboxOutlined/>,  href: '/produtos/entrada' },
            { key: 'prod-xml',       label: 'Entrada de produtos XML',   icon: <FileUploadOutlined/>,   href: '/produtos/entrada-xml' },
            { key: 'prod-lancados',  label: 'Produtos lançados',         icon: <FactCheckOutlined/>,    href: '/produtos/lancados' },
            { key: 'prod-estoque',   label: 'Produtos em estoque',       icon: <WarehouseOutlined/>,    href: '/produtos/estoque' },
            { key: 'prod-modelo',    label: 'Modelo Orçamento',          icon: <CalculateOutlined/>,    href: '/produtos/modelo-orcamento' },

            {
                key: 'prod-rel',
                label: 'Relatórios',
                icon: <InsertChartOutlined/>,
                children: [
                    { key: 'rel-prod-lanc',   label: 'Produtos Lançados',   icon: <FactCheckOutlined/>,     href: '/relatorios/produtos/lancados' },
                    { key: 'rel-prod-est',    label: 'Produtos em Estoque', icon: <WarehouseOutlined/>,     href: '/relatorios/produtos/estoque' },
                    { key: 'rel-prod-tab',    label: 'Tabela de Vendas',    icon: <ShoppingBagOutlined/>,   href: '/relatorios/produtos/tabela-vendas' },
                ],
            },
        ],
    },

    // ===================== PRODUÇÃO =====================
    {
        key: 'producao',
        label: 'Produção',
        icon: <PrecisionManufacturingOutlined/>,
        children: [
            { key: 'prod-ficha', label: 'Ficha técnica de serviço', icon: <EngineeringOutlined/>, href: '/producao/ficha-tecnica' },
            {
                key: 'producao-rel',
                label: 'Relatórios',
                icon: <InsertChartOutlined/>,
                children: [
                    { key: 'rel-producao-em', label: 'Em Produção',     icon: <PrecisionManufacturingOutlined/>, href: '/relatorios/producao/em-producao' },
                    { key: 'rel-producao-oc', label: 'Ordem de Compra', icon: <ShoppingCartOutlined/>,            href: '/relatorios/producao/ordem-compra' },
                    { key: 'rel-producao-pa', label: 'Pedido Agrupado', icon: <SummarizeOutlined/>,               href: '/relatorios/producao/pedido-agrupado' },
                ],
            },
        ],
    },

    // ===================== FISCAL - NF-e =====================
    {
        key: 'fiscal',
        label: 'Fiscal - NF-e',
        icon: <ReceiptOutlined/>,
        children: [
            { key: 'fisc-vendas',   label: 'Emitir NF-e vendas',        icon: <RequestPageOutlined/>,      href: '/fiscal/nfe-vendas' },
            { key: 'fisc-devol',    label: 'Emitir NF-e devolução',     icon: <KeyboardReturnOutlined/>,   href: '/fiscal/nfe-devolucao' },
            { key: 'fisc-remessa',  label: 'Emitir NF-e remessa',       icon: <LocalShippingOutlined/>,    href: '/fiscal/nfe-remessa' },
            { key: 'fisc-consig',   label: 'Emitir NF-e consignação',   icon: <HandshakeOutlined/>,        href: '/fiscal/nfe-consignacao' },
            { key: 'fisc-doacao',   label: 'Emitir NF-e doação',        icon: <VolunteerActivismOutlined/>,href: '/fiscal/nfe-doacao' },
            { key: 'fisc-emitidas', label: 'Notas emitidas',            icon: <ArticleOutlined/>,          href: '/fiscal/notas-emitidas' },
            { key: 'fisc-cancel',   label: 'Notas canceladas',          icon: <CancelOutlined/>,           href: '/fiscal/notas-canceladas' },
            { key: 'fisc-serie-d',  label: 'Lançar série D',            icon: <ListAltOutlined/>,          href: '/fiscal/serie-d' },
            { key: 'fisc-mdfe',     label: 'Emitir MDF-e',              icon: <LocalShippingOutlined/>,    href: '/fiscal/mdfe' },

            {
                key: 'fisc-rel',
                label: 'Relatórios',
                icon: <InsertChartOutlined/>,
                children: [
                    { key: 'rel-fisc-emitidas', label: 'Notas Emitidas', icon: <ArticleOutlined/>, href: '/relatorios/fiscal/notas-emitidas' },
                ],
            },
        ],
    },

    // ===================== RECURSOS HUMANOS =====================
    {
        key: 'rh',
        label: 'Recursos humanos',
        icon: <GroupsOutlined/>,
        children: [
            { key: 'rh-cad',     label: 'Cadastro de funcionários',  icon: <BadgeOutlined/>,           href: '/rh/funcionarios' },
            { key: 'rh-adiant',  label: 'Adiantamento de salário',   icon: <AttachMoneyOutlined/>,     href: '/rh/adiantamentos' },
            { key: 'rh-folha',   label: 'Folha de pagamento',        icon: <ReceiptLongOutlined/>,     href: '/rh/folha' },
            { key: 'rh-desp',    label: 'Despesas da folha',         icon: <PaymentOutlined/>,         href: '/rh/despesas' },
            { key: 'rh-enc',     label: 'Encargos sociais da folha', icon: <AccountBalanceOutlined/>,  href: '/rh/encargos' },

            {
                key: 'rh-rel',
                label: 'Relatórios',
                icon: <InsertChartOutlined/>,
                children: [
                    { key: 'rel-rh-adiant', label: 'Adiantamentos',      icon: <AttachMoneyOutlined/>,  href: '/relatorios/rh/adiantamentos' },
                    { key: 'rel-rh-folha',  label: 'Folha de Pagamento', icon: <ReceiptLongOutlined/>,  href: '/relatorios/rh/folha' },
                ],
            },
        ],
    },

    // ===================== CONFIGURAÇÃO =====================
    {
        key: 'cfg',
        label: 'Configuração',
        icon: <SettingsOutlined/>,
        children: [
            { key: 'cfg-empresa',   label: 'Cadastro da empresa',           icon: <BusinessOutlined/>,           href: '/config/empresa' },
            { key: 'cfg-var-cat',   label: 'Variação, Tipo, Categoria',     icon: <CategoryOutlined/>,           href: '/config/variacoes' },
            { key: 'cfg-classes',   label: 'Classes e Grupos',              icon: <ClassOutlined/>,              href: '/config/classes-grupos' },
            { key: 'cfg-perm',      label: 'Configurar permissão',          icon: <AdminPanelSettingsOutlined/>, href: '/config/permissoes' },
            { key: 'cfg-users',     label: 'Cadastrar usuários',            icon: <PersonAddOutlined/>,          href: '/config/usuarios' },
            { key: 'cfg-boletos',   label: 'Configurar boletos',            icon: <QrCode2Outlined/>,            href: '/config/boletos' },
            { key: 'cfg-cfop',      label: 'Configurar CFOP',               icon: <RuleOutlined/>,               href: '/config/cfop' },
            { key: 'cfg-imposto',   label: 'Configurar imposto',            icon: <PercentOutlined/>,            href: '/config/impostos' },
            { key: 'cfg-indic',     label: 'Cadastro de indicações',        icon: <PersonSearchOutlined/>,       href: '/config/indicacoes' },
            { key: 'cfg-sistema',   label: 'Configurar sistema',            icon: <TuneOutlined/>,               href: '/config/sistema' },
        ],
    },

    // ===================== RELATÓRIOS (RAIZ) =====================
    {
        key: 'rel',
        label: 'Relatórios',
        icon: <AssessmentOutlined/>,
        children: [
            { // Financeiro
                key: 'rel-fin',
                label: 'Financeiro',
                icon: <InsertChartOutlined/>,
                children: [
                    { key: 'rel2-fin-mov',     label: 'Movimento Diário',        icon: <SummarizeOutlined/>,      href: '/relatorios/financeiro/movimento-diario' },
                    { key: 'rel2-fin-saldo',   label: 'Saldo Caixa',             icon: <AccountBalanceOutlined/>, href: '/relatorios/financeiro/saldo-caixa' },
                    { key: 'rel2-fin-fluxo',   label: 'Fluxo de Caixa',          icon: <WaterfallChartOutlined/>, href: '/relatorios/financeiro/fluxo-caixa' },
                    { key: 'rel2-fin-rec',     label: 'Contas a Receber',        icon: <RequestQuoteOutlined/>,   href: '/relatorios/financeiro/contas-receber' },
                    { key: 'rel2-fin-pag',     label: 'Contas a Pagar',          icon: <CreditCardOutlined/>,     href: '/relatorios/financeiro/contas-pagar' },
                    { key: 'rel2-fin-receb',   label: 'Contas Recebidas',        icon: <PaidOutlined/>,           href: '/relatorios/financeiro/contas-recebidas' },
                    { key: 'rel2-fin-pagas',   label: 'Contas Pagas',            icon: <DoneAllOutlined/>,        href: '/relatorios/financeiro/contas-pagas' },
                    { key: 'rel2-fin-cancel',  label: 'Contas Canceladas',       icon: <CancelOutlined/>,         href: '/relatorios/financeiro/contas-canceladas' },
                    { key: 'rel2-fin-ctrl',    label: 'Controle Financeiro',     icon: <InsightsOutlined/>,       href: '/relatorios/financeiro/controle-financeiro' },
                    { key: 'rel2-fin-ent-no',  label: 'Entrada não Operacional', icon: <TrendingUpOutlined/>,     href: '/relatorios/financeiro/entrada-nao-operacional' },
                    { key: 'rel2-fin-sai-no',  label: 'Saída não Operacional',   icon: <TrendingDownOutlined/>,   href: '/relatorios/financeiro/saida-nao-operacional' },
                    { key: 'rel2-fin-cc-real', label: 'Centro de Custo Realizado', icon: <DonutSmallOutlined/>,   href: '/relatorios/financeiro/centro-custo-realizado' },
                ],
            },
            { // Vendas
                key: 'rel-vendas',
                label: 'Vendas',
                icon: <ShoppingBagOutlined/>,
                children: [
                    { key: 'rel-ven-real',   label: 'Realizadas',            icon: <FactCheckOutlined/>,      href: '/relatorios/vendas/realizadas' },
                    { key: 'rel-ven-cc',     label: 'Centro Custo',          icon: <DonutLargeOutlined/>,     href: '/relatorios/vendas/centro-custo' },
                    { key: 'rel-ven-cancel', label: 'Canceladas',            icon: <CancelOutlined/>,         href: '/relatorios/vendas/canceladas' },
                    { key: 'rel-ven-cond',   label: 'Condicional',           icon: <CompareArrowsOutlined/>,  href: '/relatorios/vendas/condicional' },
                    { key: 'rel-ven-orc',    label: 'Orçamentos',            icon: <RequestQuoteOutlined/>,   href: '/relatorios/vendas/orcamentos' },
                    { key: 'rel-ven-form',   label: 'Formulário',            icon: <DescriptionOutlined/>,    href: '/relatorios/vendas/formulario' },
                    { key: 'rel-ven-prod',   label: 'Prod./Serv. Vendidos',  icon: <ShoppingBagOutlined/>,    href: '/relatorios/vendas/produtos-servicos' },
                ],
            },
            { // Produtos
                key: 'rel-produtos',
                label: 'Produtos',
                icon: <Inventory2Outlined/>,
                children: [
                    { key: 'rel3-prod-lanc', label: 'Produtos Lançados',   icon: <FactCheckOutlined/>,   href: '/relatorios/produtos/lancados' },
                    { key: 'rel3-prod-est',  label: 'Produtos em Estoque', icon: <WarehouseOutlined/>,   href: '/relatorios/produtos/estoque' },
                    { key: 'rel3-prod-tab',  label: 'Tabela de Vendas',    icon: <ShoppingBagOutlined/>, href: '/relatorios/produtos/tabela-vendas' },
                ],
            },
            { // Produção
                key: 'rel-producao',
                label: 'Produção',
                icon: <PrecisionManufacturingOutlined2/>, // alias pra não colidir
                children: [
                    { key: 'rel3-producao-em', label: 'Em Produção',     icon: <PrecisionManufacturingOutlined/>, href: '/relatorios/producao/em-producao' },
                    { key: 'rel3-producao-oc', label: 'Ordem de Compra', icon: <ShoppingCartOutlined/>,            href: '/relatorios/producao/ordem-compra' },
                ],
            },
            { // RH
                key: 'rel-rh',
                label: 'Recursos Humanos',
                icon: <Groups2Outlined/>,
                children: [
                    { key: 'rel3-rh-adiant', label: 'Adiantamentos',      icon: <AttachMoneyOutlined/>, href: '/relatorios/rh/adiantamentos' },
                    { key: 'rel3-rh-folha',  label: 'Folha de Pagamento', icon: <ReceiptLongOutlined/>, href: '/relatorios/rh/folha' },
                ],
            },
            { // Administrativo (placeholder)
                key: 'rel-admin',
                label: 'Administrativo',
                icon: <BusinessCenterOutlined/>,
                children: [],
            },
        ],
    },
];

export type Row = {
    id: number;
    nomeproduto: string;
    valorpago: number;
    valorvenda: number;
    quantidade: number;
};

export const rowsDemo: Row[] = [
    { id: 1,  nomeproduto: "Cerveja Pilsen Lata 350ml",     valorpago: 2.49,  valorvenda: 4.99,  quantidade: 240 },
    { id: 2,  nomeproduto: "Cerveja IPA Long Neck 355ml",    valorpago: 5.20,  valorvenda: 9.90,  quantidade: 96 },
    { id: 3,  nomeproduto: "Refrigerante Cola 2L",           valorpago: 4.80,  valorvenda: 8.99,  quantidade: 80 },
    { id: 4,  nomeproduto: "Refrigerante Guaraná 2L",        valorpago: 4.60,  valorvenda: 8.49,  quantidade: 70 },
    { id: 5,  nomeproduto: "Água Mineral sem Gás 500ml",     valorpago: 0.90,  valorvenda: 2.50,  quantidade: 300 },
    { id: 6,  nomeproduto: "Água Mineral com Gás 510ml",     valorpago: 1.10,  valorvenda: 2.99,  quantidade: 220 },
    { id: 7,  nomeproduto: "Energético Lata 473ml",          valorpago: 6.90,  valorvenda: 12.90, quantidade: 120 },
    { id: 8,  nomeproduto: "Suco de Laranja 1L",             valorpago: 4.10,  valorvenda: 7.90,  quantidade: 60 },
    { id: 9,  nomeproduto: "Suco de Uva Integral 1L",        valorpago: 8.50,  valorvenda: 15.90, quantidade: 45 },
    { id:10,  nomeproduto: "Vinho Tinto de Mesa 750ml",      valorpago: 19.90, valorvenda: 39.90, quantidade: 36 },
    { id:11,  nomeproduto: "Vinho Chileno Reserva 750ml",    valorpago: 34.00, valorvenda: 69.90, quantidade: 24 },
    { id:12,  nomeproduto: "Vodka Tradicional 1L",           valorpago: 22.90, valorvenda: 44.90, quantidade: 30 },
    { id:13,  nomeproduto: "Whisky Blended 1L",              valorpago: 59.00, valorvenda: 119.90,quantidade: 18 },
    { id:14,  nomeproduto: "Gin London Dry 750ml",           valorpago: 45.00, valorvenda: 89.90, quantidade: 20 },
    { id:15,  nomeproduto: "Cachaça Prata 965ml",            valorpago: 8.90,  valorvenda: 17.90, quantidade: 42 },
    { id:16,  nomeproduto: "Cerveja Sem Álcool Lata 350ml",  valorpago: 2.30,  valorvenda: 4.59,  quantidade: 120 },
    { id:17,  nomeproduto: "Água Tônica 1L",                 valorpago: 3.20,  valorvenda: 6.49,  quantidade: 55 },
    { id:18,  nomeproduto: "Mix de Drinks (Lime Cordial) 1L",valorpago: 9.50,  valorvenda: 18.90, quantidade: 28 },
    { id:19,  nomeproduto: "Gelo em Cubos 5kg",              valorpago: 6.00,  valorvenda: 12.00, quantidade: 40 },
    { id:20,  nomeproduto: "Copo Descartável 300ml (100un)", valorpago: 7.80,  valorvenda: 15.90, quantidade: 25 },

];

type ReceberRow = {
    codigoVenda: number | string;
    nomeCliente: string;
    numParcelas: string;
    emissao: string;
    vencimento: string;
    valorParcela: number;
    valorTotal: number;
};

export const dadosContasAReceber: ReceberRow[] = [
    { codigoVenda: 123,  nomeCliente: "João Roberto Lopes",            numParcelas: "1/1",  emissao: "24/12/2025", vencimento: "15/01/2026", valorParcela: 123.00,  valorTotal: 123.00 },
    { codigoVenda: 210,  nomeCliente: "Maria Isabel do Nascimento",    numParcelas: "2/6",  emissao: "10/11/2025", vencimento: "10/12/2025", valorParcela: 480.61,  valorTotal: 2883.66 },
    { codigoVenda: 809,  nomeCliente: "Dirceu Lopes",                  numParcelas: "9/14", emissao: "20/04/2022", vencimento: "08/12/2022", valorParcela: 480.61,  valorTotal: 6728.54 },
    { codigoVenda: 1511, nomeCliente: "Prefeitura Municipal de RB",    numParcelas: "1/1",  emissao: "05/01/2023", vencimento: "15/01/2023", valorParcela: 400.00,  valorTotal: 400.00 },
    { codigoVenda: 940,  nomeCliente: "Marcelli Gabriela Pontes",      numParcelas: "9/10", emissao: "31/05/2022", vencimento: "20/01/2023", valorParcela: 1000.00, valorTotal: 10548.00 },
    { codigoVenda: 1462, nomeCliente: "Laura",                         numParcelas: "2/3",  emissao: "08/12/2022", vencimento: "07/02/2023", valorParcela: 223.33,  valorTotal: 670.00 },
    { codigoVenda: 1466, nomeCliente: "Leonardo",                      numParcelas: "2/2",  emissao: "08/12/2022", vencimento: "07/02/2023", valorParcela: 175.00,  valorTotal: 350.00 },
    { codigoVenda: 1471, nomeCliente: "Heloísa",                       numParcelas: "2/3",  emissao: "08/12/2022", vencimento: "07/02/2023", valorParcela: 200.00,  valorTotal: 600.00 },
    { codigoVenda: 958,  nomeCliente: "Maria Isabel Fischer",          numParcelas: "9/11", emissao: "08/06/2022", vencimento: "08/02/2023", valorParcela: 400.00,  valorTotal: 8240.00 },
    { codigoVenda: 1534, nomeCliente: "Unimed Sudoeste Paulista",      numParcelas: "1/1",  emissao: "10/01/2023", vencimento: "30/01/2023", valorParcela: 4185.32, valorTotal: 4185.32 },
    { codigoVenda: 1569, nomeCliente: "Prefeitura Municipal de Itaberá",numParcelas: "1/1", emissao: "24/01/2023", vencimento: "31/01/2023", valorParcela: 3626.00, valorTotal: 3626.00 },
    { codigoVenda: 1570, nomeCliente: "Santa Casa de Itapeva",         numParcelas: "1/1",  emissao: "25/01/2023", vencimento: "31/01/2023", valorParcela: 1212.13, valorTotal: 1212.13 },
    { codigoVenda: 210,  nomeCliente: "João Roberto Lopes",            numParcelas: "4/10", emissao: "20/08/2021", vencimento: "26/11/2021", valorParcela: 1428.54, valorTotal: 14285.40 },
    { codigoVenda: 210,  nomeCliente: "João Roberto Lopes",            numParcelas: "5/10", emissao: "20/08/2021", vencimento: "26/12/2021", valorParcela: 1428.54, valorTotal: 14285.40 },
    { codigoVenda: 210,  nomeCliente: "João Roberto Lopes",            numParcelas: "6/10", emissao: "20/08/2021", vencimento: "26/01/2022", valorParcela: 1428.54, valorTotal: 14285.40 },
    { codigoVenda: 210,  nomeCliente: "João Roberto Lopes",            numParcelas: "7/10", emissao: "20/08/2021", vencimento: "26/02/2022", valorParcela: 1428.54, valorTotal: 14285.40 },
    { codigoVenda: 210,  nomeCliente: "João Roberto Lopes",            numParcelas: "8/10", emissao: "20/08/2021", vencimento: "26/03/2022", valorParcela: 1428.54, valorTotal: 14285.40 },
    { codigoVenda: 210,  nomeCliente: "João Roberto Lopes",            numParcelas: "9/10", emissao: "20/08/2021", vencimento: "26/04/2022", valorParcela: 1428.54, valorTotal: 14285.40 },
    { codigoVenda: 210,  nomeCliente: "João Roberto Lopes",            numParcelas: "10/10",emissao: "20/08/2021", vencimento: "26/05/2022", valorParcela: 1428.54, valorTotal: 14285.40 },
    { codigoVenda: 1710, nomeCliente: "Carlos Nogueira",               numParcelas: "1/3",  emissao: "02/02/2025", vencimento: "02/03/2025", valorParcela: 350.00,  valorTotal: 1050.00 },
    { codigoVenda: 1710, nomeCliente: "Carlos Nogueira",               numParcelas: "2/3",  emissao: "02/02/2025", vencimento: "02/04/2025", valorParcela: 350.00,  valorTotal: 1050.00 },
    { codigoVenda: 1710, nomeCliente: "Carlos Nogueira",               numParcelas: "3/3",  emissao: "02/02/2025", vencimento: "02/05/2025", valorParcela: 350.00,  valorTotal: 1050.00 },
];


