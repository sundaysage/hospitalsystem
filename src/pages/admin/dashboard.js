import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../components/Auth";
import AdminNav from "../../components/AdminNav";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!user || role !== "admin") {
      router.push("/admin-login");
    }
  }, [user]);

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-[#e0f2fe] flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-lg text-center">
          <h1 className="text-2xl font-bold text-[#075985]">Admin Dashboard</h1>
          <p className="mt-4">Manage hospital operations here.</p>

          <button
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
