"use client";

import Sidebar from "./Sidebar.jsx";

export default function Layout({ children }) {

  return (
    <div className="flex flex-col h-screen overflow-y-hidden  w-full">
      <div className="flex h-full grow">
        <Sidebar />
        <div className="overflow-y-auto custom-scrollbar min-h-screen w-full p-6 pb-24 ">
          {children}
        </div>
      </div>
    </div>
  );
}
