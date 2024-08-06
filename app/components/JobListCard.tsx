/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import Link from "next/link";
type Type = {
  id: string;
  title: string;
  orgName: string;
  location: [];
  description: string;
  logoUrl: string;
  opType: string;
  categories: [];
};
interface Props {
  data: Type[];
}
const JobListCard = ({ data }: Props) => {
  return (
    <>
      {data &&
        data.map((d) => (
          <Link key={d.id} href={`/joblist/${d.id}`}>
            <div className="font-sans max-w-[950px]" key={d.id}>
              <div className="flex flex-row gap-4 border-2 border-gray-100 shadow-lg px-4 py-4 rounded-3xl">
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
            </div>
          </Link>
        ))}
    </>
  );
};
export default JobListCard;
