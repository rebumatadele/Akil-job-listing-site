"use client";
import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";
import Link from "next/link";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { getSession } from "next-auth/react";

type Type = {
  id: string;
  title: string;
  orgName: string;
  location: string[];
  description: string;
  logoUrl: string;
  opType: string;
  categories: string[];
};

type BookmarkType = {
  dateBookmarked: string;
  datePosted: string;
  eventID: string;
  location: string;
  logoUrl: string;
  opType: string;
  orgName: string;
  title: string;
};

interface Props {
  data: Type[];
}

const JobListCard = ({ data }: Props) => {
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchBookmarks() {
      const session = await getSession();
      const token = session?.user?.accessToken;

      if (token) {
        try {
          const res = await fetch("https://akil-backend.onrender.com/bookmarks", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const json_data = await res.json();
          const bookmarks = json_data.data || [];

          const initialBookmarks = bookmarks.reduce((acc: Record<string, boolean>, item: BookmarkType) => {
            acc[item.eventID] = true;
            return acc;
          }, {});

          setBookmarked(initialBookmarks);
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        }
      }
    }

    fetchBookmarks();
  }, []);

  const toggleBookmark = (eventID: string) => {
    setBookmarked((prev) => {
      const isBookmarked = !prev[eventID];
      const tokenRequest = async () => {
        const session = await getSession();
        const token = session?.user?.accessToken;

        if (token) {
          try {
            if (isBookmarked) {
              await fetch(`https://akil-backend.onrender.com/bookmarks/${eventID}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(`Bookmarked item with eventID: ${eventID}`);
            } else {
              await fetch(`https://akil-backend.onrender.com/bookmarks/${eventID}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(`Removed bookmark for item with eventID: ${eventID}`);
            }
          } catch (error) {
            console.error(`Error updating bookmark for eventID ${eventID}:`, error);
          }
        }
      };

      tokenRequest();

      return {
        ...prev,
        [eventID]: isBookmarked,
      };
    });
  };

  return (
    <>
      {data &&
        data.map((d) => (
          <div key={d.id} className=" flex font-sans w-[950px] relative">
            <Link href={`/joblist/${d.id}`}>
              <div className="flex flex-row gap-4 w-[950px] border-2 border-gray-100 shadow-lg px-4 py-4 rounded-3xl">
                <img
                  src={d.logoUrl}
                  alt="LOGO"
                  className="w-16 h-14 rounded-full"
                />
                <div className="flex-shrink">
                  <div className="text-2xl	font-semibold leading-6">
                    {d.title}{" "}
                  </div>
                  <div className="flex flex-row gap-4 flex-shrink font-semibold text-base sub-header-color py-1.5">
                    <div>{d.orgName}</div>
                    <div> . </div>
                    <div>
                      {d.location.map((loc) => (
                        <span key={loc} className="px-2">
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <article className="py-1.5 text-justify text-wrap	flex-shrink">
                    {d.description}
                  </article>
                  <div className="flex flex-row gap-2">
                    <span className="h-12 flex items-center self-center text-custom-color font-bold custom-background rounded-3xl px-6">
                      {d.opType === "inPerson" ? "In Person" : "Virtual"}
                    </span>
                    <div className="border-r-2 h-12 self-center border-[#D6DDEB]"></div>
                    <Buttons>{d.categories}</Buttons>
                  </div>
                </div>
              </div>
            </Link>
            <div
              className="absolute top-5 right-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Stop event propagation to prevent link click
                toggleBookmark(d.id);
              }}
            >
              {bookmarked[d.id] ? (
                <FaBookmark className="text-xl text-yellow-500" />
              ) : (
                <FaRegBookmark className="text-xl text-gray-500" />
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default JobListCard;
