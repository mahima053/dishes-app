import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Input,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { Dish } from "@/types/Dish";
import axios from "axios";
import { IngridentSelection } from "./IngridentSelection";
import { useRouter } from "next/router";
import DishTable from "./DishTable";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "block",
    ...shorthands.padding("20px"),
    gap: "20px",
  },
  leftPane: {
    flex: "0 0 20%",
    paddingRight: "30px",
  },
  rightPane: {
    flex: "0 0 80%",
  },
  ingredientList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  suggestionList: {
    marginTop: "20px",
  },
  selectedIngredients: {
    width: "100%",

    marginTop: "20px",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
  },
});

const DishSuggester = ({ ingredientsData }: { ingredientsData: any }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [suggestedDishes, setSuggestedDishes] = useState<Dish[]>([]);
  const styles = useStyles();
  const router = useRouter();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        if (selectedIngredients.length > 0) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/dishes/suggest`,
            {
              ingredients: selectedIngredients,
            }
          );

          if (response.status === 200) {
            setSuggestedDishes(response.data);
          } else {
            console.error("Failed to fetch suggested dishes");
          }
        } else {
          setSuggestedDishes([]);
        }
      } catch (error) {
        console.error("Error fetching suggested dishes:", error);
      }
    };

    fetchIngredients();
  }, [selectedIngredients]);

  const handleDishClick = (dishName: string) => {
    router.push(`/dishes/${dishName}`);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.selectedIngredients}>
          <IngridentSelection
            ingredients={ingredientsData}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />
        </div>
        {suggestedDishes.length > 0 && (
          <DishTable
            currentDishes={suggestedDishes}
            handleDishClick={handleDishClick}
            handleSort={(_: string) => {}}
            sortColumn={null}
            sortDirection={null}
          />
        )}
      </div>
    </div>
  );
};

export default DishSuggester;
