import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaUserMd, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const DoctorNav = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); // ✅ Updates navbar immediately on logout
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage")); // ✅ Notifies all components
    router.push("/loginoption");
  };

  if (!isLoggedIn) return null; // ✅ Prevents showing navbar after logout

  return (
    <nav className="bg-[#075985] text-white p-4 flex justify-between items-center">
      <Link href="/doctor/dashboard">
        <div className="text-xl font-bold flex items-center cursor-pointer">
          <FaUserMd className="mr-2" /> Doctor Portal
        </div>
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white text-2xl"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6">
        <li>
          <Link href="/doctor/patients" className="hover:text-gray-300">
            My Patients
          </Link>
        </li>
        <li>
          <Link href="/doctor/appointments" className="hover:text-gray-300">
            Appointments
          </Link>
        </li>
        <li>
          <Link href="/doctor/dashboard" className="hover:text-gray-300">
            Profile
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-red-400"
          >
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-[#075985] flex flex-col items-center gap-4 py-4 md:hidden">
          <li>
            <Link href="/doctor/patients" className="hover:text-gray-300">
              My Patients
            </Link>
          </li>
          <li>
            <Link href="/doctor/appointments" className="hover:text-gray-300">
              Appointments
            </Link>
          </li>
          <li>
            <Link href="/doctor/dashboard" className="hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-red-400"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default DoctorNav;
