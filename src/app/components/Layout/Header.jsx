"use client";

import "./header.css";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import ImageView from "../ImageView";

const searchIcon = "/assets/icons/search.svg";
const settingIcon = "/assets/icons/settings.svg";
const adminProfile = "/assets/icons/admin-profile.svg";
const moreInfo = "/assets/icons/more.svg";
const notification = "/assets/icons/notification.svg";
const gamerGoldLogo = "/assets/images/gamergold-logo.png";

export default function Header() {
  const [selected, setSelected] = useState("US");
  const notificationCount = 2;

  const customLabels = {
    US: "English",
    PT: "PT",
  };

  return (
    <nav className='text-white border-b border-[#3C3854] bg-[#141420] py-3 font-secondary-font px-1 w-full flex items-center'>
      <ImageView
        src={gamerGoldLogo}
        alt='logo'
        width={150}
        height={30}
        className='ml-4'
      />
      <div className='ml-auto mr-8 flex items-center gap-6'>
        <button className='cursor-pointer'>
          <ImageView alt='settings' src={settingIcon} width={18} height={18} />
        </button>
        <div className='flex items-center mr-2 gap-3'>
          <div className='text-white'>
            <p className='text-sm'>Name</p>
          </div>
          <ImageView
            src={adminProfile}
            alt='Admin Profile'
            width={35}
            height={35}
          />
        </div>
        <div className='w-[100px]  h-[40px] flex items-center justify-center'>
          <ReactFlagsSelect
            placeholder=' '
            selected={selected}
            countries={["US", "PT"]}
            selectButtonClassName='language-select'
            customLabels={customLabels}
            onSelect={(code) => setSelected(code)}
          />
        </div>
      </div>
    </nav>
  );
}
