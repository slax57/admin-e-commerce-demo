import { useRecordContext } from "react-admin";
import { Review } from "./review";
import StarsIcon from "@mui/icons-material/Stars";
import { Rating as MuiRating } from "@mui/material";

export const Rating = () => {
  const review = useRecordContext<Review>();
  if (!review || !review.rating) return null;
  return (
    <MuiRating
      value={review.rating}
      icon={<StarsIcon />}
      sx={{
        color: "text.secondary",
      }}
      readOnly
    />
  );
};
