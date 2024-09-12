import { Dish } from "../models/models";
import { DishRepository } from "../repositories/dish-repository";
import { InMemoryDishRepository } from "../repositories/in-memory-dish-repository";

/**
 * Service for managing dishes.
 */
export class DishService {
  /// TODO: This should be injected, need to learn more about dependency injection
  private repository: DishRepository = new InMemoryDishRepository();

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
    return this.repository.getDishes(query, limit, page, filter, sort);
  }

  async getDishByName(name: string): Promise<Dish | null> {
    return this.repository.getDishByName(name);
  }

  async getAllIngredients(): Promise<string[]> {
    return this.repository.getAllIngredients();
  }

  async suggestDishes(ingredients: string[]): Promise<Dish[]> {
    const uniqueIngredients = Array.from(new Set(ingredients)).map(
      (ingredient) => ingredient.toLowerCase()
    );
    // We can reuse the api as in future we can have more filters
    const suggestedDishes = await this.repository.getDishes(
      null,
      null,
      null,
      { ingredients },
      null
    );
    // Now all the ingriedients should be there in hand for the dish. We have
    // to filter out the dishes which have all the ingredients in the list
    return suggestedDishes.dishes.filter((dish) =>
      dish.ingredients.every((ingredient) =>
        uniqueIngredients.includes(ingredient.toLowerCase())
      )
    );
  }
}
