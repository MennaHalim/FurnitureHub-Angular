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