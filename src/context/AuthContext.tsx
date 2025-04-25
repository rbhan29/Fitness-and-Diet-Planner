import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  name: string;
  email: string;
}

export type UserWithCredentials = User & { password: string };

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: UserWithCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse user data", error);
        localStorage.clear();
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const usersString = localStorage.getItem("usersArray");
    const users: UserWithCredentials[] = usersString ? JSON.parse(usersString) : [];

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const signup = async (userData: UserWithCredentials): Promise<boolean> => {
    const usersString = localStorage.getItem("usersArray");
    const users: UserWithCredentials[] = usersString ? JSON.parse(usersString) : [];

    const emailExists = users.some((user) => user.email === userData.email);
    if (emailExists) return false;

    users.push(userData);
    localStorage.setItem("usersArray", JSON.stringify(users));

    const { password, ...userWithoutPassword } = userData;
    setCurrentUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}