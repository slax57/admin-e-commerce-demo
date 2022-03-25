export interface Command {
  id: number;
  reference: string;
  date: Date;
  customer_id: number;
  basket: [{ product_id: number; quantity: number }];
  total_ex_taxes: number;
  delivery_fees: number;
  tax_rate: number;
  taxes: number;
  total: number;
  status: "ordered" | "delivered" | "canceled";
  returned: boolean;
}
