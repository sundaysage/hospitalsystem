import { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "../../components/Auth";
import { useAuth } from "../../components/Auth";
import Navplog from "../../components/Navplog";
export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      // Redirect if not logged in AND not currently checking
      router.push("/patientlogin");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Or a nice spinner
  }

  if (!user) {
    return null; // Don't render anything until the redirect happens
  }

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {user.firstName}!</p> {/* Access user data */}
        <button onClick={logout}>Logout</button>
        {console.log(user.firstName)}
      </div>
    </>
  );
}
