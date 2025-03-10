import "@/styles/globals.css";
import { AuthProvider, useAuth } from "../../components/Auth";
import Navplog from "../../components/Navplog";
import Nav from "../../components/Nav"; 
import { useEffect, useState } from "react";
import DoctorNav from "../../components/DoctorNav";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NavigationWrapper>
        <Component {...pageProps} />
      </NavigationWrapper>
    </AuthProvider>
  );
}

function NavigationWrapper({ children }) {
  const { user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("userRole"));
  }, [user]);

  return (
    <div>
      {role === "doctor" && <DoctorNav />}
      {role === "patient" && <Navplog />}
      {!role && <Nav />}
      {children}
    </div>
  );
}

export default MyApp;
