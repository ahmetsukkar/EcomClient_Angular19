import { IProduct } from "./Product"

export interface IPagination {
    pageNumber: number
    pageSize: number
    count: number
    data: IProduct[]
  }