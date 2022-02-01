import React, { useEffect } from 'react';
import axios from 'axios';
import ResponsiveAppBar from "../navbar"
import PaginationControlled from "../pagination"
import Pokelist from "../pokelist"

function Pokemon({state, dispatch}) {

    const bodyRepo = {
        "query": `
    query samplePokeAPIquery {
        pokemon_v2_pokemon {
          id
          name
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
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
                const data = fulldata.slice(0, 898);

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
      <PaginationControlled state={state} dispatch={dispatch} />
      <Pokelist state={state} data={state.currentData} dispatch={dispatch}/>
      <PaginationControlled state={state} dispatch={dispatch} />
      </>
        )
}

export default Pokemon