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
import List from '@mui/material/List';
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
        const id = e.currentTarget.value
        console.log('id', id)
        navigateTo(`/${id}`);
    }
    /*  let typeOneColor
     let typeTwoColor
     const highestStat = Math.max(...pokemon.stats.map((item) => item.base_stat))
     console.log(highestStat)
 
     if (pokemon.types.length == 2) {
         typeOneColor = typeColors[String(pokemon.types[0].type.name)]
         typeTwoColor = typeColors[String(pokemon.types[1].type.name)]
     } else {
         typeOneColor = typeColors[String(pokemon.types[0].type.name)]
         typeTwoColor = typeColors[String(pokemon.types[0].type.name)]
     } */
    return (
        <div className='fade-in' style={{ width: '100vw', display: 'flex', flexDirection: 'row', flexFlow: 'row wrap', justifyContent: 'center' }}>
            {pageData && pageData.map((pokemon, i) => {
                return (
                    <div key={`div_${pokemon.id}`}>
                        <Card key={`p_${pokemon.id}`} sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: 600, margin: '5px' }}>
                            <CardMedia
                                component="img"
                                height="280"
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                alt="pokemon"
                                sx={{objectFit: 'contain'}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {upperFirstLetter(pokemon.name)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {pokemon.pokemon_v2_pokemontypes.map((type_, i) => {
                                        const type_name = String(type_.pokemon_v2_type.name)
                                        console.log('TYPE IS', type_name)
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
                            </CardContent>
                            <CardActions sx={{ color: '#FEC11E', marginLeft: '42%', marginRight: '42%' }}>
                                {(() => {
                                    if (favs.includes(pokemon.id)) {
                                        return <StarIcon onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                    } else {
                                        return <StarBorderSharpIcon onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                    }
                                })()}

                            </CardActions>
                            <Button sx={{ color: 'black' }} size="small" value={pokemon.id} onClick={(e) => handleClick(e)}> <ManageSearchIcon /> Details</Button>
                        </Card>
                        <ListItem key={`pokemon_${pokemon.id}`} alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper', display: { xs: 'flex', sm: 'none' } }} >
                            <Card sx={{ display: 'flex', width: '93vw', height: '20vh' }} key={pokemon.id}>
                                <CardContent sx={{ flex: '1 1 auto', flexDirection: 'row' }}>
                                    <Typography component="div" variant="h5" sx={{ marginLeft: '5%', marginTop: '1%' }}>
                                        {upperFirstLetter(pokemon.name)}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginLeft: '6%' }}>
                                        {pokemon.pokemon_v2_pokemontypes.map((type_, i) => {
                                            const type_name = String(type_.pokemon_v2_type.name)
                                            console.log('TYPE IS', type_name)
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
                                    <CardActions sx={{ color: '#FEC11E' }}>
                                        {(() => {
                                            if (favs.includes(pokemon.id)) {
                                                return <StarIcon onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                            } else {
                                                return <StarBorderSharpIcon onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                            }
                                        })()}
                                        <Button sx={{ color: 'black' }} value={pokemon.id} onClick={(e) => handleClick(e)}><ManageSearchIcon /> Details</Button>
                                    </CardActions>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '35vw', objectFit: 'contain'}}
                                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                    alt="pokemon"
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