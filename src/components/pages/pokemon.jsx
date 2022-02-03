import React, { useEffect } from 'react';
import axios from 'axios';
import ResponsiveAppBar from "../navbar"
import PaginationControlled from "../pagination"
import Pokelist from "../pokelist"
import FixedBottomNavigation from '../bottombar';
import {getLocalStorageObj} from '../../utils'
// import { useNavigate } from "react-router-dom"
// import { checkLogin } from '../../utils';

const nameFilter = (name, data) => (
  data.filter(item=>(
      item.name.toLowerCase().includes(name.toLowerCase())
      )
  )
);

const typeFilter = (type, data) => {
  if(type === 'all'){
    return data
  }else{
    return data.filter(item=>(item.pokemon_v2_pokemontypes[0].pokemon_v2_type.name === type))
  }
};

function Pokemon({favs, actionName, data, page, filterState, dispatch}) {

  const pokeCount = 898
  const pageSize = 20;
  let filteredData =  data
  
  filteredData = nameFilter(filterState.name, filteredData)
  filteredData = typeFilter(filterState.type, filteredData)
  // console.log(filteredData[34])

  const pageCount = Math.round(filteredData.length / pageSize)

    const bodyRepo = {
        "query": `
        query samplePokeAPIquery {
          pokemon_v2_pokemon {
            id
            name
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
                pokemon_v2_generation {
                  name
                }
              }
            }
          }
        }
        
    `
    }

    const baseUrl = "https://beta.pokeapi.co/graphql/v1beta";
    const headers = {
        "Content-Type": "application/json"
    }

    useEffect(() => {
        async function getPokeData() {
            try {
                const [data, saved] = getLocalStorageObj('data', {})
                if (saved){
                  dispatch({ type: 'getData', data: data });
                } else{
                  const response = await axios({ method: "post", url: baseUrl, data: JSON.stringify(bodyRepo), headers: headers });
                  const fulldata = response.data.data.pokemon_v2_pokemon;
                  const data = fulldata.slice(0, pokeCount);
                  dispatch({ type: 'getData', data: data });
                  localStorage.setItem('data', JSON.stringify(data));
                }

            } catch (error) {
                console.error(error);
            }
        }
        getPokeData();

    }
        , [])
    return (
        <>
        <ResponsiveAppBar searchValue={filterState.name} currentType = {filterState.type} dispatch={dispatch}/>
      <PaginationControlled actionName={actionName} count={pageCount} page={page} page_size ={20} data={filteredData} dispatch={dispatch} />
      <Pokelist favs={favs} pageSize={pageSize} data={filteredData} page={page} dispatch={dispatch}/>
      <PaginationControlled actionName={actionName} count={pageCount} page={page} page_size ={20} data={filteredData} dispatch={dispatch} />
      <FixedBottomNavigation />
      </>
        )
}

export default Pokemon