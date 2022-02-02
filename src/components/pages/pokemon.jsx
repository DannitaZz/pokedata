import React, { useEffect } from 'react';
import axios from 'axios';
import ResponsiveAppBar from "../navbar"
import PaginationControlled from "../pagination"
import Pokelist from "../pokelist"
import FixedBottomNavigation from '../bottombar';

function Pokemon({favs, actionName, data, page, dispatch}) {

  const pokeCount = 898
  const pageSize = 20;
  const pageCount = Math.round(data.length / pageSize)

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
                const response = await axios({ method: "post", url: baseUrl, data: JSON.stringify(bodyRepo), headers: headers });
                const fulldata = response.data.data.pokemon_v2_pokemon;
                const data = fulldata.slice(0, pokeCount);
                dispatch({ type: 'getData', data: data });
            } catch (error) {
                console.error(error);
            }
        }
        getPokeData();

    }
        , [])
    return (
        <>
        <ResponsiveAppBar/>
      <PaginationControlled actionName={actionName} count={pageCount} page={page} page_size ={20} data={data} dispatch={dispatch} />
      <Pokelist favs={favs} pageSize={pageSize} data={data} page={page} dispatch={dispatch}/>
      <PaginationControlled actionName={actionName} count={pageCount} page={page} page_size ={20} data={data} dispatch={dispatch} />
      <FixedBottomNavigation />
      </>
        )
}

export default Pokemon