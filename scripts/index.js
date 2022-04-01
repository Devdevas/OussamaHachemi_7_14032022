async function getRecipesData() {
  const data = await fetch("data/recipes.json");
  const recipesData = await data.json();

  return { recipesData };
}

const searchInput = document.querySelector(".search__input");
const inputRegEx = new RegExp("^[a-zA-ZÀ-ú0-9 ,'-]{3,}$");

function getWantedData(recipesData) {
  const wantedData = recipesData.filter((recipe) => {
    const names = recipe.name;
    const descriptions = recipe.description;
    const ingredients = recipe.ingredients.map((el) => {
      return el.ingredient;
    });
    return (
      names.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      descriptions.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      ingredients
        .join(" ")
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    );
  });
  displayWantedData(recipesData, wantedData);
}

function displayWantedData(recipesData, wantedData) {
  const isValidInput = inputRegEx.test(searchInput.value);
  if (isValidInput && !tagsContainer.hasChildNodes()) {
    tagsHandler(wantedData);
    displayRecipesData(wantedData);
    filtersListboxHandler(wantedData);
  } else if (!isValidInput && !tagsContainer.hasChildNodes()) {
    tagsHandler(recipesData);
    displayRecipesData(recipesData);
    filtersListboxHandler(recipesData);
  } else if (!isValidInput && tagsContainer.hasChildNodes()) {
    tagsHandler(recipesData);
  } else if (isValidInput && tagsContainer.hasChildNodes()) {
    tagsHandler(wantedData);
  }
}

function displayRecipesData(recipesData) {
  const articlesSection = document.querySelector(".articles-section");
  const articles = recipesData.map((element) => {
    const recipeCardDOM = new RecipeCard(element).getRecipeCard();
    return recipeCardDOM;
  });
  articlesSection.innerHTML = articles.join("");
  if (recipesData.length === 0) {
    articlesSection.innerHTML = `
    <p class="no-result">Aucune recette ne correspond à votre critère…<br>
    vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
  }
}

async function init() {
  const { recipesData } = await getRecipesData();

  displayRecipesData(recipesData);
  filtersListboxHandler(recipesData);
  tagsHandler(recipesData);

  searchInput.addEventListener("input", getWantedData.bind(null, recipesData));
}
init();
