import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
const Nav = async () => {
  const session = await getServerSession(options)
  console.log("Session", session)
  return (
    <div>
      <header className="bg-gray-500 text-gray-100">
        <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>My Site</div>
        <div className="flex gap-10">
            <Link href="/">Home</Link>
            <Link href="/joblist">Job List</Link>
            {!session ? <Link href="/api/auth/signup?callbackUrl=${encodeURIComponent('/joblist')}">Sign Up</Link>: <Link href="/">{session.user?.name}</Link>}
            {session ? <Link href="/api/auth/signout?callbackUrl=/">Log Out</Link>: <Link href="/api/auth/signin">Sign In</Link>}
        </div>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
