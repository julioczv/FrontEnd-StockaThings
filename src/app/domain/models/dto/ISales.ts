export interface ISalesGetResponse {
    summary: ISalesSummary;
    sales: ISale[];
}

export interface ISalesGetResponseById {
    idVenda: string,
    summary: ISalesSummary;
    sales: ISale[];
}

export interface ISalesSummary {
    from: string;
    to: string;
    totalItens: number;
    custo: number;
    faturado: number;
    lucro: number;
}

export interface ISale {
    pagamento: string;
    idVenda: number;
    dataVenda: string;
    metodoPagamento: string | IPaymentMethod;
    items: ISaleItem[];
    totals: ISaleTotals;
}
export interface IPaymentMethod {
    idTipoPagamento: number;
    tipoPagamento: string;
}

export interface ISaleItem {
    idItemVenda: number;
    idProduto: number;
    nomeProduto: string;
    quantidade: number;
    precoUnitario: number;
    subTotalVenda: number;
    precoPago: number;
    subTotalPago: number;
}

export interface ISaleTotals {
    totalItens: number;
    custo: number;
    faturado: number;
    lucro: number;
}

export interface ISaleItemCreate {
    idProduto: number;
    qtd: number;
}

export interface ISaleCreate {
    tipoPagamentoId: number;
    items: ISaleItemCreate[];
}

export interface ISaleCreateResponse {
    idVenda: number;
}

