import "@/styles/globals.css";
import { AuthProvider, useAuth } from "../../components/Auth";
import Nav from "../../components/Nav";
import Navplog from "../../components/Navplog";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>  {/* AuthProvider wraps the ENTIRE app */}
    <NavigationWrapper>

      <Component {...pageProps} />

    </NavigationWrapper>
    </AuthProvider>
  );
}

//create the login that will check and replace that nav with the correct one
function NavigationWrapper({ children }) {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      {isLoggedIn ? <Navplog /> : <Nav />}
      {children}
    </div>
  );
}

export default MyApp;