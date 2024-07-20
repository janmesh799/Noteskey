import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="flex flex-row gap-x-5 justify-center">
          <Link href="/">HOME</Link>
          <Link href="/about">ABOUT</Link>
          <Link href="/login">LoGIN</Link>
          <Link href="/signup">SIGNUP</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
