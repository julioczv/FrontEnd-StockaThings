export interface IProductId extends Partial<IProducts> {
    idProduto: number;
    unidadeMedidaId?: number;
    categoriaId?: number;
    unidadeMedida?: { unidadeMedidaId: number; unidMedida: string };
    categoria?: { categoriaId: number; nomeCategoria: string };
}
export interface IProducts {
    nomeProduto: string,
    descricaoProduto: string,
    valorPagoProduto: number,
    valorVendaProduto: number,
    qtdProduto: number,
    unidadeMedidaId: number,
    categoriaId: number,
}
