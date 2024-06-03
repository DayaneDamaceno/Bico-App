import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { obterToken } from "../api/ApiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserType = {
  id: number;
  token: string;
} | null;

type AuthContextType = {
  user: UserType;
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
    const { id, token } = await obterToken(email, senha);
    await AsyncStorage.setItem("userToken", token);
    setUser({ id, token });
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
