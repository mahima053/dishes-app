import i18next from "i18next";

enum FlavorProfile {
    Spicy = 'Spicy',
    Sweet = 'Sweet',
    Sour = 'Sour',
    Bitter = 'Bitter',
}

const flavorProfileTranslations = {
    [FlavorProfile.Spicy]: 'flavorProfile.spicy',
    [FlavorProfile.Sweet]: 'flavorProfile.sweet',
    [FlavorProfile.Sour]: 'flavorProfile.sour',
    [FlavorProfile.Bitter]: 'flavorProfile.bitter',
}

function getLocalizedFlavorProfile(flavorProfile: FlavorProfile): string {
    return i18next.t(flavorProfileTranslations[flavorProfile]);
}

export { FlavorProfile, getLocalizedFlavorProfile };