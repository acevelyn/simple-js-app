// Lisiting each pokemon with a description of name, height and types for each
let pokemonRepository = (function() {
  let pokemonList = [];
  // assigning the API URL to variable "apiUrl"
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // a function to see all pokemons in the pokemonList
  function getAll() {
    return pokemonList;
  }
  // a function to be able to add a pokemon when this function is called
  function add(item) {
    pokemonList.push(item);
  }

  // a function to add list of pokemons on the page
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');

    listItem.appendChild(button);

    pokemonList.appendChild(listItem);

    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  // fetching the list from the Pokemon API to show name and url
  function loadList() {
    return fetch(apiUrl) // getting the data from the link assigned to apiURL
      .then(function(response) {
        return response.json(); //converting API info to JSON
      })
      .then(function(json) {
        // and with that JSON data
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        // catch any errors and display on console
        console.error(e);
      });
  }
  // Pulling details from API for each Pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // assigning and setting the content that will be in the modal
  function showModal(pokemon) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    // Clear existing content
    modalTitle.innerText = '';
    modalBody.innerHTML = '';

    const nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    const heightElement = document.createElement('p');
    heightElement.innerText = pokemon.name + ' Height: ' + pokemon.height;

    const weightElement = document.createElement('p');
    weightElement.innerText = pokemon.name + ' Weight: ' + pokemon.weight;

    const typesElement = document.createElement('p');
    let s = 'Type(s): ';
    for (let i = 0; i < pokemon.types.length; i++) {
      s =
        s +
        pokemon.types[i].type.name +
        (i != pokemon.types.length - 1 ? ', ' : '');
    }
    typesElement.innerText = s;
    // Create an <img> element
    let myImage = document.createElement('img');
    myImage.src = pokemon.imageUrl;

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(myImage);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(typesElement);
  } // End of showModal

  // Display details for the Pokemons in API
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
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
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
