import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import { reducer, initialState } from './hooks/reducer';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Pokemon from './components/pages/pokemon';
import Details from './components/pages/details';
import SignIn from './components/pages/login';
import {checkLogin} from './utils'
import {validUser, validPass } from './utils'

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={!checkLogin(validUser, validPass) ? <Navigate to="/login" /> : <Pokemon favs={state.favIds} actionName={'setMainPage'} data={state.data} page={state.mainPage.page} filterState={state.filterState} dispatch={dispatch} />} />
          <Route exact path='/:id' element={!checkLogin(validUser, validPass) ? <Navigate to="/login" /> : <Details searchValue={state.filterState.name} pokemon={state.detailPage.pokemon} currentType={state.filterState.type} dispatch={dispatch} />} />
          <Route exact path='/favorites' element={!checkLogin(validUser, validPass) ? <Navigate to="/login" /> : <Pokemon favs={state.favIds} actionName={'setFavPage'} data={state.favs} page={state.favPage.page} filterState={state.filterState} dispatch={dispatch} />} />
          <Route exact path='/login' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
