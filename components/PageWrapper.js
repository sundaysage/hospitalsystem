import React from "react";
import { useAuth } from "./Auth";
import Nav from "./Nav";
import Navplog from "./Navplog";

const PageWrapper = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      {isLoggedIn ? <Navplog /> : <Nav />}
      <main>{children}</main>
    </div>
  );
};

export default PageWrapper;
