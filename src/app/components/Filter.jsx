"use client"
import React, { useState } from 'react';
import ImageView from './ImageView';
import Select from './Select';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from 'antd';
import InputField from './InputField';

const Filter = () => {
    const [filterMethod, selectFilterMethod] = useState("Scheduled Date")
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [search, setSearch] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [order, setOrder] = useState("");
    const [status, setStatus] = useState("");

    const resetFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setSearch("");
        setServiceType("");
        setStatus("");
        selectFilterMethod("Scheduled Date");
    };

    const filterType = [
        {
            data: "Scheduled Date",
            icon: "/assets/calendar.svg"
        },
        {
            data: "People",
            icon: "/assets/users.svg"
        },
        {
            data: "Services/Products",
            icon: "/assets/layout-dashboard.svg"
        }
    ];

    return (
        <div className='w-[612px] h-[400px] bg-white'>
            <div className='flex h-full'>
                <ul className='bg-[#F8FAFC] p-2 border-r'>
                    {filterType.map((item) => (
                        <li onClick={() => selectFilterMethod(item.data)} className={`flex cursor-pointer gap-2 w-[250px] p-2 rounded-lg text-[14px] font-medium ${filterMethod === item.data ? "bg-[#E2E8F0]" : ""}`} key={item.data}>
                            <ImageView width={16} height={16} src={item.icon} />
                            {item.data}
                        </li>
                    ))}
                </ul>
                {filterMethod === "Scheduled Date" && <ScheduledDate />}
                {filterMethod === "People" && <People />}
                {filterMethod === "Services/Products" && <Services />}
            </div>
            <div className='border-t flex justify-end px-2 gap-x-4 p-2 bg-white'>
                <button onClick={resetFilters} className='bg-[#F4F4F5] text-[14px] font-medium px-3 py-2 rounded-lg'>Reset to default</button>
                <button className='text-white text-[14px] font-medium bg-black px-4 py-2 rounded-lg'>Apply</button>
            </div>
        </div>
    );
};

export default Filter;

export const ScheduledDate = ({ startDate, setStartDate, endDate, setEndDate, order, setOrder }) => {
    return (
        <>
            <div className='flex flex-col p-3 gap-2'>
                <label className='text-[12px] font-medium'>Show orders for</label>
                <Select
                    name="orders"
                    value={order}
                    placeholder="All"
                    className="w-[350px] h-[40px] border border-[#E4E4E7] rounded-lg "
                    options={[
                        { label: "All", value: "All" },
                        { label: "Custom", value: "Custom" },
                        { label: "Last 30 days", value: "Last 30 days" },
                        { label: "This month", value: "This month" },
                        { label: "Last month", value: "Last month" },
                        { label: "This quarter", value: "This quarter" },
                        { label: "2 quarter ago", value: "2 quarter ago" },
                    ]}
                    onChange={value => setOrder(value)}
                />
                <div className='flex gap-[19px]'>
                    <div className='flex flex-col gap-2 '>
                        <label className='text-[12px] font-medium'>From</label>
                        <DatePicker
                            selected={startDate}
                            placeholder='Pick a date'
                            onChange={date => setStartDate(date)}
                            className="w-[150px] h-[40px] text-[18px] rounded-lg border placeholder:text-[1rem] placeholder:text-black"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-[12px] font-medium'>To</label>
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            placeholder='Pick a date'
                            className="w-[150px] h-[40px] text-[18px] rounded-lg border placeholder:text-[1rem] placeholder:text-black"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const People = ({ search, setSearch }) => (
    <div className='flex flex-col gap-y-2 p-4 w-full'>
        <InputField
            name="search"
            value={search}
            placeholder="Search Payer or attendee name"
            className="w-[300px] h-[28px] border rounded-md bg-[#F9FAFB] text-[14px] font-normal p-3 pl-8"
            onChange={e => setSearch(e.target.value)}
        />
    </div>
);

export const Services = () => {
    const [searchType, setSearchType] = useState("name");

    return (
        <div className='flex flex-col w-full p-3 gap-y-8'>
            <div className='flex gap-x-5'>
                <label className="flex items-center">
                    <InputField
                        type="radio"
                        name="selectAllCheckbox"
                        value="name"
                        checked={searchType === "name"}
                        onChange={() => setSearchType("name")}
                        className="bg-transparent w-3 cursor-pointer border-gray-200"
                    />
                    <span className="ml-2">Search by name</span>
                </label>
                <label className="flex items-center">
                    <InputField
                        type="radio"
                        name="selectAllCheckbox"
                        value="tags"
                        checked={searchType === "tags"}
                        onChange={() => setSearchType("tags")}
                        className="bg-transparent text-[14px] w-3 cursor-pointer border-gray-200"
                    />
                    <span className="ml-2">Search by tags</span>
                </label>
            </div>
            <div className='flex flex-col gap-y-2'>
                {searchType === "name" ? (
                    <InputField
                        name="search"
                        value=""
                        placeholder="Search Payer or attendee name"
                        className="w-[350px] h-[28px] bg-[#F9FAFB] border rounded-md text-[14px] font-normal p-3 pl-8"
                    />
                ) : (
                    <>
                        <div className='flex flex-col gap-y-2'>
                            <label className='text-[12px] font-medium'>Service type</label>
                            <Select
                                name="serviceType"
                                // value={}
                                placeholder="Show all service type"
                                className="w-[350px] h-[40px] border border-[#E4E4E7] rounded-lg "
                                options={[
                                    { label: "All", value: "All" },
                                    { label: "Custom", value: "Custom" },
                                    { label: "Last 30 days", value: "Last 30 days" },
                                    { label: "This month", value: "This month" },
                                    { label: "Last month", value: "Last month" },
                                    { label: "This quarter", value: "This quarter" },
                                    { label: "2 quarters ago", value: "2 quarters ago" },
                                ]}
                            // onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label className='text-[12px] font-medium'>Status</label>
                            <Select
                                name="status"
                                // value={}
                                placeholder="Select service type"
                                className="w-[350px] h-[40px] border border-[#E4E4E7] rounded-lg "
                                options={[
                                    { label: "All", value: "All" },
                                    { label: "Custom", value: "Custom" },
                                    { label: "Last 30 days", value: "Last 30 days" },
                                    { label: "This month", value: "This month" },
                                    { label: "Last month", value: "Last month" },
                                    { label: "This quarter", value: "This quarter" },
                                    { label: "2 quarters ago", value: "2 quarters ago" },
                                ]}
                            // onChange={handleChange}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
