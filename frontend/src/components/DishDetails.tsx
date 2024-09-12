import React from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardFooter,
  CardPreview,
  shorthands,
} from "@fluentui/react-components";
import { Dish } from "@/types/Dish";

const useStyles = makeStyles({
  root: {
    ...shorthands.padding("20px"),
  },
  card: {
    maxWidth: "400px",
    marginBottom: "20px",
  },
  header: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
  },
});

type DishDetailsProps = {
  dish: Dish;
};

const DishDetails: React.FC<DishDetailsProps> = ({ dish }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <span className={styles.header}>{dish.name}</span>

        {/* Dish Details */}
        <div className={styles.details}>
          <div>
            <span className={styles.label}>Ingredients:</span>{" "}
            {dish.ingredients.join(", ")}
          </div>
          <div>
            <span className={styles.label}>Diet Type:</span> {dish.diet}
          </div>
          <div>
            <span className={styles.label}>Preparation Time:</span>{" "}
            {dish.prepTime} minutes
          </div>
          <div>
            <span className={styles.label}>Cooking Time:</span> {dish.cookTime}{" "}
            minutes
          </div>
          <div>
            <span className={styles.label}>Flavor:</span> {dish.flavor}
          </div>
          <div>
            <span className={styles.label}>Course:</span> {dish.course}
          </div>
          <div>
            <span className={styles.label}>State:</span> {dish.state}
          </div>
          <div>
            <span className={styles.label}>Region:</span> {dish.region}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DishDetails;
