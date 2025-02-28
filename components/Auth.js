import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for token in localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON?.parse(storedUser));
    }
    setLoading(false); // Done checking for user
  }, []);

  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://sage-hospital.onrender.com/api/v1/auth/patient-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      const token = data?.data?.tokens?.accessToken; // Extract token from API response
      localStorage.setItem("token", token); // Store token securely

      setUser(data.data); // Store user data (optional)
      localStorage.setItem("user", JSON.stringify(data.data));
      router.push("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      console.error('Login Error:', error);  // Log the detailed error
      alert(error.message); // Show the error to the user
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
