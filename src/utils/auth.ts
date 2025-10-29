export function decodeToken(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Erro ao decodificar token:", e);
    return null;
  }
}

export function saveUserRoleFromToken(token: string) {
  const decoded = decodeToken(token);
  if (decoded?.roles && Array.isArray(decoded.roles)) {
    const role = decoded.roles[0]; // pega o primeiro papel
    localStorage.setItem("role", role.toUpperCase());
  }
}
