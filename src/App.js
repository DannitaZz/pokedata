import Ŕeact, {useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import Pokelist from './components/pokelist';
import PaginationControlled from './components/pagination';
import {reducer, initialState} from './hooks/reducer';

function App() {

 const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <PaginationControlled state={state} dispatch={dispatch} />
      <Pokelist state={state} dispatch={dispatch}/>
      <PaginationControlled state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
