'use client'
import React, { useState } from 'react';
import ImageView from './ImageView';
import Select from './Select';
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from 'antd';
import InputField from './InputField';
import { TableData } from "../constants/TableData";
import moment from 'moment';
import ClickAwayListener from 'react-click-away-listener';

const Filter = ({ applyFilters, setShowFilter }) => {
    const [filterMethod, selectFilterMethod] = useState("Scheduled Date");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchPayer, setSearchPayer] = useState("");
    const [searchService, setSearchService] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [order, setOrder] = useState("");
    const [serviceStatus, setServiceStatus] = useState("");
    const [selectedPayers, setSelectedPayers] = useState([]);

    const applyFiltersHandler = () => {
        applyFilters({
            startDate,
            endDate,
            searchPayer: selectedPayers.join(", "),
            searchService,
            serviceType,
            order,
            serviceStatus
        });
        setShowFilter(false);
    };

    const resetFilters = () => {
        setStartDate("");
        setEndDate("");
        setSearchPayer("");
        setSearchService("");
        setServiceType("");
        setServiceStatus("");
        setSelectedPayers([]);
        selectFilterMethod("Scheduled Date");
    };

    const handlePayerCheckboxChange = (payer) => {
        setSelectedPayers((prevSelected) => {
            if (prevSelected.includes(payer)) {
                return prevSelected.filter((item) => item !== payer);
            } else {
                return [...prevSelected, payer];
            }
        });
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
        <ClickAwayListener onClickAway={() => setShowFilter(false)}>
            <div className='lg:w-[612px] w-[290px] h-[400px] bg-white absolute top-[2.5rem] lg:left-0 -left-3 shadow-2xl z-50'>
                <div className='flex h-full'>
                    <ul className='bg-[#F8FAFC] p-2 border-r'>
                        {filterType.map((item) => (
                            <li onClick={() => selectFilterMethod(item.data)} className={`flex cursor-pointer gap-2 lg:w-[250px] w-[30px] p-2 rounded-lg text-[14px] font-medium ${filterMethod === item.data ? "bg-[#E2E8F0]" : ""}`} key={item.data}>
                                <ImageView width={16} height={16} src={item.icon} />
                                <p className='lg:flex hidden'>{item.data}</p>
                            </li>
                        ))}
                    </ul>
                    {filterMethod === "Scheduled Date" && <ScheduledDate startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        order={order}
                        setOrder={setOrder} />}
                    {filterMethod === "People" && <People searchPayer={searchPayer} setSearchPayer={setSearchPayer} selectedPayers={selectedPayers} handlePayerCheckboxChange={handlePayerCheckboxChange} />}
                    {filterMethod === "Services/Products" && <Services searchService={searchService} setSearchService={setSearchService} serviceType={serviceType} setServiceType={setServiceType} setServiceStatus={setServiceStatus} serviceStatus={serviceStatus} />}
                </div>
                <div className='border-t flex justify-end px-2 gap-x-4 p-2 bg-white'>
                    <button onClick={resetFilters} className='bg-[#F4F4F5] text-[14px] font-medium px-3 py-2 rounded-lg'>Reset to default</button>
                    <button onClick={applyFiltersHandler} className='text-white text-[14px] font-medium bg-black px-4 py-2 rounded-lg'>Apply</button>
                </div>
            </div>
        </ClickAwayListener>
    );
};

export default Filter;

export const ScheduledDate = ({ startDate, setStartDate, endDate, setEndDate, order, setOrder }) => {
    return (
        <>
            <div className='flex flex-col p-3 gap-2'>
                <label className='text-[12px] font-medium w-fit'>Show orders for</label>
                <Select
                    name="orders"
                    value={order}
                    placeholder="All"
                    className="lg:w-[350px] w-[225px] h-[40px] border border-[#E4E4E7] rounded-lg "
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
                <div className='flex lg:flex-row flex-col gap-[19px]'>
                    <div className='flex flex-col gap-2 '>
                        <label className='text-[12px] font-medium'>From</label>
                        <DatePicker
                            value={startDate ? moment(startDate) : null}
                            placeholder='Pick a date'
                            onChange={(date) => setStartDate(date ? date.toDate() : null)}
                            className="w-[150px] h-[40px] text-[18px] rounded-lg border placeholder:text-[1rem] placeholder:text-black"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-[12px] font-medium'>To</label>
                        <DatePicker
                            value={endDate ? moment(endDate) : null}
                            onChange={(date) => setEndDate(date ? date.toDate() : null)}
                            placeholder='Pick a date'
                            className="w-[150px] h-[40px] text-[18px] rounded-lg border placeholder:text-[1rem] placeholder:text-black"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const People = ({ searchPayer, setSearchPayer, selectedPayers, handlePayerCheckboxChange }) => (
    <div className='flex flex-col gap-y-2 p-4 w-full relative'>
        <ImageView src="/assets/search.svg" alt="filter" className="absolute top-[21px] left-6" width={16} height={20} />
        <InputField
            name="search"
            value={searchPayer}
            placeholder="Search Payer or attendee name"
            className="w-[300px] h-[28px] border capitalize rounded-md bg-[#F9FAFB] text-[14px] font-normal p-3 pl-8"
            onChange={e => setSearchPayer(e.target.value)}
        />
        {searchPayer && (
            <div className='flex flex-col gap-y-2 items-start text-[#374151] px-2 overflow-y-scroll'>
                {TableData.filter(data => data.payer.toLowerCase().includes(searchPayer.toLowerCase())).map(data => (
                    <div key={data.id} className='flex items-center gap-x-2'>
                        <input
                            type="checkbox"
                            name={`payer-${data.id}`}
                            checked={selectedPayers.includes(data.payer)}
                            onChange={() => handlePayerCheckboxChange(data.payer)}
                            className="bg-transparent w-3 h-3 cursor-pointer border-2 border-red-1000"
                        />
                        <p className='text-[14px] font-medium'>{data.payer}</p>
                        <p className='bg-[#F8FAFC] rounded-md p-1 text-[10px]'>{data.status}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export const Services = ({ searchService, setSearchService, serviceType, setServiceType, serviceStatus, setServiceStatus }) => {
    const [searchType, setSearchType] = useState("name");

    return (
        <div className='flex flex-col w-full p-3 gap-y-8'>
            <div className='flex gap-x-5'>
                <label className="flex items-center">
                    <InputField
                        type="radio"
                        name="searchType"
                        value="name"
                        checked={searchType === "name"}
                        onChange={() => setSearchType("name")}
                        className="bg-transparent w-3 cursor-pointer border-gray-200"
                    />
                    <span className="ml-2 text-nowrap lg:text-[14px] text-[11px]">Search by name</span>
                </label>
                <label className="flex items-center">
                    <InputField
                        type="radio"
                        name="searchType"
                        value="tags"
                        checked={searchType === "tags"}
                        onChange={() => setSearchType("tags")}
                        className="bg-transparent text-[14px] w-3 cursor-pointer border-gray-200"
                    />
                    <span className="ml-2 text-nowrap lg:text-[14px] text-[11px]">Search by tags</span>
                </label>
            </div>
            <div className='flex flex-col gap-y-2 relative'>
                {searchType === "name" ? (
                    <>
                        <InputField
                            name="search"
                            value={searchService}
                            onChange={e => setSearchService(e.target.value)}
                            placeholder="Search service name"
                            className="w-[350px] h-[28px] capitalize bg-[#F9FAFB] border rounded-md text-[14px] font-normal p-3 pl-8"
                        />
                        <ImageView src="/assets/search.svg" alt="filter" className="absolute top-1 left-2" width={18} height={20} />
                        {searchService && (
                            <div className='flex flex-col gap-y-2 items-start text-[#374151] px-2 h-[18rem] overflow-y-scroll'>
                                {TableData.filter(data => data.services.toLowerCase().includes(searchService.toLowerCase())).map(data => (
                                    <div key={data.id} className='flex items-center gap-x-2 w-full'>
                                        <input
                                            type="checkbox"
                                            name={`myCheckbox`}
                                            value="true"
                                            className="bg-transparent w-3 h-3 cursor-pointer border-2 border-red-1000"
                                        />
                                        <p className='text-[14px] font-medium mr-8'>{data.services}</p>
                                        <p className='bg-[#F8FAFC] text-nowrap rounded-md p-1 text-[10px]'>{data.serviceType}</p>
                                        <p className={`bg-[#F8FAFC] rounded-md p-1 text-[10px] text-black ${data.serviceStatus == "Public" && "text-green-500"} ${data.serviceStatus == "Private" && "text-yellow-500"}`}>{data.serviceStatus}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className='flex flex-col gap-y-2'>
                            <label className='text-[12px] font-medium'>Service type</label>
                            <Select
                                name="serviceType"
                                value={serviceType}
                                placeholder="Show all service type"
                                className="w-[350px] h-[40px] border border-[#E4E4E7] rounded-lg "
                                options={[
                                    { label: "All", value: "All" },
                                    { label: "Class", value: "Class" },
                                    { label: "Appointment", value: "Appointment" },
                                    { label: "Facility", value: "Facility" },
                                    { label: "Class Pack", value: "Class Pack" },
                                    { label: "Membership", value: "Membership" },
                                    { label: "General items", value: "General items" },
                                ]}
                                onChange={e => setServiceType(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label className='text-[12px] font-medium'>Status</label>
                            <Select
                                name="status"
                                value={serviceStatus}
                                placeholder="Select service type"
                                className="w-[350px] h-[40px] border border-[#E4E4E7] rounded-lg "
                                options={[
                                    { label: "All", value: "All" },
                                    { label: "Public", value: "Public" },
                                    { label: "Private", value: "Private" },
                                    { label: "Disable", value: "Disable" },
                                    { label: "Draft", value: "Draft" },
                                ]}
                                onChange={e => setServiceStatus(e.target.value)}
                            />
                        </div>
                    </>
                )}
            </div>
        </div >
    );
};
