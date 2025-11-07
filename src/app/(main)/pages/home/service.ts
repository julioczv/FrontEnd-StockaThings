import {AxiosInstance} from "axios";
import {IProductId, IProducts} from "@/app/domain/models/dto/IProducts";
import {IUnityMeasure} from "@/app/domain/models/dto/IUnityMeasure";
import {ICategory} from "@/app/domain/models/dto/ICategory";


interface ProductResponse {
    content: IProductId[];
}


export const getProducts = async(api: AxiosInstance): Promise<ProductResponse> => {
    try {
        const response = await api.get<ProductResponse>(`/produtos?size=9999`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getProductById = async (api: AxiosInstance, idProduto: number): Promise<IProductId> => {
    try {
        const response = await api.get(`/produtos/${idProduto}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}

export const postProducts = async(api: AxiosInstance, payload: IProducts): Promise<IProducts | null> => {
    try {
        const response = await api.post<IProducts>(`/produtos`, payload);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null
    }
}

export const putProduct = async (api: AxiosInstance, idProduto: number, payload: IProducts): Promise<IProducts | null> => {
    if (!idProduto) throw new Error("ID do produto é inválido.");
    try {
        const response = await api.put<IProducts>(`/produtos/${idProduto}`, payload);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null
    }
}

export const deleteProduct = async (api: AxiosInstance, idProduto: number): Promise<void> => {
    try {
        const response = await api.delete(`/produtos/${idProduto}`);
        return response.data;
        console.log("Produto deletado com sucesso !");
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}


export const getUnityMeasure = async (api: AxiosInstance): Promise<IUnityMeasure[]> => {
    const response = await api.get<IUnityMeasure[]>('/unidademedidas');
    return Array.isArray(response.data) ? response.data : [];
};

export const getCategory = async (api: AxiosInstance): Promise<ICategory[]> => {
    const response = await api.get<ICategory[]>('/categoria');
    return Array.isArray(response.data) ? response.data : [];
};