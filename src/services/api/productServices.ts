import {AxiosCervice, Res} from "./axiosServices";
import {urls} from "../../constants";
import {IProduct, IProductResponse} from "../../interfaces";

export const productServices = {
    getProduct:():Res<IProductResponse>=>AxiosCervice.get(urls.products),
    deleteProduct:(id:string):Res<IProduct>=>AxiosCervice.delete(`${urls.products}/${id}`),
    addProduct:(product:IProduct):Res<IProduct>=>AxiosCervice.post(`${urls.products}`,product)
}