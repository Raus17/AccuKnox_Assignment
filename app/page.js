import Image from "next/image";

export default function Home() {
  return (
    <div className=" p-4 m-4">
      <div className="flex items-center justify-between p-4">
        <p className="text-lg font-semibold">CNAPP DASHBOARD</p>
        <div className="flex gap-4">
          <button className="px-3 py-1 bg-gray-300 text-white rounded">
            Add Widget
          </button>
          <button className="px-3 py-1 rounded">
            Refresh
          </button>
          <button className="px-3 py-1 bg-gray-700 text-white rounded">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
