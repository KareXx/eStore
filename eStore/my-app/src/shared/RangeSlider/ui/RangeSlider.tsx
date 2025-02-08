import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux"

import { setCurrentPriceRange } from "../../../stateManager/actions";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


import './RangeSlider.css'

type RangeSlider = {
  style?: React.CSSProperties,
  
}

function valuetext(value: number) {
  return `${value}`;
}



const RangeSlider = ({style}: RangeSlider) => {
  const [valueRange, setValueRange] = React.useState<number[]>([0, 1024]);
  const [value, setValue] = React.useState<number[]>(valueRange);
  const priceRange = useSelector((state: any) => {
    return state.products.currentPriceRange
  })

  const dispatch = useDispatch();

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const dispatchPriceRange = () => {
    if (value[0] === valueRange[0] && value[1] === valueRange[1]){
      dispatch(setCurrentPriceRange([]))

    }else{
      dispatch(setCurrentPriceRange(value))
    }
  }


  useEffect(() => {
    fetch('http://192.168.1.3:5000/products/price')
        .then(response => response.json())
        .then(data => {
            const rage = [data.min, data.max]
            setValueRange(rage)
            setValue(rage)
            
        })
    }, [])

  return (
    <>
      <Box sx={style}>
        <Slider
            style={{color: "#151927"}}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={valueRange[0]} // Минимальное значение
          max={valueRange[1]} // Максимальное значение
          onChangeCommitted={dispatchPriceRange}
        />
      </Box>
      <div className="filter_set_price">
        <input placeholder="start price"
            type="text" 
            onChange={(e) => +e.target.value < valueRange[1] && +e.target.value < value[1]? setValue([+e.target.value, value[1]]): null}
            value={value[0]}/>
        <input placeholder="max price" 
            type="text"  
            onChange={(e) => +e.target.value < valueRange[1]? setValue([value[0], +e.target.value]): null}
            value={value[1]}/>
    </div>
    </>
    
  );
}

export default RangeSlider;