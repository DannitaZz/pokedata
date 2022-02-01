import Ŕeact, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import { reducer, initialState } from './hooks/reducer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokemon from './components/pages/pokemon';
import Details from './components/pages/details';
import Favorites from './components/pages/favorites';


function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Pokemon favs={state.favIds} actionName={'setMainPage'} data={state.data} page={state.mainPage.page} dispatch={dispatch} />} />
          <Route exact path='/details/:id' element={<Details pokemon={state.pokemon} dispatch={dispatch} />} />
          <Route exact path='/favorites' element={<Pokemon favs={state.favIds} actionName={'setFavPage'} data={state.favs} page={state.favPage.page} dispatch={dispatch} />} />
          {/* <Route exact path='/favorites' element={<Favorites state={state} dispatch={dispatch} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
