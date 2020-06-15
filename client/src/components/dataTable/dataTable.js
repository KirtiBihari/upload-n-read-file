import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateDelimiter, updateNoOfLine } from '../../store/actions/filedataAction';
import './dataTable.css';

const DataTable = (props) => {
    const { datalist, delimiter, noOfLine, noOfColumn, updateDelimiter, updateNoOfLine  } = props;
    const [delimiterVal, setDelimiterVal] = useState(delimiter);
    const [lineVal, setLineVal] = useState(noOfLine);

    const getSplitValuesUsingDelimiter = (dataStr) => {
        let values = [];
        if(dataStr.length > 0 && delimiterVal.trim() !== '' && dataStr.indexOf(delimiterVal) !== -1) {
            values = dataStr.split(delimiterVal);
        }

        return values;
    }

    const delimiterChangeHandler = (e) => {
        setDelimiterVal(e.target.value);
        updateDelimiter(e.target.value)
    }

    const lineChangeHandler = (e) => {
        setLineVal(e.target.value);
        updateNoOfLine(e.target.value);
    }

    const isRecordAvailable = datalist.slice(0, noOfLine).length > 0 && delimiterVal.trim() !== '' ?
        datalist.slice(0, noOfLine)[0].indexOf(delimiterVal) !== -1 : false;

    return (<div className="dataTableContainer">
        <div className="filters">
            <div className="delimiterFilter">
                <label>Delimiter:</label>
                <input type="text" value={delimiterVal} onChange={delimiterChangeHandler}/>
            </div>
            <div className="lineFilter">
                <label>Line:</label>
                <input type="text" value={lineVal} onChange={lineChangeHandler} />
            </div>
        </div>
        {isRecordAvailable ? <table className="table">
            <tbody>
                { datalist.slice(0, noOfLine).map( (item, index) => (<tr key={index}>
                    { getSplitValuesUsingDelimiter(item).slice(0, noOfColumn).map((val, valIndex) => (<td key={valIndex}>{val}</td>)) }
                </tr>)) }
            </tbody>
        </table> : <div className="noRecords">No Records</div>}
    </div>);
}

const mapStateToProps = state => ({
    delimiter: state.delimiter,
    noOfLine: state.noOfLine,
    noOfColumn: state.noOfColumn
});

const mapDispatchToProps= (dispatch) => {
    return {
        updateDelimiter: data => { dispatch(updateDelimiter( data)) },
        updateNoOfLine: data => { dispatch(updateNoOfLine( data)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
