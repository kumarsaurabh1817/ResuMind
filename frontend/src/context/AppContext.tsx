import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import type { AppContextType, User } from "../types";
import { SERVER_URL } from "../main";

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchUser() {
    try {
      const response = await axios.get(`${SERVER_URL}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  const LogoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuth(false);
    toast.success("Logged out successfully");
    window.location.href = "/";
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        setLoading,
        setUser,
        isAuth,
        setIsAuth,
        LogoutUser,
      }}
    >
      {children}
    <Toaster />
    </AppContext.Provider>
  );
};

export const useAppData = () => {
    const context = useContext(AppContext);
    if(!context) {
        throw new Error("useAppData must be used within an AppProvider");
    }
    return context;
}
