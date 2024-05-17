import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { obterToken } from "../api/ApiService";

type UserType = {
  id: number;
  token: string;
} | null;

type AuthContextType = {
  user: UserType;
  // login: (id: number) => void;
  login: (email: string, senha: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

// Componente provedor do contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (email: string, senha: string) => {
    const { token } = await obterToken(email, senha);
    setUser({ id: 4, token: token });
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
