import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const RangeSlider = ({ min = 0, max = 100, value, onChange }) => {
  const handleChange = (event, newValue) => {
    onChange?.(newValue); 
  };

  return (
    <Box width={170} height="2px" sx={{ padding: 2 }}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
    </Box>
  );
};

export default RangeSlider;
