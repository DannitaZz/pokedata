import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios';
import { Chart } from "react-google-charts";
import { Typography, Card, CardContent, CardMedia } from '@mui/material';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ReactComponent as Bug } from '../img/bug.svg'
import { ReactComponent as Dark } from '../img/dark.svg'
import { ReactComponent as Dragon } from '../img/dragon.svg'
import { ReactComponent as Electric } from '../img/electric.svg'
import { ReactComponent as Fairy } from '../img/fairy.svg'
import { ReactComponent as Fighting } from '../img/fighting.svg'
import { ReactComponent as Fire } from '../img/fire.svg'
import { ReactComponent as Flying } from '../img/flying.svg'
import { ReactComponent as Ghost } from '../img/ghost.svg'
import { ReactComponent as Grass } from '../img/grass.svg'
import { ReactComponent as Ground } from '../img/ground.svg'
import { ReactComponent as Ice } from '../img/ice.svg'
import { ReactComponent as Normal } from '../img/normal.svg'
import { ReactComponent as Poison } from '../img/poison.svg'
import { ReactComponent as Psychic } from '../img/psychic.svg'
import { ReactComponent as Rock } from '../img/rock.svg'
import { ReactComponent as Steel } from '../img/steel.svg'
import { ReactComponent as Water } from '../img/water.svg'

const typeColors = {
    'loading': 'white',
    'undefined': 'white',
    'null': 'white',
    'bug': '#6c7d45',
    'dark': '#595761',
    'dragon': '#176cc5',
    'electric': '#f1d85a',
    'fairy': '#ed93e4',
    'fighting': '#d14461',
    'fire': '#f9a555',
    'flying': '#a2bcea',
    'ghost': '#606fba',
    'grass': '#63bc5d',
    'ground': '#d87c52',
    'ice': '#79d0c1',
    'normal': '#a0a29f',
    'poison': '#b667cd',
    'psychic': '#f88684',
    'rock': '#d87c52',
    'steel': '#5995a2',
    'water': '#579edd'
}

const typeComponents = {
    'loading': Grass,
    'undefined': Grass,
    'null': Grass,
    'bug': Bug,
    'dark': Dark,
    'dragon': Dragon,
    'electric': Electric,
    'fairy': Fairy,
    'fighting': Fighting,
    'fire': Fire,
    'flying': Flying,
    'ghost': Ghost,
    'grass': Grass,
    'ground': Ground,
    'ice': Ice,
    'normal': Normal,
    'poison': Poison,
    'psychic': Psychic,
    'rock': Rock,
    'steel': Steel,
    'water': Water
}

function Pokedetails({ pokemon, dispatch }) {

    let typeOneColor
    let typeTwoColor
    const highestStat = Math.max(...pokemon.stats.map((item) => item.base_stat))
    // console.log(highestStat)

    if (pokemon.types.length === 2) {
        typeOneColor = typeColors[String(pokemon.types[0].type.name)]
        typeTwoColor = typeColors[String(pokemon.types[1].type.name)]
    } else {
        typeOneColor = typeColors[String(pokemon.types[0].type.name)]
        typeTwoColor = typeColors[String(pokemon.types[0].type.name)]
    }

    const { id } = useParams();
    function upperFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const data = [
        ["Stat", 'Pts', { role: 'style' }, {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
        }],
        ["HP", Number(pokemon.stats[0].base_stat), `color: ${typeOneColor}`, null],
        ["Att", Number(pokemon.stats[1].base_stat), `color: ${typeTwoColor}`, null],
        ["Deff", Number(pokemon.stats[2].base_stat), `color: ${typeOneColor}`, null],
        ["Sp.Att", Number(pokemon.stats[3].base_stat), `color: ${typeTwoColor}`, null],
        ["Sp.Deff", Number(pokemon.stats[4].base_stat), `color: ${typeOneColor}`, null],
        ["Spd", Number(pokemon.stats[5].base_stat), `color: ${typeTwoColor}`, null],
    ];
    const options = {
        chartArea: {left:"30%", top:"100px", width: "50%", height:"300px" },
        isStacked: true,
        hAxis: {
            minValue: 0,
            gridlines: { count: 0 },
            textStyle: {
                fontSize: 0
            },
            baselineColor: '#fff',
            viewWindowMode: 'explicit',
            viewWindow: {
                max: highestStat,
                min: 0
            }
        },
        legend: { position: "none" },
        vAxis: {
            gridlines: { count: 0 },
            textStyle: {
                fontSize: 12
            },
            baselineColor: '#fff',
        },
    };

    useEffect(() => {
        async function getPokeData() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
                const fulldata = response.data;
                //console.log('Pokemon: ', fulldata);
                dispatch({ type: 'getPokemon', pokemon: fulldata });
            } catch (error) {
                console.error(error);
            }
        }
        getPokeData();

    }
        , [id, dispatch])

    return (
        <>

            <div className='fade-in' style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: '3%' }}>
                <Card sx={{ height: '80vh', display: 'flex', justifyContent: 'center', justifySelf: 'center', alignSelf: 'center', width: '70%' }}>
                    <CardContent sx={{ margin: '0px', padding: '0px', border: '0px', width: '100%' }}>
                        <CardMedia
                            className='poke-background'
                            component="img"
                            sx={{
                                height: '40vh',
                                align: 'center',
                                margin: '0px',
                                padding: '10px',
                                border: '0px',
                                objectFit: 'contain',
                                backgroundImage: `linear-gradient(to right, ${typeOneColor + '30'}, ${typeTwoColor + '30'})`// {typeOneColor}
                            }}
                            image={pokemon && pokemon.sprites.other["official-artwork"].front_default}
                            alt="pokemon"
                        />
                        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '10px'}}>
                            <Typography component="div" variant="h5" textAlign='center' sx={{ fontWeight: 'bold', paddingRight:'10px' }}>
                                {upperFirstLetter(pokemon.name)}
                            </Typography>
                            <Typography component="div" variant="h5" textAlign='center' sx={{ color: 'gray', paddingLeft:'10px' }}>
                                #{id}
                            </Typography>
                        </Stack>

                        <Typography component="div" variant="p" textAlign='center'>
                            {pokemon && pokemon.types.map((type_, i) => {
                                const type_name = String(type_.type.name)
                                //console.log('TYPE IS', type_name)
                                const TypeComponent = typeComponents[type_name];
                                return (<Chip sx={{ backgroundColor: typeColors[type_name], color: 'white', margin: '10px' }}
                                    icon={<TypeComponent style={{ width: '15px', color: 'white' }} />}
                                    label={type_name}
                                    key={"type" + i}
                                />)
                            }
                            )
                            }
                        </Typography>
                            <Chart className='chart'
                                    chartType="BarChart"
                                    // width="8%"
                                    // height="55%"
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