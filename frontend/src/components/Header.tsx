import useDebounce from "@/hooks/useDebounce";
import {
  Button,
  Combobox,
  Divider,
  Option,
  Title1,
  makeStyles,
} from "@fluentui/react-components";
import { StarRegular } from "@fluentui/react-icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    "@media (max-width: 600px)": {
      // Mobile view
      flexDirection: "column",
      alignItems: "stretch",
    },
    borderBottom: "1px solid #ddd",
  },
  title: {
    cursor: "pointer",
    "@media (max-width: 600px)": {
      // Mobile view
      marginBottom: "10px",
    },
  },
  dishSuggestButton: {
    marginRight: "20px",
    "@media (max-width: 600px)": {
      // Mobile view
      marginRight: "0px",
      width: "100%", // Full width on mobile
      marginTop: "10px",
    },
  },
  combobox: {
    width: "300px",
    "@media (max-width: 600px)": {
      // Mobile view
      width: "100%", // Full width on mobile
      marginTop: "10px",
    },
  },
});

const Header = () => {
  const [searchString, setSearchString] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceSearchTerm = useDebounce(searchString, 300);
  const router = useRouter();
  const styles = useStyles();

  const fetchSuggestions = async (term: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dishes`,
        {
          query: term,
        }
      );
      setSuggestions(
        response.data.dishes.map((dish: { name: string }) => dish.name)
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSuggestions(debounceSearchTerm);
    } else {
      setSuggestions([]);
    }
  }, [debounceSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/dishes/${suggestion}`);
  };

  const handleDishSuggester = () => {
    router.push("/dish-suggester");
  };

  const handleTitleClick = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <Title1 className={styles.title} onClick={handleTitleClick}>
        Explore Indian Cuisine
      </Title1>

      <div>
        <Button
          appearance="primary"
          icon={<StarRegular />}
          onClick={handleDishSuggester}
          className={styles.dishSuggestButton}
        >
          Dish Suggester
        </Button>

        <Combobox
          placeholder="Search for dishes..."
          ref={inputRef}
          value={searchString}
          onChange={handleSearchChange}
          onOptionSelect={(_, data) =>
            handleSuggestionClick(data.optionValue || "")
          }
          className={styles.combobox}
        >
          {suggestions.map((suggestion) => (
            <Option key={suggestion}>{suggestion}</Option>
          ))}
        </Combobox>
      </div>
    </div>
  );
};

export default Header;
