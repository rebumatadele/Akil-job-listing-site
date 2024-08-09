"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import BookmarkComponent from "./BookmarkComponent";

type Type = {
  dateBookmarked: string;
  datePosted: string;
  eventID: string;
  location: string;
  logoUrl: string;
  opType: string;
  orgName: string;
  title: string;
};

const Bookmark = () => {
  const session = async () => {
    const t = await getSession();
    return await t?.user?.accessToken;
  };

  const [data, setData] = useState<Type[]>([]);
  useEffect(() => {
    async function FetchEntireData() {
      const token = await session();
      try {
        const res = await fetch("https://akil-backend.onrender.com/bookmarks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json_data = await res.json();
        setData(json_data.data);
        console.log(data);
        return data;
      } catch (error) {
        console.log(error + " ERROR");
      }
    }
    FetchEntireData();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex justify-center text-5xl	font-black leading-6 h-20 py-10">
            My Bookmarks
          </div>
          {data && (
            <div className="text-gray-500 font-bold text-3xl px-52 mt-20">{data.length} Bookmarks</div>
          )}
        </div>
        {data && (
          <div className="flex flex-col items-center gap-5">
            <BookmarkComponent></BookmarkComponent>
          </div>
        )}
      </div>
    </>
  );
};

export default Bookmark;
