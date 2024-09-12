import React from "react";
import { makeStyles } from "@fluentui/react-components";
import DishSuggester from "../components/DishSuggester";
import Headers from "../components/Header";

const useStyles = makeStyles({
  container: {
    padding: "20px 20px 0px 20px",
  },
});

interface DishSuggesterPageProps {
  data: any;
}

const DishSuggesterPage: React.FC<DishSuggesterPageProps> = ({ data }) => {
  const classes = useStyles();
  return (
    <div>
      <Headers />
      <h1 className={classes.container}>Dish Suggester</h1>
      <DishSuggester ingredientsData={data} />
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/dishes/ingredients`
  );
  const data = await res.json();

  return {
    props: {
      data: data || [],
    },
  };
}

export default DishSuggesterPage;
