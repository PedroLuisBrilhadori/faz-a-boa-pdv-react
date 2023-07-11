import { createContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { APIRoutes, headers } from "@/services";
import { useNavigate } from "@/router";
import { useToast } from "@/components/ui/use-toast";

type User = {
  name: string;
  email: string;
  role: "admin" | "user";
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

const fetchUser = async (token: string) => {
  const headers = new Headers();

  headers.append("Authorization", `Bearer ${token}`);

  const response = await fetch(APIRoutes.userByToken, { headers });

  if (response.status !== 200) throw new Error();

  return response.json();
};

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    // TODO: add get user function

    if (!token) {
      navigate("/login");
    } else {
      fetchUser(token).then((user) => {
        setUser(user);
      });
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

    const { token, user } = await request.json();

    if (!token) {
      const description =
        request.status !== 401
          ? "Erro desconhecido. Por favor tente novamente mais tarde"
          : "Email ou senha incorreto.";

      toast({
        title: "Erro no Login",
        description,
        variant: "destructive",
      });

      return;
    }

    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    headers.append("Authorization", `Bearer ${token}`);

    setUser(user);

    navigate("/");
  }

  const signOut = async () => {
    destroyCookie(null, "nextauth.token");

    setUser(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
