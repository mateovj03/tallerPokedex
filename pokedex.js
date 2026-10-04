//Ejercicio 2
async function buscarPokemon(nombre) {
    nombre = nombre.toLowerCase();
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

    if (!respuesta.ok) {
        console.log("Algo salió mal. Código:", respuesta.status);
        return null;
    }else{
        const datos = await respuesta.json();
        //console.log('Nombre del pokemon: ', datos.name);
        //console.log('ID del pokemon: ', datos.id);
        return datos;
    }
}

//buscarPokemon("squirtle");
//buscarPokemon("pikachu");
//buscarPokemon("vaporeon");
//buscarPokemon("juan");

//Ejercicio 3
function mostrarFicha(datos) {
    let tipos = [];
    if (datos === null) {
        console.log("No hay datos para mostrar");
        return;
    }else{
        console.log("Nombre del pokemon: ", datos.name.toUpperCase());
        console.log("Numero de pokedex: ", datos.id);
        console.log("Tipos: ");
        for(let tipo of datos.types) {
            tipos.push(tipo.type.name);
        }
        console.log(tipos.join('/'));
        console.log("Altura: ", datos.height * 10, "cm");
        console.log("Peso: ", datos.weight / 10, "kg");
        console.log("Estadísticas: ");
        for(let stats of datos.stats) {
            console.log(stats.stat.name, '-', stats.base_stat);
        }
        console.log("Habilidades: ");
        for(let habilidades of datos.abilities) {
            console.log(habilidades.ability.name);
        }
    }
}

//mostrarFicha(await buscarPokemon("charizard"));
//mostrarFicha(await buscarPokemon("umbreon"));


//Ejercicio 4

async function compararPokemon(pokemon1, pokemon2, stat) {
    pokemon1 = await buscarPokemon(pokemon1);
    pokemon2 = await buscarPokemon(pokemon2);
    if (pokemon1 === null || pokemon2 === null) {
        console.log("No se puede comparar");
        return;
    }

    const statPokemon1 = obtenerStat(pokemon1, stat);
    const statPokemon2 = obtenerStat(pokemon2, stat);

    if(statPokemon1 === null && statPokemon2 === null) {
        console.log("Ninguno de los dos pokemones tiene la estadística", stat);
        return;
    }else if(statPokemon1 === null) {
        console.log("El pokemon 1 no tiene la estadística", stat);
        return;
        }else if (statPokemon2 === null) {
            console.log("El pokemon 2 no tiene la estadística", stat);
            return;
        }

    if (statPokemon1 > statPokemon2) {
        console.log("El pokemon 1 gana");
    } else if (statPokemon1 < statPokemon2) {
        console.log("El pokemon 2 gana");
    } else {
        console.log("Hay un empate");
    }
}

function obtenerStat(datos, nombreStat) {
    for(let stats of datos.stats) {
        if(stats.stat.name == nombreStat) {
            return stats.base_stat;
        }
    }
    return null;

}


//await compararPokemon("snorlax", "machamp", "hp"); //elegi hp ya que ambos son pokemones grandes, por lo que deben tener bastante vida.

//await compararPokemon("vaporeon", "gengar", "defense"); 

//await compararPokemon("vaporeon", "gengar", "poder-magico"); 

//Ejercicio 5
async function pokemonMasFuerte(listaNombres, stat) {
    let mejorNombre = null;
    let mejorStat = -1;
    for (let nombre of listaNombres) {
        let pokemon = await buscarPokemon(nombre);
        let statPokemon = await obtenerStat(pokemon, stat);
        if (statPokemon === null || pokemon === null) {
            continue;
        }
        if (statPokemon > mejorStat) {
            mejorStat = statPokemon;
            mejorNombre = nombre;
        }
    }
    console.log("El pokemon con mejor", stat, "es", mejorNombre);
    return mejorNombre;
}

let equipo = ["umbreon", "jigglypuff", "charizard", "metapod", "pikachu"];

await pokemonMasFuerte(equipo, "attack"); 
await pokemonMasFuerte(equipo, "defense"); 

mostrarFicha(await buscarPokemon(await pokemonMasFuerte(equipo, "attack")));