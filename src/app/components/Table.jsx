"use client"

import { useState } from "react";
import { TableData } from "../constants/TableData";
import ImageView from "./ImageView";
import InputField from "./InputField";
import Filter from "./Filter";

const Table = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchPayer, setSearchPayer] = useState("")

    const renderRows = () => {
        return TableData.filter(data => data.payer.toLowerCase().includes(searchPayer.toLowerCase())).map((data, index) => {
            const isLastRow = index === TableData.length - 1;
            const borderBottomClass = isLastRow ? "" : "border-b border-[#9797973b]";
            const handleCheckboxChange = (e) => {
                const isChecked = e.target.checked;
                const dataId = data?.id;

                if (isChecked) {
                    setSelectedItems((prevSelectedItems) => [
                        ...prevSelectedItems,
                        dataId
                    ]);
                } else {
                    setSelectedItems((prevSelectedItems) =>
                        prevSelectedItems.filter((id) => id !== dataId)
                    );
                }
            };

            return (
                <tr
                    key={data?.id}
                    className={`h-[70px] ${borderBottomClass} `}
                >
                    <td>
                        <div className="flex items-center gap-x-2 pl-2 ">
                            <InputField
                                type="checkbox"
                                id={`myCheckbox-${data?.id}`}
                                name={`myCheckbox-${data?.id}`}
                                value="true"
                                onChange={handleCheckboxChange}
                                checked={selectedItems.includes(data?.id)}
                                className="bg-transparent name-checkbox ml-4 w-3 h-3 form-checkbox cursor-pointer border-2 border-red-1000"
                            />
                            <p className="text-nowrap">{data?.created}</p>
                        </div>
                    </td>
                    <td>
                        <p className="capitalize">{data?.payer}</p>
                    </td>
                    <td>
                        <div className={`capitalize rounded-full p-1  w-[5rem] flex gap-x-2 justify-center items-center text-center
                        ${data.status === "Active" ? "text-[#15803D] bg-[#F0FDF9]" : ""} 
                        ${data.status === "Inactive" ? "text-[#334155] bg-[#F1F5F9]" : ""} 
                        ${data.status === "Lead" ? "text-[#3B82F6] bg-[#EFF6FF]" : ""}`}>
                            <div className={`h-2 w-2 rounded-full 
                                            ${data.status === "Active" ? "bg-[#15803D]" : ""} 
                                            ${data.status === "Inactive" ? "bg-[#334155]" : ""} 
                                            ${data.status === "Lead" ? "bg-[#3B82F6]" : ""}`}></div>
                            <p>{data?.status}</p>
                        </div>
                    </td>
                    <td>
                        <p className="w-[10rem]">{data?.email}</p>
                    </td>
                    <td>
                        <p>{data?.phone}</p>
                    </td>
                    <td>
                        <p>{data?.services}</p>
                    </td>
                    <td>
                        <p>{data?.scheduled}</p>
                    </td>
                </tr>
            );
        });
    };

    return (
        <>
            <TableHeader searchPayer={searchPayer} setSearchPayer={setSearchPayer} />
            <div className="w-full border border-[#E2E8F0] rounded-2xl overflow-x-scroll">
                <table className="table-auto w-full rounded-[20px]">
                    <thead className="bg-transparent h-[50px] text-left text-[#64748B] text-[12px]">
                        <tr>
                            <th className="bg-[#EBEEF0] rounded-tl-[15px] font-medium pl-8">
                                <p className='flex gap-x-2'><ImageView src="/assets/calendar.svg" alt="logo" width={12} height={12} />Created On</p>
                            </th>
                            <th className="bg-[#EBEEF0] font-medium">
                                <p className='flex gap-x-2'><ImageView src="/assets/user.svg" alt="logo" width={12} height={12} />Payer</p>
                            </th>
                            <th className="bg-[#EBEEF0] font-medium">
                                <p className='flex gap-x-2'><ImageView src="/assets/status.svg" alt="logo" width={12} height={12} />Status</p>
                            </th>
                            <th className="bg-[#EBEEF0] font-medium">
                                <p className='flex gap-x-2'><ImageView src="/assets/hash.svg" alt="logo" width={12} height={12} />Email</p>
                            </th>
                            <th className="bg-[#EBEEF0] font-medium">
                                <p className='flex gap-x-2'><ImageView src="/assets/hash.svg" alt="logo" width={12} height={12} />Payer Phone</p>
                            </th>
                            <th className="bg-[#EBEEF0] font-medium">
                                <p className='flex gap-x-2'><ImageView src="/assets/hash.svg" alt="logo" width={12} height={12} />Services</p>
                            </th>
                            <th className="bg-[#EBEEF0] font-medium rounded-tr-[15px]">
                                <p className='flex gap-x-2'><ImageView src="/assets/calendar.svg" alt="logo" width={12} height={12} />Scheduled</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent text-[14px] font-medium">
                        {renderRows()}
                    </tbody>
                </table>
            </div >
        </>
    );
};

export default Table;


export const TableHeader = ({ searchPayer, setSearchPayer }) => {
    const [showFilter, setShowFilter] = useState(false);
    return (
        <div className="py-5">
            <header className='h-[168px] w-full p-3'>
                <h1 className='text-[#334155] text-[20px] font-semibold'>Waitlist</h1>
                <div className='flex gap-x-5 py-5'>
                    <div className='text-[12px] font-semibold p-3 w-[359.33px] rounded-md border'>All Waitlists <span className='text-[10px] font-medium ml-2'>100</span></div>
                    <div className='text-[12px] font-semibold p-3 w-[359.33px] rounded-md border'>Newly Added <span className='text-[10px] font-medium ml-2'>50</span></div>
                    <div className='text-[12px] font-semibold p-3 w-[359.33px] rounded-md border'>Leads <span className='text-[10px] font-medium ml-2'>20</span></div>
                </div>
            </header>
            <div className='w-full flex justify-between relative'>
                <div className='flex cursor-pointer gap-x-3 bg-[#F1F5F9] p-2 rounded-md'>
                    <ImageView src="/assets/filter.svg" alt="filter" width={16} height={20} />
                    <p onClick={() => setShowFilter(!showFilter)} className='text-[12px] font-medium w-full h-full'>Add Filter</p>
                    {showFilter && <Filter />}
                </div>
                <div className='flex gap-x-3 relative'>
                    <InputField placeholder={"Search client"} value={searchPayer} onChange={(e) => setSearchPayer(e.target.value)} className={"rounded-md shadow-sm pl-12"} />
                    <ImageView src="/assets/search.svg" alt="filter" className="absolute top-2 left-3" width={18} height={20} />
                    <ImageView src="/assets/refresh.svg" alt="filter" width={40} height={20} />
                    <ImageView src="/assets/column.svg" alt="filter" width={40} height={20} />
                    <ImageView src="/assets/download.svg" alt="filter" width={40} height={20} />
                </div>
            </div>
        </div>
    )
}