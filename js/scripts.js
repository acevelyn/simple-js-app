// Lisiting each pokemon with a description of name, height and types for each
let pokemonList = [
{name: "Bulbasaur", height: 1.0, types: ['grass', 'poison']},
{name: "Pikachu", height: 0.5, types:['field', 'fairy']  },
{name: "Eevee", height: 0.8, types: ['field'] }
];




// listing each pokemon name and height on Page
for (let i=0; i < pokemonList.length; i++){
  document.write('<p>' + pokemonList[i].name + " " + '(height: ' + pokemonList[i].height + ')');
// if a pokemon's height is > or = to 1.0 print message beside it
  if(pokemonList[i].height >= 1.0){
    document.write(' Wow that\'s big!');
  }
}
