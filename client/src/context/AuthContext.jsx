import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD LOGGED-IN USER
  // =========================
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      // No token
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");

        if (res.data?.success && res.data?.user) {
          setUser(res.data.user);
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Failed to load user:",
          error.response?.data || error.message
        );

        // Remove token only when it is actually invalid
        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          localStorage.removeItem("token");
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // =========================
  // LOGIN
  // =========================
  const login = (token, userData) => {
    localStorage.setItem("token", token);

    if (userData) {
      setUser(userData);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  // =========================
  // UPDATE USER
  // =========================
  const updateUser = (updatedUser) => {
    setUser((prevUser) => ({
      ...(prevUser || {}),
      ...updatedUser,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};