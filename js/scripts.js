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
    // selecting and assigning the ul list with class .pokemon-list to var ulList
    let ulList = document.querySelector('.pokemon-list');
    // creating li elements and assigning them to var listItem
    let listItem = document.createElement('li');
    // creating a button element and assigning it to var button
    let button = document.createElement('button');
    // assigning inner text to the button element, innerText to be pokemon's name
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

  function showModal(pokemon) {
    loadDetails(pokemon).then(function () {


      let modalContainer = document.querySelector('#modal-container');

      // Clear all existing modal content
      modalContainer.innerHTML = '';

      // Creating content for Modal
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      // When the close button is clicked, call the hidalModal function
      closeButtonElement.addEventListener("click",hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let contentElement = document.createElement('p');
      contentElement.innerText ="Height: "+pokemon.height;

      // Adding an image of each pokemon to modal
      let myImage = document.createElement('img');
      myImage.src = pokemon.imageUrl;

      // Added the new elements to their assigned parent element
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(myImage);
      modalContainer.appendChild(modal);
      // adding the class name "is-visible"
      modalContainer.classList.add('is-visible');
    });
  }


  // Display details for the Pokemons in API
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  // Hide the modal when class "is-visible" is removed
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }
  // Setting the Escape key to close out the Modal
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  // Setting the Modal to close when the overlay of the modal-container is clicked
  let modalContainer = document.querySelector("#modal-container");
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  // returns all functions so they can be accessed
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    showDetails: showDetails,
    hideModal: hideModal
  };
})();

// Going through each pokemon in the API Repository and Display Details for each
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
