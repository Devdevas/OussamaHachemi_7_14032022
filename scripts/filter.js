class Filter {
  constructor(data) {
    this._ingredients = data.ingredients;
    this._appliances = data.appliance;
    this._ustensils = data.ustensils;
  }

  get ingredient() {
    const ingredient = this._ingredients.map((element) => {
      return `<li>${element.ingredient}</li>`;
    });
    return ingredient;
  }

  get appliance() {
    return `<li>${this._appliances}</li>`;
  }

  get ustensil() {
    const ustensil = this._ustensils.map((element) => {
      return `<li>${element}</li>`;
    });
    return ustensil;
  }
}
