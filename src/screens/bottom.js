import React, { useEffect, useState } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import { Paper } from '@mui/material';

function Bottom(props) {
    const [value, setValue] = useState(0);
    props.OnTabChange(value);

    useEffect(() => {
        const lastValue = localStorage.getItem('selectedValue');
        if (lastValue !== null) {
          setValue(parseInt(lastValue));
        }
      }, []);

      const handleChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem('selectedValue', newValue.toString());
      };

    return (
        <Paper Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }
        } elevation={3} >
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChange}
                style={{ justifyContent: 'center', alignContent: 'center', height: '3rem'}}
            >
                <BottomNavigationAction label="All" icon={<StorefrontIcon />} />
                <BottomNavigationAction label="Category" icon={<CategoryIcon />}/>
            </BottomNavigation>
        </Paper >
    );
}

export default Bottom;