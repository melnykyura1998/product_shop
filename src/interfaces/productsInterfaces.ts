import {string} from "joi";

export interface IProduct {
    id?: number,
    title: string,
    description: string,
    price: number,
    images: string[],
    rating: number,
    stock: number,
    category: string,
    discountPercentage: number
}

export interface IProductResponse {
    products: IProduct[]
}

export interface IProductFilter {
    brand: any[],
    category: any[],
    price?: any[],
    stock: any[]

}