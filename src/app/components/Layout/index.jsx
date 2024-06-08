"use client";

import { usePathname } from "next/navigation";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children }) {
  const pathName = usePathname();

  return (
    <div className="flex flex-col h-screen overflow-y-hidden  w-full">
      <Header />
      <div className="flex h-full grow">
        {pathName !== "/signin" ? <Sidebar /> : null}
        <div className="bg-[#141420] text-white overflow-y-auto custom-scrollbar min-h-screen w-full p-6 pb-24 ">
          {children}
        </div>
      </div>
    </div>
  );
}
