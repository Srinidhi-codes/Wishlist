import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filterMethod: 'Scheduled Date',
    startDate: '',
    endDate: '',
    searchPayer: '',
    searchService: '',
    serviceType: '',
    order: '',
    serviceStatus: '',
    selectedPayers: [],
    filteredData: [], // This will hold the filtered table data
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilterMethod: (state, action) => {
            state.filterMethod = action.payload;
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },
        setSearchPayer: (state, action) => {
            state.searchPayer = action.payload;
        },
        setSearchService: (state, action) => {
            state.searchService = action.payload;
        },
        setServiceType: (state, action) => {
            state.serviceType = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setServiceStatus: (state, action) => {
            state.serviceStatus = action.payload;
        },
        setSelectedPayers: (state, action) => {
            state.selectedPayers = action.payload;
        },
        setFilteredData: (state, action) => {
            state.filteredData = action.payload;
        },
        resetFilters: (state) => {
            state.filterMethod = 'Scheduled Date';
            state.startDate = '';
            state.endDate = '';
            state.searchPayer = '';
            state.searchService = '';
            state.serviceType = '';
            state.order = '';
            state.serviceStatus = '';
            state.selectedPayers = [];
        },
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
    setServiceStatus,
    setSelectedPayers,
    setFilteredData,
    resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;