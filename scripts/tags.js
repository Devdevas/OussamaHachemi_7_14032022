const tagsContainer = document.querySelector(".tags");

function tagsHandler(data) {
  addTags(data);
  removeTags(data);
  filterRecipesByTags(data);
}

function addTags(data) {
  //We add eventListener to all filters listboxes
  filtersList.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      const clickedFilterText = e.target.closest("li").textContent;
      const ingredientTag = `<li class="blue" data-text="${clickedFilterText}">${clickedFilterText}<img src="assets/close.svg" alt="Remove tag" /></li>`;
      const applianceTag = `<li class="green" data-text="${clickedFilterText}">${clickedFilterText}<img src="assets/close.svg" alt="Remove tag" /></li>`;
      const ustensilTag = `<li class="red" data-text="${clickedFilterText}">${clickedFilterText}<img src="assets/close.svg" alt="Remove tag" /></li>`;
      //Get tag that has the same name as clicked filrer
      //for that we use data-text
      const tag = document.querySelector(
        `[data-text = "${clickedFilterText}"]`
      );
      //Checking where the click event happened so we could add tags by color
      if (filtersList[0].contains(e.target) && !tagsContainer.contains(tag)) {
        tagsContainer.innerHTML += ingredientTag;
      } else if (
        filtersList[1].contains(e.target) &&
        !tagsContainer.contains(tag)
      ) {
        tagsContainer.innerHTML += applianceTag;
      } else if (
        filtersList[2].contains(e.target) &&
        !tagsContainer.contains(tag)
      ) {
        tagsContainer.innerHTML += ustensilTag;
      }

      filterRecipesByTags(data);
    });
  });
}

function removeTags(data) {
  //Remvove tag by clicking on the X button and then filter recipes
  tagsContainer.addEventListener("click", (e) => {
    if (e.target.closest("img")) {
      e.target.parentNode.remove();
      filterRecipesByTags(data);
    }
  });
}


function filterRecipesByTags(data) {
  const tagsList = Array.from(tagsContainer.querySelectorAll("li"));
  //Get tag's name
  const tags = tagsList.map((tag) => {
    return tag.dataset.text;
  });
  //Use filter method to filter recipes
  const filteredRecipes = data.filter((recipe) => {
    const ingredients = recipe.ingredients.map((el) => {
      return el.ingredient;
    });
    //Concatenate ingredients, appliances and ustensils in a signle array
    const recipeElements = ingredients.concat(
      recipe.appliance,
      recipe.ustensils
    );
    //Check if every tag exists in recipe
    //if "true" we return recipe
    const tagExist = tags.every((tag) => {
      return recipeElements.includes(tag);
    });
    if (tagExist) {
      return recipe;
    }
  });
  displayRecipes(filteredRecipes);
  filtersListboxHandler(filteredRecipes);
}
