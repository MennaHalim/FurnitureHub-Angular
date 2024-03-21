import { IProduct } from "../../Products/Models/iproduct";

export interface ICategoryProducts {
  pageIndex: number;
  pageSize: number;
  count: number;
  minimumPrice: number;
  maximumPrice: number;
  data : IProduct[];
}
