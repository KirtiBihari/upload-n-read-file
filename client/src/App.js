import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import File from './components/file/file';
import './App.css';

  const App = () => (
    <Provider store={ store }>
      <div className="App container mt-5">
        <h3 className='display-5 text-center mb-5'>
          File Upload (Choose the file or Drag and drop the file)
        </h3>
        <File />
      </div>
    </Provider>
    
  );

export default App;
