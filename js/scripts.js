// Lisiting each pokemon with a description of name, height and types for each
let pokemonRepository = (function(){
  let pokemonList = [];
  // assigning the API URL to variable "apiUrl"
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
// a function to see all pokemons in the pokemonList
function getAll(){
  return pokemonList;
}
// a function to be able to add a pokemon when this function is called
function add(item){
  pokemonList.push(item);
}


// a function to add list of pokemons on the page
function addListItem(pokemon){

  let pokemonList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  listItem.classList.add("group-list-item")

  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  button.classList.add('btn','btn-primary');
  button.setAttribute('data-toggle',"modal")
  button.setAttribute('data-target',"#exampleModal")
 // button.setAttribute('type',"button");

  listItem.appendChild(button);

  pokemonList.appendChild(listItem);

  button.addEventListener("click", function(){
    showDetails(pokemon);
  })

}

// fetching the list from the Pokemon API to show name and url
function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();   //converting API info to JSON
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  // Pulling details from API for each Pokemon
function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // NEWW FUNCTION ************** //

  function showModal(pokemon){
    let modalBody = document.querySelector(".modal-body");
    let modalTitle = document.querySelector(".modal-title");
    let modalHeader = document.querySelector(".modal-header");

  // Clear existing content
  modalTitle.innerText = "";
  modalBody.innerHTML = "";
  //modalBody.empty();
  //modalTitle.empty();

  let nameElement = document.createElement('h1');
  nameElement.innerText = pokemon.name;

  let heightElement = document.createElement('p');
  heightElement.innerText = 'Height: '+pokemon.height;


// Create an <img> element
let myImage = document.createElement('img');
myImage.src = pokemon.imageUrl;


  modalTitle.appendChild(nameElement);
  modalBody.appendChild(myImage);
  modalBody.appendChild(heightElement);

  } // End of showModal




  // Display details for the Pokemons in API
  function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
}

// returns all functions so they can be accessed
return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showModal: showModal,
  showDetails: showDetails
};
})();

// Going through each pokemon in the API Repository and Display Details for each
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
