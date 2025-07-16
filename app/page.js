"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Level from "./assets/images/job-listing/level.png";
import Location from "./assets/images/job-listing/location.png";
import People from "./assets/images/job-listing/person.png";
import Search from "./components/search";

import { useRouter } from "next/navigation";
import { getToken } from "./utils/auth";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    fetch("https://api.mnimedu.com/api/browse/pro-jobs/")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="bg-secondary py-[92px]">
        <Search />
      </div>
      <div className="container mx-auto max-w-[1400px]">
        <div className="py-[137px]">
          <div>
            <h1 className="font-bold text-[32px] text-gray-600 mb-[30px]">
              {jobs.length} search result found
            </h1>
          </div>

          <div className="p-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[30px]">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="pl-[20px] pr-[40px] pt-[24px] pb-[33px] bg-[#ffffff] hover:drop-shadow-xl transition rounded-b-xl"
                >
                  <p className="text-[14px] font-normal text-gray-400">
                    {job.created_at}
                  </p>
                  <h2 className="text-[20px] font-bold text-gray-500 pt-[9px] pb-[22px]">
                    {job.category.title}
                  </h2>
                  <div className="flex justify-between items-center px-[22px] py-[11px] bg-gray-100 rounded text-gray-400">
                    <p className="text-[14px] font-normal text-gray-400">
                      {job.budget_type}
                    </p>
                    <div className="flex text-[14px] font-semibold text-gray-500">
                      <p>{`$${job.rate_from}`}</p>
                      <p>-</p>
                      <p>{`$${job.rate_to}`}</p>
                    </div>
                  </div>
                  <p className="text-[14px] font-normal text-gray-500 pt-[20px] pb-[34px]">
                    {job.job_description}
                  </p>
                  <div className="flex gap-[10px]">
                    <div className="flex items-center gap-[5px] bg-[#FAF7FF] p-[5px] rounded-full">
                      <Image src={Location} alt="icon" />
                      <p className="text-[#9747FF]">Remote</p>
                    </div>
                    <div className="flex items-center gap-[5px] bg-[#FFF5F5] p-[5px] rounded-full">
                      <Image src={Level} alt="icon" />
                      <p className="text-[#DB3131]">Senior Level</p>
                    </div>
                    <div className="flex items-center gap-[5px] bg-[#E9FFEE] p-[5px] rounded-full">
                      <Image src={People} alt="icon" />
                      <p className="text-[#05AF2B]">Freelancer</p>
                    </div>
                  </div>
                  <div>
                    <ul className="flex justify-between items-center pt-[34px] pb-[16px]">
                      <li className="bg-gray-100 rounded-full py-[4px] px-[16px] text-gray-900 text-[14px] font-semibold">
                        App Design
                      </li>
                      <li className="bg-gray-100 rounded-full py-[4px] px-[16px] text-gray-900 text-[14px] font-semibold">
                        Art Genaration
                      </li>
                      <li className="bg-gray-100 rounded-full py-[4px] px-[16px] text-gray-900 text-[14px] font-semibold">
                        Illustration
                      </li>
                    </ul>
                  </div>
                  <div className="h-[2px] bg-gray-100"></div>
                  <div className="flex gap-[5px] mt-[16px] mb-[20px]">
                    <p className="text-[14px] font-normal text-gray-200">
                      Posted by
                    </p>
                    <p className="text-[14px] font-semibold text-gray-800">
                      Eamman Olio
                    </p>
                  </div>
                  <button className="bg-gray-900 px-[24px] py-[9px] rounded-full text-[14px] font-semibold hover:bg-primary transition cursor-pointer">
                    Apply Now
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
