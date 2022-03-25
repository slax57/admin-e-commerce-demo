export interface Review {
  id: number;
  date: Date;
  status: "pending" | "accepted" | "rejected";
  command_id: number;
  product_id: number;
  customer_id: number;
  rating: number;
  comment: string;
}
