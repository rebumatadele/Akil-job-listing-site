"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { getSession } from "next-auth/react";

type BookMarkType = {
  dateBookmarked: string;
  datePosted: string;
  eventID: string;
  location: string;
  logoUrl: string;
  opType: string;
  orgName: string;
  title: string;
};

const BookmarkComponent = () => {
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [items, setItems] = useState<BookMarkType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getSession()?.then(
          (session) => session?.user?.accessToken
        );

        const response = await fetch(
          `https://akil-backend.onrender.com/bookmarks`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json_data = await response.json();
        const data = json_data.data;
        setItems(data);

        const initialBookmarks: Record<string, boolean> = {};
        data.forEach((item: BookMarkType) => {
          initialBookmarks[item.eventID] = true; // Set all items as initially bookmarked
        });
        setBookmarked(initialBookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchData();
  }, []);

  const toggleBookmark = async (eventID: string) => {
    const isBookmarked = bookmarked[eventID];
    const token = await getSession()?.then(
      (session) => session?.user?.accessToken
    );

    if (isBookmarked) {
      try {
        // Send DELETE request to remove bookmark
        await fetch(`https://akil-backend.onrender.com/bookmarks/${eventID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`Removed bookmark for item with eventID: ${eventID}`);

        // Remove the item from the state to stop rendering it
        setItems((prevData) =>
          prevData.filter((item) => item.eventID !== eventID)
        );
        setBookmarked((prev) => {
          const { [eventID]: _, ...rest } = prev;
          return rest;
        });
      } catch (error) {
        console.error("Error removing bookmark:", error);
      }
    } else {
      // Handle the case for adding a bookmark if needed
    }

    // Toggle the bookmark state
    setBookmarked((prev) => ({
      ...prev,
      [eventID]: !isBookmarked,
    }));
  };

  return (
    <>
      {items &&
        items.map((item) => (
          <div className="flex font-sans w-[950px] relative" key={item.eventID}>
            <Link key={item.eventID} href={`/joblist/${item.eventID}`}>
              <div
                className="flex flex-row gap-4 w-[950px] border-2 border-gray-100 shadow-lg px-4 py-4 rounded-3xl "
                data-testid={`bookmark-item-${item.eventID}`}
              >
                <img
                  src={item.logoUrl}
                  alt="LOGO"
                  className="w-16 h-14 rounded-full"
                />
                <div className="flex-shrink">
                  <div className="text-2xl font-semibold leading-6">
                    {item.title}
                  </div>
                  <div className="flex flex-row gap-4 flex-shrink font-semibold text-base sub-header-color py-1.5">
                    <div>{item.orgName}</div>
                    <div> . </div>
                    <div>
                      <span className="px-2">{item.location}</span>
                    </div>
                  </div>

                  <article
                    data-testid="bookmark-date"
                    className="py-1.5 text-justify text-wrap flex-shrink"
                  >
                    <span>Bookmarked on : </span>
                    {formatDate(item.dateBookmarked)}
                  </article>

                  <div className="flex flex-row gap-2">
                    <span className="h-12 flex items-center self-center text-custom-color font-bold custom-background rounded-3xl px-6">
                      {item.opType === "inPerson" ? "In Person" : "Virtual"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <div
              className="absolute top-5 right-5 cursor-pointer"
              data-testid={`bookmark-icon-${item.eventID}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent navigating to the link
                toggleBookmark(item.eventID);
              }}
            >
              {bookmarked[item.eventID] ? (
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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export default BookmarkComponent;
