import i18next from "i18next";

enum DishCourse {
    Starter = 'Starter',
    Snack = 'Snack',
    MainCourse = 'Main Course',
    Dessert = 'Dessert',
}

const dishCourseTranslations = {
    [DishCourse.Starter]: 'dishCourse.starter',
    [DishCourse.Snack]: 'dishCourse.snack',
    [DishCourse.MainCourse]: 'dishCourse.mainCourse',
    [DishCourse.Dessert]: 'dishCourse.dessert',
}

function getLocalizedDishCourse(dishCourse: DishCourse): string {
    return i18next.t(dishCourseTranslations[dishCourse]);
}

export { DishCourse, getLocalizedDishCourse };