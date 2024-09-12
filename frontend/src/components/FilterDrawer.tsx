import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Dropdown,
  makeStyles,
  Option,
  OverlayDrawer,
  Text,
} from "@fluentui/react-components";
import { Dismiss24Regular, Filter12Filled } from "@fluentui/react-icons";
import { useMemo, useState } from "react";

const useStyles = makeStyles({
  filterDropDown: {
    marginBottom: "10px",
  },
  clearFilter: {
    marginTop: "20px",
    cursor: "pointer",
    textAlign: "right",
    display: "block",
    marginLeft: "auto",
    color: "red",
  },
});

const FilterDrawer = ({
  dietOptions,
  flavorOptions,
  stateOptions,
  courseOptions,
  filters,
  setFilters,
  handleClearFilter,
}: {
  dietOptions: string[];
  flavorOptions: string[];
  stateOptions: string[];
  courseOptions: string[];
  filters: {
    diet: string[];
    flavor: string[];
    state: string[];
    course: string[];
  };
  setFilters: (filters: {
    diet: string[];
    flavor: string[];
    state: string[];
    course: string[];
  }) => void;
  handleClearFilter: () => void;
}) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const hasFilters = useMemo(() => {
    return (
      filters.diet.length > 0 ||
      filters.flavor.length > 0 ||
      filters.state.length > 0 ||
      filters.course.length > 0
    );
  }, [filters.diet, filters.flavor, filters.state, filters.course]);


  return (
    <>
      {/* Button to open the filter drawer */}
      <Button onClick={toggleDrawer} appearance={hasFilters ? 'primary' : 'secondary'} icon={<Filter12Filled/>}>
      Filter Dishes
      </Button>

      {/* Drawer component */}
      <OverlayDrawer open={isOpen} position="end" onOpenChange={(_, {open} ) => setIsOpen(open)}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Filter Dishes
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          {/* Filters */}
          <Dropdown
            className={styles.filterDropDown}
            multiselect={true}
            placeholder="Filter by Diet"
            value={filters.diet.join(", ")}
            selectedOptions={filters.diet}
            onOptionSelect={(e, optionData) =>
              setFilters({
                ...filters,
                diet: optionData.selectedOptions,
              })
            }
          >
            {dietOptions.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
          </Dropdown>
          <Dropdown
            className={styles.filterDropDown}
            multiselect={true}
            placeholder="Filter by Flavor"
            value={filters.flavor.join(", ")}
            selectedOptions={filters.flavor}
            onOptionSelect={(e, optionData) =>
              setFilters({
                ...filters,
                flavor: optionData.selectedOptions,
              })
            }
          >
            {flavorOptions.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
          </Dropdown>
          <Dropdown
            className={styles.filterDropDown}
            multiselect={true}
            placeholder="Filter by State"
            value={filters.state.join(", ")}
            selectedOptions={filters.state}
            onOptionSelect={(e, optionData) =>
              setFilters({
                ...filters,
                state: optionData.selectedOptions,
              })
            }
          >
            {stateOptions.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
          </Dropdown>
          <Dropdown
            className={styles.filterDropDown}
            multiselect={true}
            placeholder="Filter by Course"
            value={filters.course.join(", ")}
            selectedOptions={filters.course}
            onOptionSelect={(e, optionData) =>
              setFilters({
                ...filters,
                course: optionData.selectedOptions,
              })
            }
          >
            {courseOptions.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
          </Dropdown>

          {/* Clear Filters */}
          <Text className={styles.clearFilter} onClick={handleClearFilter}>
            Clear All Filters
          </Text>
        </DrawerBody>
      </OverlayDrawer>
    </>
  );
};

export default FilterDrawer;
