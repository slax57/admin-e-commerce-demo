import { TextField, TextFieldProps } from "react-admin";
import { Box } from "@mui/material";

export const LineClampTextField = (props: TextFieldProps) => (
  <Box
    component="div"
    sx={{
      overflow: "hidden",
      display: "-webkit-box",
      "-webkit-line-clamp": "2",
      "-webkit-box-orient": "vertical",
    }}
  >
    <TextField {...props} />
  </Box>
);
