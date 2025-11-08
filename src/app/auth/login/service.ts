import axios, {AxiosInstance} from "axios";
import {IAuthResponse, ILogin} from "@/app/domain/models/dto/ILogin";

export const LoginService = async (api: AxiosInstance, payload: ILogin): Promise<IAuthResponse> => {
   const { data } = await api.post<IAuthResponse>(`/auth/login`, payload);
   return data;
};