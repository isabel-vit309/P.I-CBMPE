import axios from "axios";
import { authService } from "./authService";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://sigo-2hnz.onrender.com";

export const ocorrenciaService = {
  /**
   * Cria uma nova ocorrência no backend
   * @param data Dados da ocorrência
   */
  criarOcorrencia: async (data: any) => {
    const token = authService.getToken();

    if (!token) {
      throw new Error("Usuário não autenticado. Faça login novamente.");
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/ocorrencias`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // ⚡ já inclui "Bearer " do authService
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("❌ Erro no ocorrenciaService:", error);
      throw error;
    }
  },

  /**
   * Busca todas as ocorrências
   */
  buscarTodas: async () => {
    const token = authService.getToken();

    if (!token) {
      throw new Error("Usuário não autenticado. Faça login novamente.");
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/ocorrencias`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao buscar ocorrências:", error);
      throw error;
    }
  },

  /**
   * Busca uma ocorrência por ID
   * @param id ID da ocorrência
   */
  buscarPorId: async (id: number) => {
    const token = authService.getToken();

    if (!token) {
      throw new Error("Usuário não autenticado. Faça login novamente.");
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/ocorrencias/${id}`, {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao buscar ocorrência:", error);
      throw error;
    }
  },
};
