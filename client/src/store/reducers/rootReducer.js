import { UPDATE_STATE_DATA, UPDATE_DELIMITER, UPDATE_NO_OF_LINE, UPDATE_LOADER } from '../actions/filedataAction';

const initState = {
    dataList: [],
    delimiter:',',
    noOfLine: 2,
    noOfColumn: 4,
    showLoader: false
}

const updateDataList = (state, action) => {
    const data = action.data.length > 0 ? action.data.filter(v => v.trim() !== '') : [];

    return {
        ...state,
        dataList: data
    }
}

const updateDelimiter = (state, action) => {
    return {
        ...state,
        delimiter: action.data
    }
}

const updateNoOfLine = (state, action) => {
    return {
        ...state,
        noOfLine: action.data
    }
}

const updateLoader = (state, action) => {
    return{
        ...state,
        showLoader: action.data
    }
}

const searchFilter = (state, action) => {
    const searchText = action.data.searchText;
    const dataList = state.isFilterApplied ? [ ...state.filteredDataList ] : [ ...state.dataList ];
    let searchFilterList = [];
    if (searchText.length > 0) {
        searchFilterList = dataList.filter(item => (item.name.toLowerCase().includes(searchText.toLowerCase())));
    }

    return {
        ...state,
        filteredDataList: searchText.length > 0 ? searchFilterList : dataList,
        isFilterApplied: state.selectedFilters.length > 0 || searchText.length > 0 ? true : false,
        isSearchFilter: searchText.length > 0 ? true : false
    }
}

const rootReducer= (state = initState, action)=>{
    switch (action.type) {
        case UPDATE_STATE_DATA:
          return updateDataList(state, action);
        case UPDATE_DELIMITER:
          return updateDelimiter(state, action);
        case UPDATE_NO_OF_LINE:
          return updateNoOfLine(state, action);
        case UPDATE_LOADER:
            return updateLoader(state, action);
        default:
          return state;
    }
}

export default rootReducer;