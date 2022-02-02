import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';


function Pokedetails({ pokemon, dispatch }) {
    const { id } = useParams();
    function upperFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const checkState = (state) => {
        try {
            return state.name
        }
        catch {
            return 'loading'
        }
    }
    useEffect(() => {
        async function getPokeData() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
                const fulldata = response.data;
                console.log('Pokemon: ', fulldata);
                dispatch({ type: 'getPokemon', pokemon: fulldata });
            } catch (error) {
                console.error(error);
            }
        }
        getPokeData();

    }
        , [])

    return (
        <>

            <div>
                <Card sx={{ with: '80vw', height: '92vh', display: 'flex', justifyContent: 'center' }}>
                    <CardContent sx={{ align: 'center' }}>
                        <Typography component="div" variant="h4" textAlign='center'>
                            Pokemon #{id} {upperFirstLetter(pokemon.name)}
                        </Typography>
                        <CardMedia
                            component="img"
                            sx={{ height: '40vh', align: 'center' }}
                            image={pokemon && pokemon.sprites.other["official-artwork"].front_default}
                            alt="pokemon"
                        />
                        <Typography component="div" variant="p" textAlign='center'>
                            <hr></hr>
                            Type: {pokemon && pokemon.types.map((type, i)=> {
                                return (<li key={'t' + i}>{type.type.name}</li>)
                            })}
                            <hr></hr>
                            STATS: {pokemon && pokemon.stats.map((stat, i) => {
                                return <>
                                    <li key={'p' + i}>{stat.stat.name}: {stat.base_stat}</li>
                                </>
                            })}



                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Pokedetails