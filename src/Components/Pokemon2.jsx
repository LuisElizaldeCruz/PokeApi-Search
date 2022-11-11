import React, { useEffect, useState } from 'react'
import "../assets/css/Pokemon.css";

export default function Pokemon2() {
    const [pName, setPName] = useState("snorlax");
    const [pokemon, setPokemon] = useState({
        weight: 0,
        types: "",
        moves: 0,
        frontDefault: "",
        frontShiny: ""
    });

    useEffect(()=>{
        searchPokemon;
    },[])

    const searchPokemon = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pName}`);
            const data = await res.json();
            handleData(data);
        } catch (error) {
            console.log(error);
        }
    }

   

    const handleData = (pokeData) => {
        //console.log(pokeData)
        const { weight: weightD, types: typesD, moves: movesD, sprites: spritesD } = pokeData;
        /* console.log("weight: ", weight);
         console.log("types: ", types[0].type.name);
         console.log("moves: ", moves.length);
         console.log("img1: ",sprites.front_default);
         console.log("img1: ",spritesD.front_shiny);
         */
        setPokemon({
            ...pokemon, weight: weightD, types: typesD[0].type.name, moves: movesD.length,
            frontDefault: spritesD.front_default, frontShiny: spritesD.front_shiny
        });
        console.log(pokemon)
    }



    return (
        <>
            <h1>pokemon</h1>

            <form className='form'>
                <input className="inPokemon" placeholder='enter you pokemon' onChange={(e) => { setPName(e.target.value.toLowerCase()) }} />
                <button className='searchPokemon' onClick={searchPokemon}>buscar pokemon</button>
                <div className='dataPokemon'>
                    <div>
                        <label>weight</label>
                        <input type="text" className='weight' value={pokemon.weight} />
                    </div>
                    <div>
                        <label>types</label>
                        <input type="text" className='types' value={pokemon.types} />
                    </div>
                    <div>
                        <label>moves</label>
                        <input type="text" className='moves' value={pokemon.moves} />
                    </div>
                </div>
            </form>
            <h4>Sprites</h4>
            {
                <div className='images'>
                    <img className='img-pokemon' src={pokemon.frontDefault} alt="pokemon-default"></img>
                    <img className='img-pokemon' src={pokemon.frontShiny} alt="pokemon-shiny"></img>
                </div>
            }
        </>
    )
}
