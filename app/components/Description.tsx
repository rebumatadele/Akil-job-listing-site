"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TiInputChecked } from "react-icons/ti";
import { IoLocationOutline } from "react-icons/io5";
import Icons from "./Icons";
import AboutItem from "./AboutItem";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ImFire } from "react-icons/im";
import { FaRegCalendarPlus } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";
import Buttons from "./Buttons";
type Type = {
  id: string;
  title: string;
  orgName: string;
  location: [];
  description: string;
  logoUrl: string;
  opType: string;
  categories: [];
  responsibilities: string;
  idealCandidate: string;
  whenAndWhere: string;
  datePosted: string;
  deadline: string;
  startDate: string;
  endDate: string;
  requiredSkills: []
};

interface Props {
  id: number;
}

const Description = ({ id }: Props) => {
  const [data, setData] = useState<Type>();
  useEffect(() => {
    async function FetchEntireData() {
      try {
        const res = await fetch(
          `https://akil-backend.onrender.com/opportunities/${id}`
        );
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

  // Date Format
  return (
    <>
      {/* {data?.title} */}
      {data && (
        <div className="flex flex-rows gap-16 justify-between	px-10 py-5 opacity-95 text-justify text-[#25324B] leading-6">
          <div className="flex flex-col basis-3/4">
            <div className="py-10">
              <h1 className="text-2xl font-bold mb-4">Description</h1>
              {data?.description}
            </div>
            <div className="">
              <h1 className="text-2xl font-bold mb-4">Responsibilities</h1>
              <ul>
                {data?.responsibilities.split("\n").map((el) => (
                  <li key={el} className="flex flex-row">
                    <div>
                      <TiInputChecked
                        size="25px"
                        color="#26A4FF"
                      ></TiInputChecked>
                    </div>
                    <div>{el}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-10">
              <h1 className="text-2xl font-bold mb-4">
                Ideal Candidate We Want
              </h1>
              <ul className="list-disc pl-5">
                {data?.idealCandidate.split(".").map((el, index) => {
                  const trimmedElement = el.trim();
                  return trimmedElement ? (
                    <li key={index}>
                      <div>{trimmedElement}</div>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-4">When & Where</h1>
              <div className="flex flex-row">
                <Icons Icon={IoLocationOutline}></Icons>
                <div className="px-3 mt-3">{data.whenAndWhere}</div>
              </div>
            </div>
          </div>

          <div className="basis-1/4">
            <h1 className="text-2xl font-bold mb-4">About</h1>
            <div className="flex flex-col gap-7">
              <div>
                <AboutItem
                  Icon={IoMdAddCircleOutline}
                  text="Posted On"
                  date={formatDate(data.datePosted)}
                ></AboutItem>
              </div>
              <div>
                <AboutItem
                  Icon={ImFire}
                  text="Deadline"
                  date={formatDate(data.deadline)}
                ></AboutItem>
              </div>
              <div>
                <AboutItem
                  Icon={IoLocationOutline}
                  text="Location"
                  date={data.location.join(",  ")}
                ></AboutItem>
              </div>
              <div>
                <AboutItem
                  Icon={FaRegCalendarPlus}
                  text="Start Date"
                  date={formatDate(data.startDate)}
                ></AboutItem>
              </div>
              <div>
                <AboutItem
                  Icon={FaRegCalendarCheck}
                  text="End Date"
                  date={formatDate(data.endDate)}
                ></AboutItem>
              </div>
            </div>

            {/* page Break */}
            <hr className="m-4" />
            <div>
              <h1 className="text-2xl font-bold mb-4">Categories</h1>
              <div className="flex flex-row flex-wrap">
                <Buttons>{data.categories}</Buttons>
              </div>
            </div>
                {/* Required Skills */}
            <hr className="m-4" />
            <div>
              <h1 className="text-2xl font-bold mb-4">Required Skills</h1>
              <div className="flex flex-row gap-4 flex-wrap">
                {data.requiredSkills.map(el => (
                  <span key={el} className="bg-[#F8F8FD] px-5 py-3">{el}</span>
                )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
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

export default Description;
