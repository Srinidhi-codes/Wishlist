"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdMenu } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import ImageView from "../ImageView";

const main = [
  {
    title: "Orders",
    icons: "/assets/orders.svg",
  },
  {
    title: "Subscriptions",
    icons: "/assets/subscription.svg",
  },
  {
    title: "Calendar",
    icons: "/assets/calendar.svg",
  },
  {
    title: "Waitlist",
    icons: "/assets/waitlist.svg",
  },
];

export default function Sidebar() {
  const [category, setCategory] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const filter = main.find((obj) => {
        return pathname === obj.path || pathname.startsWith(obj.path + "/");
      });
      setCategory(filter?.title || "");
    }
  }, [pathname]);

  return (
    <aside className={`shadow-sidebar h-full font-secondary-font bg-[#F8FAFC] custom-scrollbar flex items-center flex-col gap-2 px-5 py-5 ${toggleSidebar ? "w-20" : "w-72"}`}>
      <header className={`flex ${toggleSidebar ? "justify-center" : "justify-between"} w-full py-5`}>
        <ImageView className="cursor-pointer" onClick={() => setToggleSidebar(false)} width={22} height={22} src={"/assets/logo.svg"} />
        {!toggleSidebar && <><h3 className='text-[18px] font-bold flex gap-4 text-nowrap mr-5'>Front-Desk</h3>
          <ImageView className="cursor-pointer" onClick={() => setToggleSidebar(true)} width={20} height={16} src={"/assets/toggleSidebar.svg"} /></>}
      </header>

      <div className="flex justify-between w-full bg-white p-2 rounded-md shadow-md">
        {!toggleSidebar && <p>Location Name</p>}
        <ImageView width={22} height={22} src={"/assets/locationArrow.svg"} />
      </div>

      <div className={`bg-[#F1F5F9]  rounded-md shadow-md p-2 -mt-1 mb-[24px]`}>
        {!toggleSidebar && <div className="flex gap-x-2">
          <p className="text-[16px] font-bold">8:30 AM</p>
          <p className="text-[14px] font-medium">Tue 20 Jan</p>
        </div>}
        <div className="flex gap-x-2 justify-center items-end">
          <ImageView width={15} height={22} src={"/assets/globe.svg"} />
          {!toggleSidebar && <><p className="text-[10px] font-medium mr-8">UTC:+5 hours</p>
            <ImageView width={18} height={22} src={"/assets/downArrow.svg"} /></>}
        </div>
      </div>
      {main.map((routeObj) => (
        <div
          key={routeObj.title}
          onClick={() => setCategory(routeObj.title)}
          className={`p-3 mx-auto w-full ${category === routeObj.title ? "bg-white shadow-md" : "bg-transparent"} text-[12px] font-medium flex gap-3 items-center rounded-md cursor-pointer`}
        >
          <ImageView width={22} height={22} src={routeObj.icons} />
          {!toggleSidebar && <p>{routeObj.title}</p>}
        </div>
      ))}
      <div className="flex flex-col justify-end h-full gap-y-6">
        <div className="flex justify-start gap-3 w-full p-2">
          {!toggleSidebar && <><ImageView width={22} height={22} src={"/assets/layout-dashboard.svg"} />
            <p className="mr-12">Dashboard</p></>}
          <ImageView width={22} height={22} src={"/assets/external.svg"} />
        </div>

        <div className="flex justify-between items-center w-full bg-white p-2 rounded-md shadow-md">
          <ImageView width={30} height={22} src={"/assets/userLogo.svg"} />
          {!toggleSidebar && <> <div>
            <p className="text-[12px] font-medium">Admin Name</p>
            <p className="text-[#64748B] text-[12px]">adminname@mail.com</p>
          </div>
            <ImageView width={22} height={22} src={"/assets/downArrow.svg"} /></>}
        </div>
        <div className="flex justify-around items-center w-full">
          <ImageView width={24} height={22} src={"/assets/help-circle.svg"} />
          {!toggleSidebar && (
            <div>
              <p className="text-[#64748B] text-[12px] font-medium">Help center</p>
              <p className="text-[#64748B] text-[10px]">@2024 Omnify.Inc.</p>
            </div>
          )}
          {!toggleSidebar && <ImageView width={22} height={22} src={"/assets/downArrow.svg"} />}
        </div>
      </div>
    </aside>
  );
}
