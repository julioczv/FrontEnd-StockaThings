
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


type NavLeaf  = { key: string; label: string; icon: React.ReactNode; href: string };
type NavGroup = { key: string; label: string; icon: React.ReactNode; children: NavItem[] };
type NavItem  = NavLeaf | NavGroup;


export const NAV: NavItem[] = [
    { key: 'home',     label: 'Página inicial',        icon: <HomeOutlined/>,          href: '/home' },
    { key: 'vendas', label: 'Vendas',  icon: <PeopleOutlined/>,        href: '/vendas' },
    { key: 'despesas', label: 'Lançar despesas',       icon: <ReceiptLongOutlined/>,   href: '/despesas' },
    { key: 'forn',     label: 'Fornecedor/Transporte', icon: <LocalShippingOutlined/>, href: '/fornecedores' },

]
