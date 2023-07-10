import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { APIRoutes, headers } from "@/services";
import { useNavigate } from "@/router";

type User = {
  name: string;
  email: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    // TODO: add get user function

    if (!token) {
      navigate("/login");
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const request = await fetch(APIRoutes.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const { token, user, message } = await request.json();

    // TODO: show alert errors
    if (!token) throw new Error(message);

    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    headers.append("Authorization", `Bearer ${token}`);

    setUser(user);

    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
