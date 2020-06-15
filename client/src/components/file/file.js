import React, { Fragment, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateStateData, updateLoader } from '../../store/actions/filedataAction';
import DataTable from '../dataTable/dataTable';
import Loader from '../loader/loader';
import axios from 'axios';
import './file.css';

const File = (props) => {
    const { dataList, showLoader, updateStateData, updateLoader } = props;
    const [filename, setFilename] = useState('');
    const [dropFile, setDropFile] = useState('');
    const [dropHighlight, setDropHighlight] = useState(false);

    const uploadFile = async targetFiles => {
        setFilename(targetFiles[0].name);
        
        const formData = new FormData();
        formData.append('file', targetFiles[0]);
        updateLoader(true);

        const uploadCall = await axios.post('/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            const { fileContent } = res.data;
            updateStateData(fileContent);
            console.log('File Uploaded Successfully');
            updateLoader(false);
        }).catch(err => {
            if (err.response.status === 500) {
              console.log('There was a problem with the server');
            } else {
              console.log(err.response.data.msg);
            }
            updateLoader(false);
        });
    }

    const handleFileChange = async e => {
      e.preventDefault();
      const targetFiles = e.target.files;
      uploadFile(targetFiles);
  };

    const handleDrop = e => {
      e.preventDefault();
      e.stopPropagation();
      setDropHighlight(false);

      const fileData = e.dataTransfer;
      const files = fileData.files;
      setDropFile([...files]);
    }
    const handleDragOver = e => {
      e.preventDefault();
      e.stopPropagation();
      setDropHighlight(true);
    }
    const handleDragEnter = e => {
      e.preventDefault();
      e.stopPropagation();
      setDropHighlight(true);
    }
    const handleDragLeave = e => {
      e.preventDefault();
      e.stopPropagation();
      setDropHighlight(false);
    }

    useEffect(() => {
      if (dropFile === "") {
        setDropFile('');
      } else {
        setDropFile(dropFile);
        uploadFile(dropFile);
      }
    }, [dropFile]);


  return (
    <Fragment>
       <div id="dropDiv"
       className={dropHighlight ? 'highlight' : ''}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
       >
        <form>
          <div className='custom-file mb-4'>
            <input
              type='file'
              className='custom-file-input'
              id='customFile'
              onChange={handleFileChange}
            />
            <label className='custom-file-label' htmlFor='customFile'>
              {filename}
            </label>
          </div>

        </form>
        
        { filename !== '' ? filename : <p>Drag and drop a file here</p>}
       </div>
     <DataTable
       datalist={dataList}
      />
      {showLoader && <Loader />}
    </Fragment>
  );
};

const mapStateToProps = state => ({
    dataList: state.dataList,
    showLoader: state.showLoader
});

const mapDispatchToProps= (dispatch) => {
    return {
        updateStateData: data => { dispatch(updateStateData( data )) },
        updateLoader: data => { dispatch(updateLoader( data )) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(File);
