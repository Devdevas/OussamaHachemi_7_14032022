async function getRecipes() {
  const data = await fetch("data/recipes.json");
  const recipes = await data.json();

  return { recipes };
}

const searchInput = document.querySelector(".search__input");
const inputRegEx = new RegExp("^[a-zA-ZÀ-ú0-9 ,'-]{3,}$");

function getFilteredRecipes(recipes) {
  const filteredRecipes = [];
  for (const recipe of recipes) {
    const names = recipe.name;
    const descriptions = recipe.description;
    const ingredients = recipe.ingredients.map((el) => {
      return el.ingredient;
    });
    if (
      names.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      descriptions.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      ingredients
        .join(" ")
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      filteredRecipes.push(recipe);
    }
  }
  displayFilteredRecipes(recipes, filteredRecipes);
}

function displayFilteredRecipes(recipes, filteredRecipes) {
  const isValidInput = inputRegEx.test(searchInput.value);
  if (isValidInput && !tagsContainer.hasChildNodes()) {
    tagsHandler(filteredRecipes);
    displayRecipes(filteredRecipes);
    filtersListboxHandler(filteredRecipes);
  } else if (!isValidInput && !tagsContainer.hasChildNodes()) {
    tagsHandler(recipes);
    displayRecipes(recipes);
    filtersListboxHandler(recipes);
  } else if (!isValidInput && tagsContainer.hasChildNodes()) {
    tagsHandler(recipes);
  } else if (isValidInput && tagsContainer.hasChildNodes()) {
    tagsHandler(filteredRecipes);
  }
}

function displayRecipes(recipes) {
  const articlesSection = document.querySelector(".articles-section");
  const articles = recipes.map((element) => {
    const recipeCardDOM = new RecipeCard(element).getRecipeCard();
    return recipeCardDOM;
  });
  articlesSection.innerHTML = articles.join("");
  if (recipes.length === 0) {
    articlesSection.innerHTML = `
    <p class="no-result">Aucune recette ne correspond à votre critère…<br>
    vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
  }
}

async function init() {
  const { recipes } = await getRecipes();

  displayRecipes(recipes);
  filtersListboxHandler(recipes);
  tagsHandler(recipes);

  searchInput.addEventListener("input", getFilteredRecipes.bind(null, recipes));
}
init();
