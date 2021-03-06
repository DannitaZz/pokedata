import React, { useReducer } from 'react';
import './App.css';
import { reducer, initialState } from './hooks/reducer';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Pokemon from './pages/pokemon';
import Details from './pages/details';
import SignIn from './pages/login';

const AuthPokemon = ({state, dispatch}) => {
  if(state.login === 'true'){
    return <Pokemon favs={state.favIds} actionName={'setMainPage'} data={state.data} page={state.mainPage.page} filterState={state.filterState} dispatch={dispatch} />
  }else{
    return <Navigate to="/login" />
  }
}

const AuthFavorites = ({state, dispatch}) => {
  if(state.login === 'true'){
    return <Pokemon favs={state.favIds} actionName={'setFavPage'} data={state.favs} page={state.favPage.page} filterState={state.filterState} dispatch={dispatch} />
  }else{
    return <Navigate to="/login" />
  }
}
  
const AuthDetails = ({state, dispatch}) => {
  if(state.login === 'true'){
    return < Details searchValue={state.filterState.name} pokemon={state.detailPage.pokemon} currentType={state.filterState.type} dispatch={dispatch} />
  }else{
    return <Navigate to="/login" />
  }
}

const AuthLogin = ({state, dispatch}) => {
  if(state.login === 'true'){
    return <Pokemon favs={state.favIds} actionName={'setMainPage'} data={state.data} page={state.mainPage.page} filterState={state.filterState} dispatch={dispatch} />
  }else{
    return <SignIn state={state} dispatch={dispatch}/>
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<AuthPokemon state={state} dispatch={dispatch} />} />
          <Route exact path='/:id' element={<AuthDetails state={state} dispatch={dispatch} />} />
          <Route exact path='/favorites' element={<AuthFavorites state={state} dispatch={dispatch} />} />
          <Route exact path='/login' element={<AuthLogin state={state} dispatch={dispatch} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
