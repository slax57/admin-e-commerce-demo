export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  zipcode: string;
  city: string;
  avatar: string;
  birthday: Date;
  first_seen: Date;
  last_seen: Date;
  has_ordered: boolean;
  latest_purchase: Date;
  has_newsletter: boolean;
  //groups: Array;
  nb_commands: number;
  total_spent: number;
}
