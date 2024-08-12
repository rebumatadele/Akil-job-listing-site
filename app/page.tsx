import JobList from "./joblist/page";
import Image from "next/image";
export default async function Home() {
  return (
    <>
      <div className="flex px-20 rounded-b-3xl bg-[#E9EBFD]">
        <div className="w-1/2">
          <div className="flex flex-col gap-5 py-10 px-5">
            <div className="flex flex-col">
              <span className="text-[#8A86E7] font-black text-7xl">Serve,</span>
              <span className="text-[#8A86E7] font-black text-7xl">
                Connect,
              </span>
              <span className="text-[#8A86E7] font-black text-7xl">Grow,</span>
            </div>
            <div className="">
              <Image
                src="/images/stroke.png"
                width={450}
                height={32}
                alt="Strike through"
              />
            </div>
            <div className="text-[#515B6F] text-lg w-full">
              Akil connects passionate individuals with impactful NGOs,
              empowering communities worldwide.
            </div>
            <div className="flex gap-5">
              <button className="bg-[#2D298E] hover:bg-[#3532a3] text-white font-bold rounded-full px-16 py-4 duration-100">
                Sign Up
              </button>
              <button className="text-[#2D298E] border border-[#2D298E] hover:bg-[#3532a3] hover:text-white font-bold rounded-full px-16 py-4 duration-100">
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Image
            src="/images/hero.png"
            width={616}
            height={659}
            alt="Hero Picture"
          />
        </div>
      </div>
      <div>Demo</div>
    </>
  );
}
