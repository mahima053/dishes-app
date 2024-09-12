import { Router } from "express";
import { DishController } from "@features/dishes/controllers/dish-controller";

const router = Router();

/**
 * Routes for the dishes feature.
 */


const controller = new DishController();

router.post('/', controller.getDishes.bind(controller));
router.get('/name/:name', controller.getDishByName.bind(controller));
router.get('/ingredients', controller.getAllIngredients.bind(controller));
router.post('/suggest', controller.suggestDishes.bind(controller));

export default router;