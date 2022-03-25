import { useRecordContext } from "react-admin";
import { Review } from "./review";
import StarsIcon from "@mui/icons-material/Stars";
import {
  Rating as MuiRating,
  RatingProps as MuiRatingProps,
} from "@mui/material";

export interface RatingFieldProps extends MuiRatingProps {
  record?: Review;
  /* Do not remove below props, as they are used by RA's List Iterators when they inspect children elements */
  label?: string;
  sortBy?: string;
}

export const RatingField = (props: RatingFieldProps) => {
  const review = useRecordContext<Review>(props);
  const { label, sortBy, ...muiRatingProps } = props;
  if (!review || !review.rating) return null;
  return (
    <MuiRating
      value={review.rating}
      icon={<StarsIcon />}
      sx={{
        color: "text.secondary",
      }}
      readOnly
      {...muiRatingProps}
    />
  );
};
