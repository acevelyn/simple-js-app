// Lisiting each pokemon with a description of name, height and types for each
let pokemonRepository = (function(){
  let pokemonList = [
{name: "Bulbasaur", height: 1.0, types: ['grass', 'poison']},
{name: "Pikachu", height: 0.5, types:['field', 'fairy']  },
{name: "Eevee", height: 0.8, types: ['field'] }
];

function getAll(){
  return pokemonList;
}
function add(item){
  pokemonList.push(item);
}
function showDetails(pokemon){
console.log(pokemon.name)
}

function addListItem(pokemon){
  let ulList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;

  button.classList.add('button-class');
  button.addEventListener("click", function(event){
    showDetails(pokemon);
  })
  listItem.appendChild(button);
  ulList.appendChild(listItem);
}
return {
  getAll: getAll,
  add: add,
  addListItem: addListItem
};
})();

// listing each pokemon name and height on Page
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
})
