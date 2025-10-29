import { jwtDecode } from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface LoginRequest {
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    roles: string[];
  };
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erro ${response.status} ao fazer login`);
      }

      const tokenRaw = await response.text();
      const bearerToken = tokenRaw.startsWith("Bearer ")
        ? tokenRaw
        : `Bearer ${tokenRaw}`;

      const decoded: any = jwtDecode(tokenRaw);

      const usuario = {
        id: parseInt(decoded.sub) || 0,
        nome: decoded.nome || credentials.email.split("@")[0],
        email: decoded.email || credentials.email,
        roles: decoded.roles || [decoded.role] || ["USER"],
      };

      localStorage.setItem("token", bearerToken);
      localStorage.setItem(
        "role",
        decoded.roles?.[0] || decoded.role || "USER"
      );
      localStorage.setItem("usuario", JSON.stringify(usuario));

      console.log("✅ Token salvo com prefixo Bearer:", bearerToken);

      return { token: bearerToken, usuario };
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("💥 Erro no authService:", error);
      throw new Error(error.message || "Erro desconhecido ao fazer login.");
    }
  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("usuario");
    console.log("🚪 Usuário deslogado");
  },

  getToken(): string {
    return localStorage.getItem("token") || "";
  },

  getRole(): string {
    return localStorage.getItem("role") || "";
  },

  getUsuario(): any {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
