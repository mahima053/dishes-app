import i18next from "i18next";

enum DietType {
    Vegetarian = 'Vegetarian',
    NonVegetarian = 'Non-Vegetarian'
}

const dietTypeTranslations = {
    [DietType.Vegetarian]: 'diet.vegetarian',
    [DietType.NonVegetarian]: 'diet.nonVegetarian'
}

function getLocalizedDietType(dietType: DietType): string {
    return i18next.t(dietTypeTranslations[dietType]);
}

export { DietType, getLocalizedDietType };