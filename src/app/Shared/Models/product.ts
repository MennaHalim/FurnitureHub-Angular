export interface IPage {
    pageIndex: number,
    pageSize: number,
    count: number,
    minimumPrice: number,
    maximumPrice: number,
    data: IProduct[]
}

export interface IProduct {
    type: string,
    id: number;
    name: string;
    availability: string;
    price: number;
    productPictures: string[];
}

export interface ICustomerReview {
    rate: number;
    customerName: string;
    review: string;
}

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

export interface ISetItem{
    name: string,
    height: number,
    depth: number,
    width: number
}

export interface ISet {
    items: ISetItem[]
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