import { TextField, TextFieldProps } from "react-admin";
import { Box } from "@mui/material";

export const EllipsisTextField = (props: TextFieldProps) => (
  <Box
    component="div"
    sx={{
      overflow: "hidden",
      maxWidth: "20em",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }}
  >
    <TextField {...props} />
  </Box>
);
