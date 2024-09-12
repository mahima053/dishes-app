import {
  Field,
  Subtitle1,
  Tag,
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerProps,
} from "@fluentui/react-components";
import { useState } from "react";

export const IngridentSelection = ({
  ingredients,
  selectedIngredients,
  setSelectedIngredients,
}: {
  ingredients: string[];
  selectedIngredients: string[];
  setSelectedIngredients: (ingrdients: string[]) => void;
}) => {
  const onOptionSelect: TagPickerProps["onOptionSelect"] = (e, data) => {
    setSelectedIngredients(data.selectedOptions);
    setSearchString("");
  };
  const [searchString, setSearchString] = useState("");
  const tagPickerOptions = ingredients.filter(
    (ingredient) =>
      !selectedIngredients.includes(ingredient) &&
      ingredient.includes(searchString)
  );

  return (
    <Field>
      <Subtitle1 style={{ marginBottom: "10px" }}>Select Ingredients</Subtitle1>

      <TagPicker
        onOptionSelect={onOptionSelect}
        selectedOptions={selectedIngredients}
      >
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Ingredients">
            {selectedIngredients.map((option) => (
              <Tag key={option} shape="rounded" value={option}>
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            aria-label="Select Ingredients"
            placeholder={
              selectedIngredients.length == 0 ? "Search Ingredients" : ""
            }
            onChange={(e) => setSearchString(e.target.value)}
          />
        </TagPickerControl>
        <TagPickerList>
          {tagPickerOptions.length > 0
            ? tagPickerOptions.map((option) => (
                <TagPickerOption value={option} key={option}>
                  {option}
                </TagPickerOption>
              ))
            : "No options available"}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
