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
import { useNavigate } from "react-router-dom";


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
    return (
        <div style={{ width: '100vw', display: 'flex', flexDirection: 'row', flexFlow: 'row wrap', justifyContent: 'center' }}>
            {pageData && pageData.map((pokemon, i) => {
                return (
                    <div key={`div_${pokemon.id}`}>
                        <Card key={`p_${pokemon.id}`} sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: 600, margin: '5px' }}>
                            <CardMedia
                                component="img"
                                height="280"
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                alt="pokemon"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {upperFirstLetter(pokemon.name)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {pokemon.pokemon_v2_pokemontypes.map((type)=> {
                                                return (upperFirstLetter(type.pokemon_v2_type.name )+ ' ')})}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{color: '#FEC11E', marginLeft: '42%', marginRight: '42%'}}>
                                {(() => {
                                    if (favs.includes(pokemon.id)) {
                                        return <StarIcon onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                    } else {
                                        return <StarBorderSharpIcon onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                    }
                                })()}
                                
                            </CardActions>
                            <Button size="small" value={pokemon.id} onClick={(e) => handleClick(e)}> <ManageSearchIcon/> Details</Button>
                        </Card>
                        <ListItem key={`pokemon_${pokemon.id}`} alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper', display: { xs: 'flex', sm: 'none' } }} >
                            <Card sx={{ display: 'flex', width: '93vw', height: '20vh' }} key={pokemon.id}>
                                    <CardContent sx={{ flex: '1 1 auto', flexDirection: 'row' }}>
                                        <Typography component="div" variant="h5" sx={{ marginLeft: '5%', marginTop: '1%' }}>
                                            {upperFirstLetter(pokemon.name)}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginLeft: '6%' }}>
                                            {pokemon.pokemon_v2_pokemontypes.map((type)=> {
                                                return (upperFirstLetter(type.pokemon_v2_type.name )+ ' ')})}
                                        </Typography>
                                        <CardActions sx={{color: '#FEC11E'}}>
                                            {(() => {
                                                if (favs.includes(pokemon.id)) {
                                                    return <StarIcon onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                                } else {
                                                    return <StarBorderSharpIcon onClick={(e) => dispatch({ type: 'setFav', value: pokemon.id })} />
                                                }
                                            })()}
                                            <Button value={pokemon.id} onClick={(e) => handleClick(e)}><ManageSearchIcon/> Details</Button>
                                        </CardActions>
                                    </CardContent>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: '35vw', marginRight: '5%' }}
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