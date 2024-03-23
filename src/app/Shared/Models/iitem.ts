import { ICustomerReview } from "./icustomer-review";

export interface IItem {
    height: number;
    depth: number;
    width: number;
    id: number;
    name: string;
    availability: string;
    price: number;
    color: string;
    style: string;
    suitability: string;
    room: string;
    productPictures: string[];
    customerReviews?: ICustomerReview[];
}
