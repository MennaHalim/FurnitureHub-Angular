export interface IDeliverMethod {
    id: number,
    name: number,
    description: string,
    cost: number,
    deliveryTime: string
}

export interface IStripe{
    orderId: number
    sessionId: string
    stripeUrl: string
}

export interface IOrderItem{
    id: number,
    productId: number,
    productName: string,
    pictureUrl: string,
    type: string,
    price: number,
    quantity: number
}

export interface IShippingAddress{
    firstName: string,
    lastName: string,
    street: string,
    city: string,
    country: string
}

export interface IOrder{
    id: number,
    buyerEmail: string,
    orderDate: any
    status: string,
    shippingAddress: IShippingAddress,
    deliveryMethod: string,
    deliveryMethodCost: number,
    orderItems: IOrderItem[],
    subTotal: number,
    total: number,
}