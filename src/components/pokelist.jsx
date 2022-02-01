import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp';
import StarIcon from '@mui/icons-material/Star';

function Pokelist({ state, data,  dispatch }) {

    function upperFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <div style={{ width: '100vw', display: 'flex', flexDirection: 'row', flexFlow: 'row wrap', justifyContent: 'center' }}>
            {data && data.map((pokemon, i) => {
                return (
                    <Card key={pokemon.id} sx={{ maxWidth: 600, margin: '5px' }}>
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
                                {/* {upperFirstLetter(pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name)} */}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {(() => {
                                if (state.data[pokemon.id] == state.favs[pokemon.id]) {
                                    return <StarIcon onClick={(e) => dispatch({ type: 'favs', value: pokemon.id })} />
                                } else {
                                    console.log(pokemon.id)
                                    return <StarBorderSharpIcon onClick={(e) => dispatch({ type: 'favs', value: pokemon.id })} />
                                }
                            })()}
                            <Button size="small">Detalles</Button>
                        </CardActions>
                    </Card>
                )
            })}
        </div>
    )

}
export default Pokelist;