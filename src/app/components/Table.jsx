"use client"

import React, { useEffect, useState } from 'react';
import { TableData } from '../constants/TableData';
import ImageView from './ImageView';
import InputField from './InputField';
import Filter from './Filter';
import moment from 'moment';
import EditColumn from './EditColumn';

const Table = () => {
    const [searchPayer, setSearchPayer] = useState('');
    const [selectedColumns, setSelectedColumns] = useState([
        'created',
        'payer',
        'status',
        'email',
        'phone',
        'services',
        'scheduled'
    ]);

    const [filteredData, setFilteredData] = useState(TableData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const applyFilters = (filters) => {
        let filteredData = TableData.filter((data) => {
            let match = true;
            if (filters.searchPayer && !data.payer.toLowerCase().includes(filters.searchPayer.toLowerCase())) {
                match = false;
            }
            if (filters.searchService && !data.services.toLowerCase().includes(filters.searchService.toLowerCase())) {
                match = false;
            }
            if (filters.serviceType && !data.serviceType.toLowerCase().includes(filters.serviceType.toLowerCase())) {
                match = false;
            }
            if (filters.serviceStatus && !data.serviceStatus.toLowerCase().includes(filters.serviceStatus.toLowerCase())) {
                match = false;
            }
            if (filters.startDate && !moment(data.created).format('ddd MMM DD YYYY').includes(moment(filters.startDate).format('ddd MMM DD YYYY'))) {
                match = false;
            }
            if (filters.endDate && !moment(data.scheduled).format('ddd MMM DD YYYY').includes(moment(filters.endDate).format('ddd MMM DD YYYY'))) {
                match = false;
            }
            return match;
        });

        setFilteredData(filteredData);
    };

    useEffect(() => {
        applyFilters({ searchPayer });
    }, [searchPayer]);

    const renderRows = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
        if (filteredData.length && currentItems.length === 0) {
            return (
                <tr>
                    <td colSpan={selectedColumns.length} className="text-center">
                        No Data Available for selected filter.
                    </td>
                </tr>
            );
        }

        return currentItems.map((data) => {
            const columnsToRender = Object.keys(data).filter((key) =>
                selectedColumns.includes(key)
            );

            return (
                <tr key={data.id} className="h-[69px]">
                    <td className="border-b pl-4">
                        <input
                            type="checkbox"
                            name={`checkbox-${data.id}`}
                            value="true"
                            className="bg-transparent h-3 cursor-pointer border-2 border-red-1000"
                        />
                    </td>
                    {columnsToRender.map((key) => {
                        if (key === 'status') {
                            return (
                                <td className="pl-4 border-b" key={key}>
                                    <div className={`capitalize rounded-full p-1 w-[5rem] flex gap-x-2 justify-center items-center text-center
                                    ${data.status === "Active" ? "text-[#15803D] bg-[#F0FDF9]" : ""} 
                                    ${data.status === "Inactive" ? "text-[#334155] bg-[#F1F5F9]" : ""} 
                                    ${data.status === "Lead" ? "text-[#3B82F6] bg-[#EFF6FF]" : ""}`}>
                                        <div className={`h-2 w-2 rounded-full 
                                                        ${data.status === "Active" ? "bg-[#15803D]" : ""} 
                                                        ${data.status === "Inactive" ? "bg-[#334155]" : ""} 
                                                        ${data.status === "Lead" ? "bg-[#3B82F6]" : ""}`}>
                                        </div>
                                        <p>{data.status}</p>
                                    </div>
                                </td>
                            );
                        }
                        return (
                            <td className="pl-4 border-b" key={key}>
                                <p>{data[key]}</p>
                            </td>
                        );
                    })}
                </tr>
            );
        });
    };

    const handleColumnSelection = (selectedColumns) => {
        setSelectedColumns(selectedColumns);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <TableHeader
                applyFilters={applyFilters}
                searchPayer={searchPayer}
                setSearchPayer={setSearchPayer}
                handleColumnSelection={handleColumnSelection}
                selectedColumns={selectedColumns}
                setFilteredData={setFilteredData}
            />
            <div className="tableContainer w-full h-[70dvh] border border-[#E2E8F0] rounded-2xl overflow-x-scroll">
                <table className="table-auto w-full rounded-[20px] ">
                    <thead className="bg-transparent h-[50px] text-left text-[#64748B] text-[12px]">
                        <tr>
                            <th className="border-b bg-[#EBEEF0] pl-4">
                                <input
                                    type="checkbox"
                                    name={`checkbox`}
                                    value="true"
                                    className="bg-transparent h-3  cursor-pointer border-2 border-red-1000"
                                />
                            </th>
                            {selectedColumns.map(column => (
                                <th key={column} className="bg-[#EBEEF0] font-medium pl-4">
                                    <p className='flex gap-x-2 capitalize text-[12px] font-medium'>
                                        <ImageView src={`/assets/${column}.svg`} alt="logo" width={12} height={12} />
                                        {column}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-transparent text-[14px] font-medium">
                        {renderRows()}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredData.length}
                paginate={paginate}
            />
        </>
    );
};

export default Table;

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className='flex items-center justify-between p-4 text-[#334155]'>
                <p>Displaying <span className='bg-[#F8FAFC] p-2'>10</span>out of 30</p>
                <div className='flex items-center gap-x-4'>
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className='flex items-center gap-x-4'>
                        <ImageView src="/assets/leftArrow.svg" alt={"leftArrow"} width={10} height={40} />
                        <p>Previous</p>
                    </button>
                    <ul className="flex">
                        {pageNumbers.map(number => (
                            <li key={number}>
                                <button
                                    onClick={() => paginate(number)}
                                    className={`px-3 py-2 font-semibold mx-1 rounded-md  ${number === currentPage ? "border border-[#E2E8F0]" : "border border-transparent"}`}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === 3} className='flex items-center gap-x-4'>
                        <p>Next</p>
                        <ImageView src="/assets/rightArrow.svg" alt={"rightArrow"} width={10} height={40} />
                    </button>
                </div>
            </div>
        </>
    );
};


export const TableHeader = ({ searchPayer, setSearchPayer, handleColumnSelection, selectedColumns, applyFilters, setFilteredData }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [showColumn, setShowColumn] = useState(false);
    return (
        <div className="py-5">
            <header className='h-[168px] w-full p-3'>
                <h1 className='text-[#334155] text-[20px] font-semibold'>Waitlist</h1>
                <div className='flex gap-x-5 py-5'>
                    <div className='text-[12px] font-semibold p-3 w-[359.33px] rounded-md border'>All Waitlists <span className='text-[10px] font-medium ml-2'>{TableData.length}</span></div>
                    <div className='text-[12px] font-semibold p-3 w-[359.33px] rounded-md border'>Newly Added <span className='text-[10px] font-medium ml-2'>30</span></div>
                    <div className='text-[12px] font-semibold p-3 w-[359.33px] rounded-md border'>Leads <span className='text-[10px] font-medium ml-2'>{TableData.filter(data => data.status == "Lead").length}</span></div>
                </div>
            </header>
            <div className='w-full flex justify-between relative'>
                <div className='flex cursor-pointer gap-x-3 bg-[#F1F5F9] p-2 rounded-md'>
                    <ImageView src="/assets/filter.svg" alt="filter" width={16} height={20} />
                    <p onClick={() => setShowFilter(!showFilter)} className='text-[12px] font-medium w-full h-full'>Add Filter</p>
                    {showFilter && <Filter applyFilters={applyFilters} setShowFilter={setShowFilter} />}
                </div>
                <div className='flex gap-x-3 relative'>
                    <InputField placeholder={"Search client"} value={searchPayer} onChange={(e) => setSearchPayer(e.target.value)} className={"rounded-md shadow-sm pl-12"} />
                    <ImageView src="/assets/search.svg" alt="filter" className="absolute top-2 left-3" width={18} height={20} />
                    <ImageView onClick={() => setFilteredData(TableData)} src="/assets/refresh.svg" alt="filter" width={40} height={20} />
                    <ImageView onClick={() => setShowColumn(!showColumn)} src="/assets/column.svg" alt="filter" width={40} height={20} />
                    {showColumn && <EditColumn handleColumnSelection={handleColumnSelection} selectedColumns={selectedColumns} setShowColumn={setShowColumn} />}
                    <ImageView src="/assets/download.svg" alt="filter" width={40} height={20} />
                </div>
            </div>
        </div>
    )
}
