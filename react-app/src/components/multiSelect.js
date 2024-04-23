import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function MultipleSelect( inputLabel) {
    //const itemsList = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'];
    const itemsList = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
      ];
    const [itemNames, setItemNames] = React.useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setItemNames(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    return (
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">{inputLabel}</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={itemNames}
            onChange={handleChange}
            input={<OutlinedInput label="Name"/>}
            MenuProps={MenuProps}
          >
            {itemsList.map((item) => (
              <MenuItem
                key={item}
                value={item}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }