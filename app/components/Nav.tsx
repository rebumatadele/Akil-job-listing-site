import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Image from "next/image";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <div className="">
      <header className="text-[#3F51B5] bg-[#E9EBFD] px-5">
        <nav className="flex justify-between items-center w-full px-10 py-4">
          <div className="w-1/5">
            <Link href={"/"}>
              <Image
                src="/images/akil-logo.png"
                width={86}
                height={24}
                alt="LOGO"
              />
            </Link>
          </div>
          <div className="flex gap-10 w-2/5 mt-2">
          <span className="px-6 py-2 rounded-lg hover:bg-white">

            <Link href="/">Home</Link>
          </span>
          <span className="px-6 py-2 rounded-lg hover:bg-white">

            <Link href="/joblist">Job List</Link>
          </span>
          <span className="hover:bg-white">

            {session ? <Link href="/bookmark">Bookmark</Link> : null}
          </span>
          </div>
          <div className="flex justify-end gap-5 w-2/5">
            {!session ? (
              <Link href="/api/auth/signup?callbackUrl=${encodeURIComponent('/joblist')}">
                <button className="text-[#2D298E] border border-[#2D298E] hover:bg-[#3532a3] hover:text-white font-bold rounded-full px-6 py-2 duration-100">
                  Sign Up
                </button>
              </Link>
            ) : (
              <Link href="/">{session.user?.name}</Link>
            )}
            {session ? (
              <Link href="/api/auth/signout?callbackUrl=/">Log Out</Link>
            ) : (
              <Link href="/api/auth/signin">
                <button className="hover:bg-[#3532a3] hover:text-white font-bold rounded-full px-6 py-2 duration-100">
                  Login{" "}
                </button>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
