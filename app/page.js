import Image from "next/image";
import Intro from "@/components/Intro";
import CSPMDashboard from "@/components/CSPMDashboard";

export default function Home() {
  return (
    <div className=" p-4 m-4">
      <Intro />
      <CSPMDashboard/>
    </div>
  );
}
