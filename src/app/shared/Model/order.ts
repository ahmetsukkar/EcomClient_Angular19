import { IAddress } from "./address"

export interface IOrderToCreate {
    basketId: string
    deliveryMethodId: string
    shipToAddress: IAddress
  }

  export interface IOrder {
    id: string
    buyerEmail: string
    orderDate: string
    shipToAddress: IAddress
    deliveryMethod: string
    shippingPrice: number
    orderItems: IOrderItem[]
    subTotal: number
    total: number
    orderStatus: string
  }
  
  export interface IOrderItem {
    productItemId: string
    productItemName: string
    pictureUrl: string
    price: number
    quantity: number
  }