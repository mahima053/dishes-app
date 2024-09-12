import { DietType } from "./diet-type";
import { DishCourse } from "./dish-course";
import { FlavorProfile } from "./flavor-profile";

interface Dish {
    name: string; // Assuming the name will be unique
    ingredients: string[];
    diet: DietType;
    prepTime: number | null;
    cookTime: number | null;
    flavor: FlavorProfile | null;
    course: DishCourse | null;
    state: string | null;
    region: string | null;
}

export { Dish };