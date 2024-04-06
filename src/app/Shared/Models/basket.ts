import { v4 as uuidv4 } from 'uuid';

export interface IBasketItem {
    productId: number,
    productName: string,
    productPrice: number,
    productDiscount: number,
    productQuantity: number,
    productPictureUrl: string,
    category: string,
    type: string
}

export interface IBasket {
    basketId: string,
    basketItems: IBasketItem[]
    deliveryMethodId: number | null,
    shippingPrice: number | null,
    paymentIntentId: string | null,
    clientSecret: string | null
}

export class Basket implements IBasket {
    readonly basketId: string;
    basketItems: IBasketItem[];
    deliveryMethodId: number | null;
    shippingPrice: number | null;
    paymentIntentId: string | null;
    clientSecret: string | null;

    constructor() {
        this.basketId = uuidv4();
        this.basketItems = [];
        this.deliveryMethodId = null;
        this.shippingPrice = 0;
        this.paymentIntentId = null;
        this.clientSecret = null;
    }
}