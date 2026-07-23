import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

type Props = {
  items: string[];
  checked: string[];
  onChange: (items: string[]) => void;
};

export default function CheckboxButton({ items, checked, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState(checked);
  const [prevCheckedItems, setPrevCheckedItems] = useState(checked);

  if (checked !== prevCheckedItems) {
    setPrevCheckedItems(checked);
    setCheckedItems(checked);
  }

  const handleToggle = (value: string) => {
    const updatedChecked = checkedItems?.includes(value) ? checkedItems.filter((item) => item !== value) : [...checkedItems, value];
    setCheckedItems(updatedChecked);
    onChange(updatedChecked);
  };

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={checkedItems.includes(item)}
              onClick={() => handleToggle(item)}
              color='secondary'
              sx={{ py: 0.7, fontSize: 40 }}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
}
