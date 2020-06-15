

export const UPDATE_STATE_DATA = 'UPDATE_STATE_DATA';
export const UPDATE_DELIMITER = 'UPDATE_DELIMITER';
export const UPDATE_NO_OF_LINE = 'UPDATE_NO_OF_LINE';
export const UPDATE_LOADER = 'UPDATE_LOADER';

export const updateStateData = data => ({ type: UPDATE_STATE_DATA, data });
export const updateDelimiter = data => ({ type: UPDATE_DELIMITER, data });
export const updateNoOfLine = data => ({ type: UPDATE_NO_OF_LINE, data });
export const updateLoader = data => ({ type: UPDATE_LOADER, data });