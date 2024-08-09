import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
const Nav = async () => {
  const session = await getServerSession(options)
  return (
    <div>
      <header className="bg-[rgb(233,235,253)] bg-opacity-50 font-bold">
        <nav className="flex justify-between items-center w-full px-10 py-4">
        <Link href={"/"}>My Site</Link>
        <div className="flex gap-10">
            <Link href="/">Home</Link>
            <Link href="/joblist">Job List</Link>
            {session ? <Link href="/bookmark">Bookmark</Link>: null}
            {!session ? <Link href="/api/auth/signup?callbackUrl=${encodeURIComponent('/joblist')}">Sign Up</Link>: <Link href="/">{session.user?.name}</Link>}
            {session ? <Link href="/api/auth/signout?callbackUrl=/">Log Out</Link>: <Link href="/api/auth/signin">Sign In</Link>}
        </div>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
