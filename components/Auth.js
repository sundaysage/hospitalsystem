import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Constants } from '../common/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('userRole');

    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser)); // ✅ Ensure user persists
    }
    setLoading(false);
  }, []);

  const login = async (userData, role) => {
    setLoading(true);
    try {
      const response = await fetch(
        role === 'doctor'
          ? `${Constants.url.baseurl}/auth/doctor-login`
          : `${Constants.url.baseurl}/auth/patient-login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      const token = data?.data?.tokens?.accessToken;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(data.data));
      localStorage.setItem('userRole', role);

      setUser(data.data);
      router.push(role === 'doctor' ? '/doctor/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Login Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = (role) => {
    localStorage.clear();
    setUser(null);
    window.dispatchEvent(new Event('storage')); // ✅ Ensures immediate navbar update

    if (role == 'doctor') {
      router.push('/doctor/auth/login');
    } else {
      router.push('/loginoption');
    }
  };

  const accessToken = () => localStorage.getItem('token');

  return <AuthContext.Provider value={{ user, login, logout, accessToken, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
