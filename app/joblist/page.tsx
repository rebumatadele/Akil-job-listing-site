import React from "react";
import Landing from "../components/Landing";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent('/joblist')}`);
  }
  return (
    <>
      <Landing></Landing>
    </>
  );
};

export default page;
