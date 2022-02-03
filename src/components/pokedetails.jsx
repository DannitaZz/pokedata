import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios';
import { Chart } from "react-google-charts";
import { Typography, Card, CardContent, CardMedia } from '@mui/material';

function Pokedetails({ pokemon, dispatch }) {
    const { id } = useParams();
    function upperFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const data = [
        ["Stat", "Pts", {role: 'style'}],
        ["HP", Number(pokemon.stats[0].base_stat), 'color: #D14461'],
        ["Attack", Number(pokemon.stats[1].base_stat), 'color: #176CC5'],
        ["Defense", Number(pokemon.stats[2].base_stat), 'color: #63BC5D'],
        ["Special Attack", Number(pokemon.stats[3].base_stat), 'color: #F1D85A'],
        ["Special Defense", Number(pokemon.stats[4].base_stat), 'color: #B667CD'],
        ["Speed", Number(pokemon.stats[5].base_stat), 'color: #D87C52'],
    ];
    const options = {
        title: "Stats",
        chartArea: { width: "50%" },
        isStacked: true,
        hAxis: {
          title: "Pokémon Stats",
          minValue: 0,
          maxValue: 100,
        },
      };

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

            <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: '3%'}}>
                <Card sx={{ height: '80vh', display: 'flex', justifyContent: 'center', justifySelf: 'center', alignSelf: 'center'}}>
                    <CardContent sx={{ align: 'center'}}>
                        <CardMedia
                            component="img"
                            sx={{ height: '40vh', align: 'center' }}
                            image={pokemon && pokemon.sprites.other["official-artwork"].front_default}
                            alt="pokemon"
                        />
                         <Typography component="div" variant="h5" textAlign='center'>
                              {upperFirstLetter(pokemon.name)}
                             <br></br>
                             #{id}
                        </Typography>
                        <Typography component="div" variant="p" textAlign='center'>
                            
                            {pokemon && pokemon.types.map((type, i) => {
                                return (<li key={'t' + i}>{type.type.name}</li>)
                            })}
                        </Typography>
                        
                        <Chart
                            chartType="BarChart"
                            width="100%"
                            height="50%"
                            data={data}
                            options={options}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Pokedetails