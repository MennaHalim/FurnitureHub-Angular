import { ICustomerReview } from "./icustomer-review";

export interface ISet {
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

