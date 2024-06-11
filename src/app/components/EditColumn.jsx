import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

const EditColumn = ({ handleColumnSelection, selectedColumns, setShowColumn }) => {
    const columnData = [
        'created',
        'payer',
        'status',
        'email',
        'phone',
        'services',
        'scheduled'
    ];

    const [tempSelectedColumns, setTempSelectedColumns] = useState(selectedColumns);

    const handleCheckboxChange = (columnName) => {
        setTempSelectedColumns(prevSelectedColumns => {
            if (prevSelectedColumns.includes(columnName)) {
                return prevSelectedColumns.filter(col => col !== columnName);
            } else {
                return [...prevSelectedColumns, columnName];
            }
        });
    };

    const handleApplyClick = () => {
        handleColumnSelection(tempSelectedColumns);
        setShowColumn(false)
    };

    return (
            <ClickAwayListener onClickAway={() => setShowColumn(false)}>
                <div className="w-80 h-[472px] px-3 py-4 rounded-lg border absolute top-12 left-16 z-50 bg-white">
                    <h1 className="text-md font-semibold">Edit Columns</h1>
                    <p className="text-sm font-normal py-2">
                        Select the columns to rearrange
                    </p>
                    <div className="overflow-y-scroll px-2 pt-2 h-[21rem]">
                        {columnData.map((columnName) => (
                            <ul key={columnName} className="flex gap-8 items-center mb-2">
                                <input
                                    type="checkbox"
                                    name="myCheckbox"
                                    value={columnName}
                                    className="bg-transparent w-4 h-4 cursor-pointer border-2 border-red-600"
                                    checked={tempSelectedColumns.includes(columnName)}
                                    onChange={() => handleCheckboxChange(columnName)}
                                />
                                <li className="p-2 border w-[242px] text-[14px] rounded-md">
                                    {columnName}
                                </li>
                            </ul>
                        ))}
                    </div>
                    <div className="w-full flex justify-between px-3 py-[1rem]">
                        <button className="bg-gray-200 text-sm font-medium px-3 py-1 rounded-lg">
                            Reset to default
                        </button>
                        <button
                            onClick={handleApplyClick}
                            className="text-white text-sm font-medium bg-black px-4 py-1 w-[8rem] rounded-lg"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </ClickAwayListener>
    );
};

export default EditColumn;
