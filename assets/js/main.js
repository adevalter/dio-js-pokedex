const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 1015
const limit = 5
let offset = 0


function loadPokemonItens(offset, limit){

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
       const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                   <span class="number">#${pokemon.numer}</span>
                   <span class="name">${pokemon.name}</span>
                   <div class="detail">
                       <ol class="types">
                          ${pokemon.types.map((type)=> `<li class="type">${type}</li>`).join('')}
                       </ol>
                       <img src="${pokemon.photo}"
                           alt="${pokemon.name}">
                   </div>
               </li>
         `)
         .join('')

       pokemonList.innerHTML += newHtml
    })
}
/*
pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonLi).join('')
})
*/

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () => {
   
    offset += limit
    const qtdRecordNextPage = offset + limit
    if(qtdRecordNextPage >= maxRecords){
        const newList = maxRecords - offset
        loadPokemonItens(offset, newList)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset,limit)
    }
   
})