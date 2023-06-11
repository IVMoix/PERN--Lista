import React, { Fragment } from 'react';
import './App.css';

//Componentes
import InputLista from './components/InputLista';
import ListLista from './components/ListLista';

function App() {
  return <Fragment>
    <div className='container'>
      <InputLista />
      <ListLista />
    </div>
  </Fragment>;
}

export default App;
