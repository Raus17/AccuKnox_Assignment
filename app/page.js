import Image from "next/image";
import Intro from "@/components/Intro";
import CSPMDashboard from "@/components/CSPMDashboard";
import CWPPDashboard from "@/components/CWPPDashboard";
import RegistryScan from "@/components/RegistryScan";

export default function Home() {
  return (
    <div className=" p-4 m-4">
      <Intro />
      <CSPMDashboard/>
      <CWPPDashboard/>
      <RegistryScan/>
    </div>
  );
}
