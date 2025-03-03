import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Nav from "./Nav";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isLoggedIn, setisLoggedIn] =useState (false);


  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setisLoggedIn(true);
    }
    else{
      setisLoggedIn(false);
    }
  }, []);
  
  useEffect(() => {
    // Check for token in localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON?.parse(storedUser));
    }
    setLoading(false); // Done checking for user
  }, []);

  const login = async (userData) => {
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
      setisLoggedIn(true);
      router.push("/dashboard"); // Redirect to dashboard after login

    } catch (error) {
      console.error('Login Error:', error);  // Log the detailed error
      alert(error.message); // Show the error to the user
    } finally {
      setLoading(false);
    }
    setisLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Persist login state

  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setisLoggedIn(false);
    router.push("/login");
    setisLoggedIn(false);
  };

  return (
  
    <AuthContext.Provider value={{ user, login, logout, loading, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
