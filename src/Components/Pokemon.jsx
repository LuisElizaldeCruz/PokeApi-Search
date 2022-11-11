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

    useEffect(() => {
        searchPokemon();
    }, [])

    const searchPokemon = async (e) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pName}`);
            console.log(res);
            const data = await res.json();
            console.log(data)
            getData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getData = (pokeData) => {
        //console.log(pokeData)
        const { weight: weightD, types: typesD, moves: movesD, sprites: spritesD } = pokeData;//destructuracion
        /* 
        console.log("weight: ", weightD);
         console.log("types: ", typesD[0].type.name);
         console.log("moves: ", movesD.length);
         console.log("img1: ",spritesD.front_default);
         console.log("img1: ",spritesD.front_shiny);
         */
        setPokemon({
            weight: weightD, types: typesD[0].type.name, moves: movesD.length,
            frontDefault: spritesD.front_default, frontShiny: spritesD.front_shiny
        });
    }



    return (
        <>
            <div className='contenedor'>
                <h1>pokemon</h1>
                <input className="inPokemon" placeholder='enter you pokemon' onChange={(e) => { setPName(e.target.value.toLowerCase()) }} />
                <button className='searchPokemon' onClick={searchPokemon}>search pokemon</button>
                <div className='dataPokemon'>
                    <div>
                        <label>weight</label>
                        <input type="text" className='weight' value={pokemon.weight} readOnly />
                    </div>
                    <div>
                        <label>types</label>
                        <input type="text" className='types' value={pokemon.types} readOnly />
                    </div>
                    <div>
                        <label>moves</label>
                        <input type="text" className='moves' value={pokemon.moves} readOnly />
                    </div>
                </div>
            </div>
            <h4>Sprites</h4>

            <div className='images'>
                <div className='fDefault'>
                    <h5>front_default</h5>
                    <img className='img-pokemon' src={pokemon.frontDefault} alt="pokemon-default"></img>
                </div>
                <div className='fShiny'>
                    <h5>front_shiny</h5>
                    <img className='img-pokemon' src={pokemon.frontShiny} alt="pokemon-shiny"></img>
                </div>
            </div>

        </>
    )
}
