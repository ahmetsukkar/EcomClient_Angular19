import { v4 as uuid } from 'uuid'
export interface IBasket {
    id: string
    basketItems: IBasketItem[]
    clientSecret?: string,
    paymentIntentId?: string,
    deliveryMethodId?: string,
    shippingPrice?: number,
}

export interface IBasketItem {
    id: string
    productName: string
    productPicture: string
    price: number
    quantity: number
    category: string
}

export class Basket implements IBasket {
    id = uuid();
    basketItems: IBasketItem[] = [];
}

export interface IBasketTotals {
    shipping: number
    subtotal: number
    total: number
}