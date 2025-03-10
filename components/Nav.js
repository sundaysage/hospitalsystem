import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for menu

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ✅ Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#0c4a6e] text-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Care Plus
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLinks />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu (Slide In) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#0c4a6e] text-center py-4"
            >
              <NavLinks onClick={() => setIsOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ✅ Fix: Add padding so content starts below navbar */}
      <div className="pt-16">
        {/* Your Page Content Goes Here */}
      </div>
    </>
  );
};

// Navigation Links (Reused for Desktop & Mobile)
const NavLinks = ({ onClick }) => (
  <div className="flex flex-col md:flex-row md:space-x-6">
    {[
      { href: "/", label: "Home" },
      { href: "/", label: "Find Doctor" },
      { href: "/pharmacy", label: "Pharmacy" },
      { href: "/loginoption", label: "Login" },
      { href: "/patientreg", label: "Signup" },
    ].map(({ href, label }) => (
      <Link key={href} href={href} onClick={onClick}>
        <motion.p
          whileHover={{ scale: 1.1, color: "#e0f2fe" }}
          className="py-2 md:py-0 px-4 md:px-0 cursor-pointer transition-all"
        >
          {label}
        </motion.p>
      </Link>
    ))}
  </div>
);

export default Nav;
