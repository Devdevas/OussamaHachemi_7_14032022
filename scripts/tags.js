const tagsContainer = document.querySelector(".tags");

function tagsHandler(data) {
  addTags(data);
  removeTags(data);
  filterByTags(data);
}

function addTags(data) {
  filtersList.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      const clickedFilterText = e.target.closest("li").textContent;
      const ingredientTag = `<li class="blue" data-text="${clickedFilterText}">${clickedFilterText}<img src="assets/close.svg" alt="Remove tag" /></li>`;
      const applianceTag = `<li class="green" data-text="${clickedFilterText}">${clickedFilterText}<img src="assets/close.svg" alt="Remove tag" /></li>`;
      const ustensilTag = `<li class="red" data-text="${clickedFilterText}">${clickedFilterText}<img src="assets/close.svg" alt="Remove tag" /></li>`;

      const tag = document.querySelector(
        `[data-text = "${clickedFilterText}"]`
      );

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

      filterByTags(data);
    });
  });
}

function removeTags(data) {
  tagsContainer.addEventListener("click", (e) => {
    if (e.target.closest("img")) {
      e.target.parentNode.remove();
      filterByTags(data);
    }
  });
}

function filterByTags(data) {
  const tagsList = Array.from(tagsContainer.querySelectorAll("li"));
  const tags = tagsList.map((tag) => {
    return tag.dataset.text;
  });

  const wantedData = data.filter((element) => {
    const ingredients = element.ingredients.map((el) => {
      return el.ingredient;
    });
    const allFilters = ingredients.concat(element.appliance, element.ustensils);
    const tagExist = tags.every((tag) => {
      return allFilters.includes(tag);
    });
    if (tagExist) {
      return element;
    }
  });
  displayRecipesData(wantedData);
  filtersListboxHandler(wantedData);
}
