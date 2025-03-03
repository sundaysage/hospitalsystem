import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./Auth";

const Navplog = () => {
  const { logout } = useAuth();
  return (
    <div className="w-full bg-sky-50 p-3">
      <div className="flex w-full justify-around">
        <p>Care Plus</p>
        <Link href="/">
          <p>Home</p>
        </Link>
        <Link href="/">
          <p>Find doctor</p>
        </Link>
        <Link href="./pharmacy">
          <p>Pharmacy</p>
        </Link>
        <Link href="./dashboard">
          <p>Dashboard</p>
        </Link>

        <Link href="./patientreg">
        <button onClick={logout}>Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Navplog;
