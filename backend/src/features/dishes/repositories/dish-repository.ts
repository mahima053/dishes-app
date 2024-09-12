import { Dish } from "@features/dishes/models/models";

/**
 * Interface representing a repository for managing dishes.
 */
interface DishRepository {

  /**
   * Retrieves dishes based on the provided query, limit, page, filter, and sort.
   * @param query - The query to search for in the dish name, ingredients, state, and region.
   * @param limit - The maximum number of dishes to retrieve.
   * @param page - The page number of results to retrieve.
   * @param filter - The filter to apply to the dishes.
   * @param sort - The sort order for the dishes.
   * @returns A promise that resolves to an object containing the dishes and the total number of pages.
   */
  getDishes(
    query: string | null,
    limit: number | null,
    page: number | null,
    filter: { [key: string]: any[] } | null,
    sort: { [key: string]: "asc" | "desc" } | null
  ): Promise<{
    dishes: Dish[];
    totalPages: number;
  }>;

  /**
   * Retrieves a dish by its name.
   * @param name - The name of the dish to retrieve.
   * @returns A promise that resolves to the dish, or null if not found.
   */
  getDishByName(name: string): Promise<Dish | null>;

  /**
   * Retrieves all unique ingredients from all dishes.
   * @returns A promise that resolves to an array of ingredient names.
   */
  getAllIngredients(): Promise<string[]>;
}

export { DishRepository };
