import { AxiosInstance } from 'axios';
import { IRegister } from '@/app/domain/models/dto/IRegister';

export const RegisterService = async (api: AxiosInstance, payload: IRegister) => {
    const { data } = await api.post('/auth/register', payload);
    return data;
};