//ejercicio 1
async function obtenerPokemon() {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/snorlax");

    if (!respuesta.ok) {
        console.log("Algo salió mal. Código:", respuesta.status);
        return;
    }

    const datos = await respuesta.json();
    for(let tipos of datos.types) {
        console.log("Tipo de pokemon: ", tipos.type.name);
    }
    for(let stats of datos.stats) {
        console.log("Estadísticas de pokemon: ", stats.stat.name, "-", stats.base_stat);
    }
    for(let habilidades of datos.abilities) {
        console.log("Habilidades de pokemon: ", habilidades.ability.name);
    }
}

obtenerPokemon();


