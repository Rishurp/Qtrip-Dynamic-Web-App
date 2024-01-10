import config from "../conf/index.js";


async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let res = await fetch(config.backendEndpoint +"/cities")
    let data = await res.json();
    return data;
  }
  catch(err){
      return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  let card = document.createElement("a");
  let data = document.querySelector( "#data" );
  card.setAttribute("href",`pages/adventures/?city=${id}`)
  card.setAttribute("id",`${id}`);
  data.setAttribute("class", " row row-cols-1 row-cols-sm-2 row-cols-xl-4");
  card.setAttribute("class", "tile mb-3");
  card.innerHTML = `
  <img src=${image} ></img>
  <div class="tile-text">
  <h5>${city}</h5>
  <p>${description}</p>
  `
  data.append(card);
}

export { init, fetchCities, addCityToDOM };
