//Get DOM elements
const filter = document.querySelectorAll(".filters__filter");
const filtersList = document.querySelectorAll(".filters__list");
const filtersInput = document.querySelectorAll(".filters__input");
const arrowUp = document.querySelectorAll(".up");
const arrowDown = document.querySelectorAll(".down");

function filtersListboxHandler(recipes) {
  //Add eventListner to each filter
  filter.forEach((element) => {
    element.addEventListener("click", () => {
      displayFiltersList(recipes);
      closeFilters();
      //We refer to data-text to open the clicked filter
      if (element.dataset.text === "ingredients") {
        openClickedFilter(0, "Rechercher un ingrédient");
      } else if (element.dataset.text === "appliances") {
        openClickedFilter(1, "Rechercher un appareil");
      } else if (element.dataset.text === "ustensils") {
        openClickedFilter(2, "Rechercher un ustensile");
      }
    });
  });
  //Close filters when clicking outside in the window
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".filters__filter") || e.target.closest(".up")) {
      closeFilters();
    }
  });
}

//Get filters and remove duplicate ones
function getFilters(data) {
  const ingredientsList = [];
  const appliancesList = [];
  const ustensilsList = [];

  //Creat new Filter instance for each element and push it
  data.forEach((element) => {
    ingredientsList.push(...new Filter(element).ingredient);
    appliancesList.push(new Filter(element).appliance);
    ustensilsList.push(...new Filter(element).ustensil);
  });
  //Remove duplicate elements using Set object
  const ingredients = Array.from(new Set(ingredientsList));
  const appliances = Array.from(new Set(appliancesList));
  const ustensils = Array.from(new Set(ustensilsList));

  return {
    ingredients: ingredients,
    appliances: appliances,
    ustensils: ustensils,
  };
}

function displayFiltersList(recipes) {
  const filtersList = document.querySelectorAll(".filters__filter ul");
//Destructuring getFilters() and listen to input event of each filter
  const { ingredients, ustensils, appliances } = getFilters(recipes);
//Append all lists when open filter
  filtersList[0].innerHTML = ingredients.join("");
  filtersList[1].innerHTML = appliances.join("");
  filtersList[2].innerHTML = ustensils.join("");
//Filtering filters for each character entred
  filtersInput.forEach((element) => {
    element.addEventListener("input", () => {
      inputSearchFilters(ingredients, 0);
      inputSearchFilters(appliances, 1);
      inputSearchFilters(ustensils, 2);
    });
  });
}

function inputSearchFilters(filterType, index) {
  const wantedFilter = filterType.filter((element) => {
    return (
      element
        .toLowerCase()
        .includes(`<li>${filtersInput[index].value.toLowerCase()}`) ||
      element.toLowerCase().includes(filtersInput[index].value.toLowerCase())
    );
  });
  filtersList[index].innerHTML = wantedFilter.join("");
}

function closeFilters() {
  //Close opened filter list, change arrow direction and placeholder value
  for (let i = 0; i < 3; i++) {
    filtersList[i].classList.remove("visible");
    arrowDown[i].style.display = "block";
    arrowUp[i].style.display = "none";
    filtersInput[i].classList.remove("opacity");
    filtersInput[i].value = "";
  }
  filtersInput[0].placeholder = "Ingrédients";
  filtersInput[1].placeholder = "Appareils";
  filtersInput[2].placeholder = "Ustensiles";
}

function openClickedFilter(index, placeholderText) {
  //Show and hide filter list on click
  arrowUp[index].style.display = "block";
  arrowDown[index].style.display = "none";
  filtersList[index].classList.toggle("visible");
  filtersInput[index].placeholder = placeholderText;
  filtersInput[index].classList.add("opacity");
}
