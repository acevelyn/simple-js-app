// Lisiting each pokemon with a description of name, height and types for each
let pokemonList = [
{name: "Bulbasaur", height: 5, types: ['grass', 'poison']},
{name: "Pikachu", height: 7, types:['field', 'fairy']  },
{name: "Eevee", height: 9, types: ['field'] }
];


for (let i=0; i < pokemonList.length; i++){
  document.write('<p>' + pokemonList[i].name + " " + '(height: ' + pokemonList[i].height + ')');
}
