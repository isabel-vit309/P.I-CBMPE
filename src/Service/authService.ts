import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface LoginRequest {
  email: string;
  senha: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<string> => {
    try {
      console.log("Fazendo login na URL:", API_BASE_URL);
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data);

      if (error.response?.status === 401) {
        throw new Error("Senha inválida");
      }
      if (error.response?.status === 404) {
        throw new Error("Usuário não encontrado");
      }
      throw new Error("Erro ao fazer login");
    }
  },
};
