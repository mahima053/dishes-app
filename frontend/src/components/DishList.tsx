import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Dropdown,
  Option,
  Input,
  makeStyles,
  shorthands,
  Button,
  Text,
  Title3,
  Title2,
  Divider,
} from "@fluentui/react-components";
import { useRouter } from "next/router";
import { Dish } from "@/types/Dish";
import axios from "axios";
import { courses, diets, flavors, states } from "@/utils/utils";
import FilterDrawer from "./FilterDrawer";
import DishTable from "./DishTable";

const useStyles = makeStyles({
  root: {
    ...shorthands.padding("20px"),
  },
  filters: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    paddingTop: "20px",
  },
  table: {
    marginBottom: "20px",
  },
  tableHeader: {
    fontWeight: "500",
    width: "100px",
  },
  tableHeaderIngridients: {
    fontWeight: "500",
    width: "250px",
  },
  cursorPointer: {
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  clearFilter: {
    cursor: "pointer",
    color: "blue",
  },
  stateDropdown: {
    maxHeight: "10em",
    overflowY: "auto",
  },
  tableMenu: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
});

const DishesList = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<{
    diet: string[];
    flavor: string[];
    state: string[];
    course: string[];
  }>({
    diet: [],
    flavor: [],
    state: [],
    course: [],
  });

  const router = useRouter();
  const styles = useStyles();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const payload = {
          query: null,
          limit: rowsPerPage,
          page: currentPage,
          sort: sortColumn ? { [sortColumn]: sortDirection } : {},
          filter: {
            diet: filters.diet && filters.diet.length > 0 ? filters.diet : [],
            flavor:
              filters.flavor && filters.flavor.length > 0 ? filters.flavor : [],
            state:
              filters.state && filters.state.length > 0 ? filters.state : [],
            course:
              filters.course && filters.course.length > 0 ? filters.course : [],
          },
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dishes`,
          payload
        );

        setDishes([...dishes, ...response.data.dishes]);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, [filters, currentPage, rowsPerPage, sortColumn, sortDirection]);

  // Handle sorting by dish name, prep time, or cooking time
  const handleSort = (column: string) => {
    resetTableState();
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  // Apply filters based on diet, flavor, and state
  const filteredDishes = dishes?.filter((dish) => {
    return (
      (!filters.diet.length || filters.diet.includes(dish.diet)) &&
      (!filters.flavor.length || filters.flavor.includes(dish.flavor)) &&
      (!filters.state.length || filters.state.includes(dish.state)) &&
      (!filters.course.length || filters.course.includes(dish.course))
    );
  });

  // Handle pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentDishes = filteredDishes?.slice(indexOfFirstRow, indexOfLastRow);

  // Handle navigation to dish details
  const handleDishClick = (dishName: string) => {
    router.push(`/dishes/${dishName}`);
  };

  const dietOptions = diets;
  const flavorOptions = flavors;
  const courseOptions = courses;
  const stateOptions = states;

  const resetTableState = () => {
    setDishes([]);
    setCurrentPage(1);
    setTotalPages(1);
  };

  // Handle pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClearFilter = () => {
    resetTableState();
    setFilters({
      diet: [],
      flavor: [],
      state: [],
      course: [],
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.tableMenu}>
        <Title2>Dishes List</Title2>
        <FilterDrawer
          dietOptions={dietOptions}
          flavorOptions={flavorOptions}
          stateOptions={stateOptions}
          courseOptions={courseOptions}
          filters={filters}
          setFilters={setFilters}
          handleClearFilter={handleClearFilter}
        />
      </div>
      <Divider />
      {/* Table */}
      <DishTable
        currentDishes={currentDishes}
        handleDishClick={handleDishClick}
        handleSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={
          sortDirection === null
            ? null
            : sortDirection === "asc"
            ? "ascending"
            : "descending"
        }
      />

      {/* Pagination */}
      <div className={styles.pagination}>
        <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default DishesList;
