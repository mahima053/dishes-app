import React from "react";
import { GetServerSideProps } from "next";
import { makeStyles, shorthands } from "@fluentui/react-components";
import {
  Text,
  Card,
  CardHeader,
  CardFooter,
  Image,
  Divider,
} from "@fluentui/react-components";
import { Dish } from "@/types/Dish";
import axios from "axios";
import DishDetails from "@/components/DishDetails";
import Header from "@/components/Header";

const useStyles = makeStyles({
  container: {
    // Make center
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  image: {
    marginBottom: "20px",
  },
  details: {
    ...shorthands.padding("10px"),
  },
  list: {
    ...shorthands.margin("10px 0"),
    paddingLeft: "20px",
  },
  listItem: {
    marginBottom: "5px",
  },
});

interface DishDetailPageProps {
  dish: Dish | null;
}

const DishDetailPage: React.FC<DishDetailPageProps> = ({ dish }) => {
  const classes = useStyles();

  return (
    <div>
      <Header />

      <div className={classes.container}>
        <Text size={900} className={classes.header}>
          Dish Details
        </Text>
        {dish ? (
          <DishDetails dish={dish} />
        ) : (
          <Text size={400} style={{ color: "red" }}>
            Dish not found
          </Text>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { dishname } = context.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/dishes/name/${dishname}`
  );
  const responseCode = res.status;
  if (responseCode === 200) {
    const data = await res.json();
    console.log(data);
    return {
      props: {
        dish: data,
      },
    };
  } else {
    return {
      props: {
        dish: null,
      },
    };
  }
};

export default DishDetailPage;
