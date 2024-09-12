import { Dish } from "@/types/Dish";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  tableContainer: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    minWidth: "1000px",
  },
  tableHeader: {
    fontWeight: "bold",
    textAlign: "left",
    padding: "10px",
  },
  tableRow: {
    display: "table-row",
  },
  tableCell: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    wordWrap: "break-word",
    whiteSpace: "normal",
    overflow: "hidden",
  },
});

const DishTable = ({
  currentDishes,
  handleDishClick,
  handleSort,
  sortColumn,
  sortDirection,
}: {
  currentDishes: Dish[];
  handleDishClick: (dishName: string) => void;
  handleSort: (key: string) => void;
  sortColumn: string | null;
  sortDirection: any;
}) => {
  const styles = useStyles();

  return (
    <div className={styles.tableContainer}>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow className={styles.tableRow}>
            <TableHeaderCell
              sortable={true}
              sortDirection={sortColumn === "name" ? sortDirection : ""}
              onClick={() => handleSort("name")}
              className={styles.tableHeader}
              style={{ cursor: "pointer" }}
            >
              Dish Name
            </TableHeaderCell>
            <TableHeaderCell className={styles.tableHeader}>
              Ingredients
            </TableHeaderCell>
            <TableHeaderCell
              sortable={true}
              sortDirection={sortColumn === "prepTime" ? sortDirection : ""}
              onClick={() => handleSort("prepTime")}
              className={styles.tableHeader}
              style={{ cursor: "pointer" }}
            >
              Prep Time (min)
            </TableHeaderCell>
            <TableHeaderCell
              sortable={true}
              sortDirection={sortColumn === "cookTime" ? sortDirection : ""}
              onClick={() => handleSort("cookTime")}
              className={styles.tableHeader}
              style={{ cursor: "pointer" }}
            >
              Cook Time (min)
            </TableHeaderCell>
            <TableHeaderCell className={styles.tableHeader}>
              Diet
            </TableHeaderCell>
            <TableHeaderCell className={styles.tableHeader}>
              Flavor
            </TableHeaderCell>
            <TableHeaderCell className={styles.tableHeader}>
              State
            </TableHeaderCell>
            <TableHeaderCell className={styles.tableHeader}>
              Course
            </TableHeaderCell>
            <TableHeaderCell className={styles.tableHeader}>
              Region
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDishes?.map((dish, index) => (
            <TableRow key={index} className={styles.tableRow}>
              <TableCell
                data-label="Dish Name"
                onClick={() => handleDishClick(dish.name)}
                className={styles.tableCell}
                style={{ cursor: "pointer" }}
              >
                {dish.name}
              </TableCell>
              <TableCell data-label="Ingredients" className={styles.tableCell}>
                {dish.ingredients.join(", ")}
              </TableCell>
              <TableCell
                data-label="Prep Time (min)"
                className={styles.tableCell}
              >
                {dish.prepTime}
              </TableCell>
              <TableCell
                data-label="Cook Time (min)"
                className={styles.tableCell}
              >
                {dish.cookTime}
              </TableCell>
              <TableCell data-label="Diet" className={styles.tableCell}>
                {dish.diet}
              </TableCell>
              <TableCell data-label="Flavor" className={styles.tableCell}>
                {dish.flavor}
              </TableCell>
              <TableCell data-label="State" className={styles.tableCell}>
                {dish.state}
              </TableCell>
              <TableCell data-label="Course" className={styles.tableCell}>
                {dish.course}
              </TableCell>
              <TableCell data-label="Region" className={styles.tableCell}>
                {dish.region}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DishTable;
