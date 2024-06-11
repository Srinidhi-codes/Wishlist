// src/redux/filterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterMethod: "Scheduled Date",
    startDate: null,
    endDate: null,
    searchPayer: "",
    searchService: "",
    serviceType: "",
    order: "",
    status: "",
    payerSelect: [],
    serviceSelect: [],
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilterMethod: (state, action) => { state.filterMethod = action.payload; },
        setStartDate: (state, action) => { state.startDate = action.payload; },
        setEndDate: (state, action) => { state.endDate = action.payload; },
        setSearchPayer: (state, action) => { state.searchPayer = action.payload; },
        setSearchService: (state, action) => { state.searchService = action.payload; },
        setServiceType: (state, action) => { state.serviceType = action.payload; },
        setOrder: (state, action) => { state.order = action.payload; },
        setStatus: (state, action) => { state.status = action.payload; },
        setPayerSelect: (state, action) => { state.payerSelect = action.payload; },
        setServiceSelect: (state, action) => { state.serviceSelect = action.payload; },
        resetFilters: () => initialState,
    },
});

export const {
    setFilterMethod,
    setStartDate,
    setEndDate,
    setSearchPayer,
    setSearchService,
    setServiceType,
    setOrder,
    setStatus,
    setPayerSelect,
    setServiceSelect,
    resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
