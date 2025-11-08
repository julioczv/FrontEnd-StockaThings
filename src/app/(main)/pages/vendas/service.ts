import { AxiosInstance } from 'axios'
import {IPaymentMethod, ISaleCreate, ISaleCreateResponse, ISalesGetResponse} from '@/app/domain/models/dto/ISales'
import {IUnityMeasure} from "@/app/domain/models/dto/IUnityMeasure";

export const getSales = async (api: AxiosInstance, from: string, to: string): Promise<ISalesGetResponse> => {
    try {
        const response = await api.get<ISalesGetResponse>(`/vendas/periodo`, {
            params: { from, to },
        })
        return response.data
    } catch (error) {
        console.error('Erro ao buscar vendas por período:', error)
        throw error
    }
}

export async function createSale(api: AxiosInstance, payload: ISaleCreate): Promise<ISaleCreateResponse> {
    const { data } = await api.post(`/vendas`, payload);
    return data;
}


export const getPaymentMethod = async (api: AxiosInstance): Promise<IPaymentMethod[]> => {
    const { data } = await api.get<IPaymentMethod[]>('/metodopagamento');
    return data;
};


export const deleteSales = async (api: AxiosInstance, idVenda: number): Promise<void> => {
    try {
        const response = await api.delete(`/vendas/${idVenda}`);
        return response.data;
        console.log("Venda deletada com sucesso !");
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
