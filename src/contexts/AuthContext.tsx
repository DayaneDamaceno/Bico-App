import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { GetAuth } from "../api/helpers/AuthHelper";

type UserType = {
  id: number;
  token: string;
} | null;

type AuthContextType = {
  user: UserType;
  login: (id: number) => void;
  //   login: (username: string, password: string) => void;
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

  //   const login = (username: string, password: string) => {
  const login = (id: number) => {
    // Implemente aqui a lógica de autenticação
    const fakeUser = { id, token: GetAuth(id) };
    setUser(fakeUser);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    // Implemente a lógica para verificar um token salvo e carregar dados do usuário
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
