import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let param = new URLSearchParams(search);
  let city = param.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    let data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  adventures.forEach((value) => {
    let anchor = document.createElement("a");
    anchor.setAttribute("href", `detail/?adventure=${value.id}`);
    document
      .querySelector("#data")
      .setAttribute("class", "row row-cols-2 row-cols-lg-4");
    anchor.setAttribute("id", `${value.id}`);
    let card = document.createElement("div");
    card.setAttribute("class", "activity-card card mt-3");
    card.innerHTML = `
      <img clas="card-image-top"  src=${value.image}></img>
      <p class="category-banner">${value.category}</p>
      <div class="d-flex justify-content-between p-2 w-100 align-items-center">
      <h5 class="card-title">${value.name}</h5>
      <h6 class="card-text">₹${value.costPerHead}</h6>
      </div>
      <div class="d-flex justify-content-between p-2 w-100 align-items-center">
      <h5 class="card-title">Duration </h5>
      <h6 class="card-text">${value.duration} Hours</h6>
      </div>
      `;
    anchor.append(card);
    document.querySelector("#data").append(anchor);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  let newArr = list.filter((item) => {
    if (item.duration >= low && item.duration <= high) return item;
  });
  return newArr;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let newArr = list.filter((item) => categoryList.includes(item.category));
  return newArr;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // Place holder for functionality to work in the Stubs
  let durationArr = filters.duration.split("-");
  if (filters.category.length !== 0 && filters.duration === "") {
    let arr = filterByCategory(list, filters.category);
    return arr;
  } else if (filters.duration !== "" && filters.category.length === 0) {
    let arr = filterByDuration(list, durationArr[0], durationArr[1]);
    return arr;
  } else if (filters.duration !== "" && filters.category.length !== 0) {
    let arr = filterByCategory(list, filters.category);
    let arr1 = filterByDuration(arr, durationArr[0], durationArr[1]);
    return arr1;
  } else return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // Place holder for functionality to work in the Stubs

  let stringFilters = localStorage.getItem("filters");
  let data = JSON.parse(stringFilters);
  return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let arr = filters.category;
  arr.forEach((value) => {
    let categoryList = document.getElementById("category-list");
    categoryList.innerHTML += `<p class="category-filter">${value}</p>`;
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
