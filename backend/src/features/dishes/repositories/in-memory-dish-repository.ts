import { DishRepository } from "./dish-repository";
import { Dish } from "@features/dishes/models/models";
import { allDishesData } from "./all-dishes-data";

/**
 * In-memory implementation of the dish repository.
 */
class InMemoryDishRepository implements DishRepository {
  async getDishes(
    query: string | null,
    limit: number | null,
    page: number | null,
    filter: { [key: string]: any[] } | null,
    sort: { [key: string]: "asc" | "desc" } | null
  ): Promise<{
    dishes: Dish[];
    totalPages: number;
  }> {
    const queryLower = (query || "").toLowerCase();
    const filteredByQuery = allDishesData.filter((dish) => {
      return (
        dish.name.toLowerCase().includes(queryLower) ||
        dish.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(queryLower)
        ) ||
        (dish.state && dish.state.toLowerCase().includes(queryLower)) ||
        (dish.region && dish.region.toLowerCase().includes(queryLower))
      );
    });
    const filteredByFilter = filter
      ? filteredByQuery.filter((dish) => {
          return Object.keys(filter).every((key) => {
            const dishValue = dish[key as keyof Dish];
            const filterValues = filter[key];
            if (Array.isArray(dishValue)) {
              return dishValue.some((value) =>
                filterValues.includes(value.toString())
              );
            }
            return (
              dishValue != null && filterValues.includes(dishValue.toString())
            );
          });
        })
      : filteredByQuery;

    const sorted = sort
      ? filteredByFilter.sort((a, b) => {
          const sortKeys = Object.keys(sort);
          const key = sortKeys[0] as keyof Dish;
          const sortOrder = sort[key] === "asc" ? 1 : -1;

          const aValue = a[key];
          const bValue = b[key];
          if (aValue == null && bValue == null) {
            return 0;
          } else if (aValue == null) {
            return -sortOrder;
          } else if (bValue == null) {
            return sortOrder;
          } else if (aValue > bValue) {
            return sortOrder;
          } else if (aValue < bValue) {
            return -sortOrder;
          } else {
            return 0;
          }
        })
      : filteredByFilter;

    const start = ((page || 1) - 1) * (limit || 0);
    const dishes = sorted.slice(start, start + (limit || sorted.length));
    return {
        dishes,
        totalPages: sorted.length > 0 ? Math.ceil(sorted.length / (limit || 1)) : 0,
    }
  }
  async getDishByName(name: string): Promise<Dish | null> {
    return allDishesData.find((dish) => dish.name === name) || null;
  }
  async getAllIngredients(): Promise<string[]> {
    const ingredients = allDishesData.map((dish) => dish.ingredients.map((e) => e.toLowerCase())).flat();
    return Array.from(new Set(ingredients)).map(capitalizeFirstLetter);
  }
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { InMemoryDishRepository };
