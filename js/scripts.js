// Lisiting each pokemon with a description of name, height and types for each
let pokemonList = [
{name: "Bulbasaur", height: 1.0, types: ['grass', 'poison']},
{name: "Pikachu", height: 0.5, types:['field', 'fairy']  },
{name: "Eevee", height: 0.8, types: ['field'] }
];

// listing each pokemon name and height on Page
pokemonList.forEach(function(pokemon){
  document.write('<p>'+pokemon.name+ ' (height: ' +pokemon.height+ ')');
// if a pokemon's height is > or = to 1.0 print message beside it
  if(pokemon.height >= 1.0){
    document.write(' Wow that\'s big!');
  }
});
