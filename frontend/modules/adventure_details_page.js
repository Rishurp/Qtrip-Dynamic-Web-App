import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let urlParams = new URLSearchParams(search);
  let adventureID = urlParams.get("adventure");
  return adventureID;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let res = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    let data = await res.json();
    return data;
  }
  catch(err)
  {
    return null;
  }
  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  let adventName = document.getElementById("adventure-name");
  let adventSubtitle = document.getElementById("adventure-subtitle");
  let photoGallery = document.getElementById("photo-gallery");
  let adventContent = document.getElementById("adventure-content");

    adventName.textContent = adventure.name;
    adventSubtitle.textContent = adventure.subtitle;
    adventure.images.forEach((img) =>{
    photoGallery.innerHTML += `
    <div ><img src=${img} class="activity-card-image"/></div>`
    });
    adventContent.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
   let photoGallery = document.getElementById("photo-gallery");
    photoGallery.innerHTML = "";
    photoGallery.innerHTML =`
    
    <div id="carouselIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="btn-div">
  </div>
  <div class="carousel-inner" id="images-div"></div>
  
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    
    `
  let slideBtn = document.getElementById("btn-div");
  let imageDiv = document.getElementById("images-div");

  images.forEach((img,index) =>{

    const btnClass = index ==0 ?"active":"";
    const  ariaCurrent = index == 0 ? "true":"false";
    const btn = `<button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to=${index} class=${btnClass} aria-current=${ariaCurrent} aria-label="Slide ${index +1}"></button>`

    const imageClass = index == 0 ? "carousel-item active": "carousel-item";
    
    const imgSubDivs = `<div class="${imageClass}">
    <img src=${img} class="d-block activity-card-image " alt="Slide ${index+1}">
  </div>`

    slideBtn.innerHTML +=btn;;
    imageDiv.innerHTML +=imgSubDivs;


  });


  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
