
const filters = document.querySelectorAll(".filters__filter");
const filtersList = document.querySelectorAll(".filters__list");
const filtersInput = document.querySelectorAll(".filters__input");
const arrowUp = document.querySelectorAll(".up");
const arrowDown = document.querySelectorAll(".down");

function filtersListboxHandler(data) {
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      displayFiltersList(data);
      if (filter.dataset.text === "ingredients") {
        closeAllFilters();
        openClickedFilter(0, "Rechercher un ingrédient");
      } else if (filter.dataset.text === "appliances") {
        closeAllFilters();
        openClickedFilter(1, "Rechercher un appareil");
      } else if (filter.dataset.text === "ustensils") {
        closeAllFilters();
        openClickedFilter(2, "Rechercher un ustensile");
      }
    });
  });
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".filters__filter") || e.target.closest(".up")) {
      closeAllFilters();
    }
  });
}

function displayFiltersList(data) {
  const filtersList = document.querySelectorAll(".filters__filter ul");

  const { ingredients, ustensils, appliances } = getFilters(data);

  filtersList[0].innerHTML = ingredients.join("");
  filtersList[1].innerHTML = appliances.join("");
  filtersList[2].innerHTML = ustensils.join("");

  filtersInput.forEach((element) => {
    element.addEventListener("input", () => {
      searchFilters(ingredients, 0);
      searchFilters(appliances, 1);
      searchFilters(ustensils, 2);
    });
  });
}

function searchFilters(filterData, i) {
  const wantedFilter = filterData.filter((element) => {
    return (
      element
        .toLowerCase()
        .includes(`<li>${filtersInput[i].value.toLowerCase()}`) ||
      element.toLowerCase().includes(filtersInput[i].value.toLowerCase())
    );
  });
  filtersList[i].innerHTML = wantedFilter.join("");
}

function closeAllFilters() {
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
  arrowUp[index].style.display = "block";
  arrowDown[index].style.display = "none";
  filtersList[index].classList.toggle("visible");
  filtersInput[index].placeholder = placeholderText;
  filtersInput[index].classList.add("opacity");
}

// Remove duplicates filters
function getFilters(data) {
  const ingredients = [];
  const appliances = [];
  const ustensils = [];

  data.forEach((element) => {
    if (!ingredients.includes(...new Filter(element).ingredient)) {
      ingredients.push(...new Filter(element).ingredient);
    }
    if (!appliances.includes(new Filter(element).appliance)) {
      appliances.push(new Filter(element).appliance);
    }
    if (!ustensils.includes(...new Filter(element).ustensil)) {
      ustensils.push(...new Filter(element).ustensil);
    }
  });
  const ingredientsList = Array.from(new Set(ingredients));
  const ustensilsList = Array.from(new Set(ustensils));

  return {
    ingredients: ingredientsList,
    appliances: appliances,
    ustensils: ustensilsList,
  };
}
