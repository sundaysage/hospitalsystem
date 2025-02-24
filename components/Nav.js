import Link from "next/link";
import React from "react";
import { useState } from "react";


const Nav = () => {
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

        <Link href="/patientlogin">
          <p>Login</p>
        </Link>
        <Link href="./patientreg">
          <p>Signup</p>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
