import { parseCookies } from "nookies";

const baseUrl = import.meta.env.VITE_API_URL || `https://localhost:3001`;

export const APIRoutes = {
  baseUrl,
  login: `${baseUrl}/auth/login`,
  userByToken: `${baseUrl}/auth`,
  user: `${baseUrl}/user`,
  purchase: `${baseUrl}/purchase`,
  products: `${baseUrl}/products`,
};

export const headers: Headers = new Headers();

export const getToken = (): string | void => {
  const { ["nextauth.token"]: token } = parseCookies();

  if (!token) {
    return;
  }

  return token;
};
