// Lisiting each pokemon with a description of name, height and types for each
let pokemonRepository = (function(){
  let pokemonList = [
{name: "Bulbasaur", height: 1.0, types: ['grass', 'poison']},
{name: "Pikachu", height: 0.5, types:['field', 'fairy']  },
{name: "Eevee", height: 0.8, types: ['field'] }
];
// a function to see all pokemons in the pokemonList
function getAll(){
  return pokemonList;
}
// a function to be able to add a pokemon when this function is called
function add(item){
  pokemonList.push(item);
}
// A function to see each Pokemon's name on the console
function showDetails(pokemon){
console.log(pokemon.name)
}
// a function to add list of pokemons on the page
function addListItem(pokemon){
// selecting and assigning the ul list with class .pokemon-list to var ulList
  let ulList = document.querySelector('.pokemon-list');
// creating li elements and assigning them to var listItem
  let listItem = document.createElement('li');
// creating a button element and assigning it to var button
  let button = document.createElement('button');
// assigning inner text to the button element
  button.innerText = pokemon.name;
// adding a class name to the button named "button-class"
  button.classList.add('button-class');
// adding an event when the button is clicked, to show the pokemon name on the console
  button.addEventListener("click", function(event){
    showDetails(pokemon);
  })
// making every list item a button
  listItem.appendChild(button);
// adding listItem to the ulList created in index file
  ulList.appendChild(listItem);
}
// returns getAll, add and addListItem functions when called, so it can still be accessed
return {
  getAll: getAll,
  add: add,
  addListItem: addListItem
};
})();

// Going through & performing the addlistItem function to each pokemon in Repository
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
})
