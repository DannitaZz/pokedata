import React, { useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Pokelist({ state, dispatch }) {



    function upperFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
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
                console.log('data: ', data)
            } catch (error) {
                console.error(error);
            }
        }
        getPokeData();

    }
        , [])
    return (
        <div style={{ width: '100vw', display: 'flex', flexDirection: 'row', flexFlow: 'row wrap', justifyContent: 'center' }}>
            {state && state.currentData.map((pokemon, i) => {
                return (
                    <Card key={i} sx={{ maxWidth: 600, margin: '5px' }}>
                        <CardMedia
                            component="img"
                            height="280"
                            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                            alt="pokemon"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {upperFirstLetter(pokemon.name)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {upperFirstLetter(pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Fav</Button>
                            <Button size="small">Detalles</Button>
                        </CardActions>
                    </Card>
                )
            })}
        </div>
    )

}
export default Pokelist;