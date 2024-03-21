import { ICustomerReview } from "./icustomer-review";
import { IItem } from "./iitem";

export interface ISet {
  categoryItems: IItem[]
  id: number;
  name: string;
  availability: string;
  price: number;
  productPictures: string[];
  color: string;
  style: string;
  suitability: string;
  room: string;
  customerReviews?: ICustomerReview[];
}

