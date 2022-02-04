import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp';
import StarIcon from '@mui/icons-material/Star';
import { Stack } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";

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


function Pokelist({ favs, data, page, pageSize, dispatch }) {

    const navigateTo = useNavigate();
    const pageData = data.slice((page - 1) * pageSize, page * pageSize)

    function upperFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function handleClick(e) {
        const id = e.currentTarget.alt
        //console.log('id', id)
        navigateTo(`/${id}`);
    }
    return (
        <div className='fade-in' style={{ width: '100vw', display: 'flex', flexDirection: 'row', flexFlow: 'row wrap', justifyContent: 'center' }}>
            {pageData && pageData.map((pokemon, i) => {

                let typeOneColor
                let typeTwoColor

                if (pokemon.pokemon_v2_pokemontypes.length === 2) {
                    typeOneColor = typeColors[String(pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name)]
                    typeTwoColor = typeColors[String(pokemon.pokemon_v2_pokemontypes[1].pokemon_v2_type.name)]
                } else {
                    typeOneColor = typeColors[String(pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name)]
                    typeTwoColor = typeColors[String(pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name)]
                }

                return (
                    <div key={`div_${pokemon.id}`}>
                        <Card key={`${pokemon.id}`} sx={{ display: { xs: 'none', sm: 'block', height: '350px' }, maxWidth: 600, margin: '5px' }}>
                            <CardMedia
                                component="img"
                                height="280px"
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                alt={pokemon.id}
                                onClick={(e) => handleClick(e)}
                                sx={{
                                    height: '250px',
                                    align: 'center',
                                    margin: '0px',
                                    padding: '0px',
                                    border: '0px',
                                    objectFit: 'contain',
                                    backgroundImage: `linear-gradient(to right, ${typeTwoColor + '30'}, ${typeOneColor + '30'})`// {typeOneColor}
                                }}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    {pokemon.pokemon_v2_pokemontypes.map((type_, i) => {
                                        const type_name = String(type_.pokemon_v2_type.name)
                                        // console.log('TYPE IS', type_name)
                                        const TypeComponent = typeComponents[type_name];
                                        return (<Chip sx={{ backgroundColor: typeColors[type_name], color: 'white', marginLeft: '10px', marginRight: '10px', marginTop: '0px', marginBottom: '15px' }}
                                            icon={<TypeComponent style={{ width: '15px', color: 'white' }} />}
                                            label={type_name}
                                            key={"type" + i}
                                        />)
                                    }
                                    )
                                    }
                                </Typography>
                                <Stack sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    margin: '0px',
                                    padding: '0px',
                                    border: '0px'
                                }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {upperFirstLetter(pokemon.name)}
                                        {(() => {
                                            if (favs.includes(pokemon.id)) {
                                                return <StarIcon sx={{ marginBottom: '-5px' }} onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                            } else {
                                                return <StarBorderSharpIcon sx={{ marginBottom: '-5px' }} onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                            }
                                        })()}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'gray' }}>
                                        #{pokemon.id}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                        <ListItem key={`pokemon_${pokemon.id}`} alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper', height: '130px', display: { xs: 'flex', sm: 'none' } }} >
                            <Card sx={{ display: 'flex', width: '93vw', height: '120px' }} key={pokemon.id}>
                                <CardContent sx={{ flex: '1 1 auto', flexDirection: 'row' }}>
                                    <Stack sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        margin: '0px',
                                        padding: '0px',
                                        border: '0px',
                                        marginLeft: '10px',
                                        marginRight: '20px'
                                    }}>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: 'gray' }}>
                                            #{pokemon.id}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {(() => {
                                                if (favs.includes(pokemon.id)) {
                                                    return <StarIcon sx={{ marginBottom: '-3px' }} onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                                } else {
                                                    return <StarBorderSharpIcon sx={{ marginBottom: '-3px' }} onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                                }
                                            })()}
                                            {upperFirstLetter(pokemon.name)}
                                        </Typography>
                                    </Stack>
                                    <Stack sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{}}>
                                            {pokemon.pokemon_v2_pokemontypes.map((type_, i) => {
                                                const type_name = String(type_.pokemon_v2_type.name)
                                                //console.log('TYPE IS', type_name)
                                                const TypeComponent = typeComponents[type_name];
                                                return (<Chip sx={{ backgroundColor: typeColors[type_name], color: 'white', marginTop: '10px', marginLeft: '10px', marginRight: '10px' }}
                                                    icon={<TypeComponent style={{ width: '15px', color: 'white' }} />}
                                                    label={type_name}
                                                    key={"type" + i}
                                                />)
                                            }
                                            )
                                            }
                                        </Typography>
                                    </Stack>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: '30vw',
                                        objectFit: 'contain',
                                        backgroundImage: `linear-gradient(to right, ${typeTwoColor + '30'}, ${typeOneColor + '30'})`
                                    }}
                                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                    alt={pokemon.id}
                                    onClick={(e) => handleClick(e)}
                                />
                            </Card>
                        </ListItem>
                    </div>
                )
            })}
        </div>
    )

}
export default Pokelist;