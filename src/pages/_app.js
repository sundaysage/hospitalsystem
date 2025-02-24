import "@/styles/globals.css";
import { AuthProvider } from "../../components/Auth";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>  {/* AuthProvider wraps the ENTIRE app */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;