"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdMenu } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";


const main = [
  {
    title: "Dashboard",
    path: "/",
  },
  {
    title: "Products",
    path: "/products",
  },
  {
    title: "Design",
    path: "/design",
  },
  {
    title: "Sales",
    path: "/sales",
    children: [
      {
        title: "Orders",
        path: "/orders",
      },
      {
        title: "Recurring Orders",
        path: "/recurring-orders",
      },
      {
        title: "Product Returns",
        path: "/product-returns",
      },
      {
        title: "Gift Vouchers",
        path: "/gift-vouchers",
      },
      {
        title: "Vouchers Themes",
        path: "/voucher-themes",
      },
    ],
  },
  {
    title: "Customers",
    path: "/customers",
    children: [
      {
        title: "Customers",
        path: "",
      },
      {
        title: "Customer Groups",
        path: "/customer-groups",
      },
      {
        title: "Customer Approvals",
        path: "/customer-approvals",
      },
      {
        title: "Custom Fields",
        path: "/custom-fields",
      },
    ],
  },
  {
    title: "Marketing",
    path: "/marketing",
    children: [
      {
        title: "Marketing",
        path: "",
      },
      {
        title: "Coupons",
        path: "/coupons",
      },
      {
        title: "Track Conversions",
        path: "/track-conversions",
      },
    ],
  },
  {
    title: "System",
    path: "/system",
  },
  {
    title: "Reports",
    path: "/reports",
    children: [
      {
        title: "Contacts from History",
        path: "/contact-from-history",
      },
      {
        title: "Reports",
        path: "",
      },
      {
        title: "Who's Online",
        path: "/online",
      },
      {
        title: "Statistics",
        path: "/statistics",
      },
    ],
  },
  {
    title: "Reseller",
    path: "/reseller",
    children: [
      {
        title: "Balance",
        path: "/balance",
      },
      {
        title: "Products",
        path: "/products",
      },
      {
        title: "History",
        path: "/history",
      },
      {
        title: "Store Approval",
        path: "/store-approval",
      },
      {
        title: "Commission",
        path: "/commission",
      },
    ],
  },
  {
    title: "RV Hub",
    path: "/rv-hub",
    children: [
      {
        title: "Portfolio",
        path: "/portfolio",
      },
      {
        title: "Report",
        path: "/report",
      },
      {
        title: "Settings",
        path: "/settings",
      },
      {
        title: "Information log",
        path: "/information-log",
      },
    ],
  },
  {
    title: "Gift cards",
    path: "/gift-cards",
    children: [
      {
        title: "Category",
        path: "/category",
      },
      {
        title: "Settings",
        path: "/settings",
      },
      {
        title: "Information log",
        path: "/information-log",
      },
    ],
  },
  {
    title: "Elite days",
    path: "/elite-days",
    children: [
      {
        title: "Catalog",
        path: "/catalog",
      },
      {
        title: "Reports",
        path: "/reports",
      },
      {
        title: "Settings",
        path: "/settings",
      },
      {
        title: "Information log",
        path: "/information-log",
      },
    ],
  },
  {
    title: "Jolly Max",
    path: "/jolly-max",
    children: [
      {
        title: "Catalog",
        path: "/catalog",
      },
      {
        title: "Reports",
        path: "/reports",
      },
      {
        title: "Settings",
        path: "/settings",
      },
      {
        title: "Information log",
        path: "/information-log",
      },
    ],
  },
  {
    title: "Wallet",
    path: "/wallet",
  },
];

export default function Sidebar() {
  const [category, setCategory] = useState("");
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
    <aside className='shadow-sidebar h-full w-72 font-secondary-font bg-[#2E2E49] custom-scrollbar flex items-center flex-col gap-2 pt-4 pr-4 pb-24 overflow-y-auto text-white '>
      <header className='flex  items-center gap-1 justify-start -ml-10 mb-3 w-40'>
        <MdMenu fill='white' size={24} />
        <h3 className='text-[18px] font-medium'>Navigation</h3>
      </header>

      {main.map((routeObj, i) => {
        return (
          <IndLink
            key={i}
            routeObj={routeObj}
            category={category}
            setCategory={setCategory}
          />
        );
      })}
    </aside>
  );
}

function IndLink({
  routeObj,
  category,
  setCategory,
}) {
  const pathname = usePathname();
  const { children } = routeObj;

  const handleClick = () => {
    if (category === routeObj.title) {
      const filter = main.filter((obj) => obj.path.includes(pathname));
      setCategory(filter[0]?.title);
    } else {
      setCategory(routeObj.title);
    }
  };

  if (children) {
    return (
      <div className='w-full cursor-pointer'>
        <div
          onClick={handleClick}
          className={`relative w-full flex items-center before:absolute before:left-0 before:w-1 before:h-10 before:rounded-lg ${category === routeObj.title
              ? "before:bg-[#4880FF]  "
              : "before:bg-transparent "
            } `}
        >
          <button
            className={`py-3 px-5 mx-auto w-[10rem]  ${category === routeObj.title ? "bg-[#4880FF] " : "bg-transparent"
              }  text-xs  font-medium flex items-center   rounded-md`}
          >
            {routeObj.title}
          </button>
          <button className=''>
            <IoIosArrowDown />
          </button>
        </div>

        <div
          className={`flex flex-col gap-4 mx-auto w-[60%]  overflow-hidden transition-all duration-500 ease-in-out ${category === routeObj.title ? "max-h-screen mt-3" : "max-h-0"
            }`}
        >
          {children &&
            children.map((obj, i) => {
              return (
                <Link
                  href={routeObj?.path + obj?.path}
                  key={i}
                  className={`text-xs font-light hover:font-medium ${pathname === routeObj?.path + obj?.path ? "font-medium" : ""
                    }`}
                >
                  {obj.title}
                </Link>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={routeObj.path}
      onClick={handleClick}
      className={`relative w-full flex items-center before:absolute  before:left-0 before:w-1 before:h-10 before:rounded-lg ${category === routeObj.title
          ? "before:bg-[#4880FF]"
          : "before:bg-transparent"
        } `}
    >
      <button
        className={`py-3 px-5 mx-auto w-[10rem]  ${category === routeObj.title ? "bg-[#4880FF] " : "bg-transparent"
          }  text-xs  font-medium flex items-center   rounded-md`}
      >
        {routeObj.title}
      </button>
      <button className='opacity-0'>
        <IoIosArrowDown />
      </button>
    </Link>
  );
}
