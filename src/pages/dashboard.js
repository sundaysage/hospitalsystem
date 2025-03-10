import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../components/Auth";
import Image from "next/image";
import Link from "next/link";
import IDCard from "../../components/IDCard"; // ✅ Tailwind-styled ID Card
import IDCardPDF from "../../components/IDCardPDF"; // ✅ Fixed PDF generation
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/patientlogin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-[#0c4a6e]">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting
  }

  return (
    <>
      {/* ✅ Navbar */}

      {/* ✅ Dashboard Content */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#e0f2fe] p-6 pt-20">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
          {/* ✅ Profile Image */}
          <div className="flex justify-center mb-4">
            {user.profileImage ? (
              <Image
                src={user.profileImage}
                alt="Profile Image"
                width={100}
                height={100}
                className="rounded-full border border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                No Image
              </div>
            )}
          </div>

          {/* ✅ User Details */}
          <h1 className="text-2xl font-bold text-[#0c4a6e]">
            Welcome, {user.firstName} {user.lastName}!
          </h1>
          <p className="text-gray-600 mt-2">{user.email}</p>
          <p className="text-gray-600">📍 {user.address}</p>
          <p className="text-gray-600">📞 {user.phone}</p>

          {/* ✅ Display Tailwind ID Card */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-[#0c4a6e] mb-2">
              Your ID Card
            </h2>
            <IDCard user={user} />
          </div>

          {/* ✅ Download ID Card */}
          <PDFDownloadLink document={<IDCardPDF user={user} />} fileName="User_ID_Card.pdf">
            {({ loading }) => (
              <button className="mt-4 bg-[#0c4a6e] text-white px-4 py-2 rounded-lg shadow hover:bg-[#093a5a] transition-all">
                {loading ? "Generating..." : "Download ID Card"}
              </button>
            )}
          </PDFDownloadLink>

          {/* ✅ Buttons (Restored) */}
          <div className="mt-6 flex flex-col space-y-3">
            <Link href="/profileUpdate">
              <button className="w-full bg-[#0c4a6e] text-white py-2 px-4 rounded-lg shadow hover:bg-[#093a5a] transition-all">
                Update Profile
              </button>
            </Link>

            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
