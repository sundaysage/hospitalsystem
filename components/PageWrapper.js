import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth";
import PatientNav from "./PatientNav";
import DoctorNav from "./DoctorNav";
import LoggedOutNav from "./LoggedOutNav";

const PageWrapper = ({ children }) => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("userRole"));
  }, [user]);

  return (
    <div>
      {role === "doctor" && <DoctorNav />}
      {role === "patient" && <PatientNav />}
      {!role && <LoggedOutNav />}
      <main>{children}</main>
    </div>
  );
};

export default PageWrapper;
