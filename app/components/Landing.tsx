"use client";
import React, { useEffect, useState } from "react";
import JobListCard from "./JobListCard";
type Type = {
    id: string;
    title: string;
    orgName: string;
    location: [];
    description: string;
    logoUrl: string;
    opType: string
    categories: []
  };

const Landing = () => {
  const [data, setData] = useState<Type[]>([]);
  useEffect(() => {
    async function FetchEntireData() {
      try {
        const res = await fetch(
          "https://akil-backend.onrender.com/opportunities/search",
          {}
        );
        const json_data = await res.json();
        setData(json_data.data);
        return data;
      } catch (error) {
        console.log(error + " ERROR");
      }
    }
    FetchEntireData(), []
  });
  return (
    <div className="p-10 flex flex-col gap-8">
      
      <div className="flex flex-row gap-5 justify-between">
        <div>
          <div className="text-2xl	font-semibold leading-6 ">Opportunities</div>
          <div className="text-gray-500">Showing {data.length} results</div>
        </div>
        <div>
          <span className="text-gray-500">sort by:</span>
          <select>
            <option value="">Most Relevant</option>
            <option value="option1">Least Relevant 1</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5">
      <JobListCard data = {data}></JobListCard>
      </div>
    </div>
  );
};

export default Landing;
