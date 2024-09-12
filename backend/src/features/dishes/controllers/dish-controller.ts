import { BaseController } from "@infrastructure/base-controller";
import { DishService } from "@features/dishes/services/dish-service";
import { Request, Response } from "express";

/**
 * Controller class for the dishes feature.
 */
export class DishController extends BaseController {
    /**
     * Service class for the dishes feature.
     */
    private service: DishService = new DishService();

    /**
     * Handles a request to get dishes.
     * ```ts
     * POST /api/dishes
     * {
     *  "query": "Search Quey should go here (optional)",
     *  "limit": 10, // Number of dishes to retrieve (optional - default to all)
     *  "page": 1, // Page number for pagination (optional - default to 1)
     *  "filter": { // Filter criteria (optional)
     *    "region": ["West"], // key value pair, key should match in the dish object
     *    "state": ["Rajasthan"]
     *  },
     *  "sort": { // Sort criteria (optional)
     *    "name": "asc" // key value pair, key should match in the dish object
     *  }
     * }
     * ```
     *
     * @returns an object with dishes and total pages.
     *
     */
    async getDishes(req: Request, res: Response) {
        return this.handleRequest(res, async () => {
            let { query, limit, page, filter, sort } = req.body;

            limit = limit ? parseInt(limit as string) : null;
            page = page ? parseInt(page as string) : null;

            if(page && page < 1) {
                res.status(400).send('Invalid page number.');
                return;
            }

            if (sort) {
                const sortKeys = Object.keys(sort);
                if (sortKeys.length > 1) {
                    res.status(400).send('Only one sort key is allowed.');
                    return;
                }
                if(sortKeys.length == 0) {
                    sort = null;
                }
            }

            if(filter) {
                const filterKeys = Object.keys(filter);
                if(filterKeys.length == 0) {
                    filter = null;
                }
                for (const key of filterKeys) {
                    if (!Array.isArray(filter[key])) {
                        res.status(400).send('Filter values must be an array.');
                        return;
                    }
                    if(filter[key].length == 0) {
                        // Remove empty filters
                        delete filter[key];
                    }
                }
            }
            const dishes = await this.service.getDishes(query, limit, page, filter, sort);
            res.json(dishes);
        });
    }

    /**
     * Handles a request to get a dish by name.
     * ```ts
     * GET /api/dishes/:name
     * ```
     *
     * @returns the dish with the specified name. If no dish is found,
     * a 404 response is sent.
     */
    async getDishByName(req: Request, res: Response) {
        return this.handleRequest(res, async () => {
            const name = req.params.name;

            const dish = await this.service.getDishByName(name);
            if (dish) {
                res.json(dish);
            } else {
                res.status(404).send('Dish not found.');
            }
        });
    }

    /**
     * Handles a request to get all ingredients.
     * ```ts
     * GET /api/dishes/ingredients
     * ```
     *
     * @returns an array of all unique ingredients.
     */
    async getAllIngredients(req: Request, res: Response) {
        return this.handleRequest(res, async () => {
            const ingredients = await this.service.getAllIngredients();
            res.json(ingredients);
        });
    }

    /**
     * Handles a request to suggest dishes based on a list of ingredients.
     * ```ts
     * POST /api/dishes/suggest
     * {
     *  "ingredients": ["ingredient1", "ingredient2"]
     * }
     * ```
     *
     * @returns an array of dishes that contain all the specified ingredients.
     */
    async suggestDishes(req: Request, res: Response) {
        return this.handleRequest(res, async () => {
            const {ingredients} = req.body;
            if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
                res.status(400).send('At least one ingredient is required.');
                return;
            }
            const dishes = await this.service.suggestDishes(ingredients);
            res.json(dishes);
        });
    }

}