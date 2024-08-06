import Landing from "./components/Landing";
// import Link from "next/link";
import JobList from "./joblist/page";
export default async function Home() {
  return (
    <>
      {/* <Link href={"/joblist"}></Link> */}
      <JobList></JobList>

    </>
  );
}
