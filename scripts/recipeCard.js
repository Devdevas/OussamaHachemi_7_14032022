class RecipeCard {
  constructor(data) {
    this._name = data.name;
    this._time = data.time;
    this._description = data.description;
    this._ingredients = data.ingredients;
  }

  get ingredient() {
    const ingredient = this._ingredients
      .map((element) => {
        const { ingredient, quantity, unit } = element;
        if (quantity && unit) {
          return `<li><strong>${ingredient}:</strong> ${quantity}${unit}</li>`;
        } else if (quantity && !unit) {
          return `<li><strong>${ingredient}:</strong> ${quantity}</li>`;
        } else {
          return `<li><strong>${ingredient}</strong></li>`;
        }
      })
      .join("");
    return ingredient;
  }

  get description() {
    const description =
      this._description.length > 280
        ? `${this._description.substring(0, 280)}...`
        : this._description;
    return description;
  }

  getRecipeCard() {
    const article = `<article>
    <div class="articles-section__img"></div>
    <div class="articles-section__recipe">
      <div class="articles-section__recipe--header">
        <h2>${this._name}</h2>
        <p><strong><i class="fas fa-clock"></i> ${this._time} min</strong></p>
      </div>
      <div class="articles-section__recipe--body">
        <ul>${this.ingredient}</ul>
        <p>${this.description}</p>
      </div>
    </div>
  </article>`;

    return article;
  }
}
