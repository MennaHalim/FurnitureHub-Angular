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