import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {useAppSelector} from "../hooks/redux";
import {ProductCard} from "../components";
import classes from "./productsPages.module.css";
import {IProduct} from "../interfaces";
import {Spin} from "antd";


interface IFilter {
    value: string[]
    category: string
}

const ProductsPages = () => {
    const {products, filterBy, sortingByOption, findBy,error,pending} = useAppSelector(state => state.productsReducer);
    const [productsForShow, setProductsForShow] = useState<IProduct[]>([]);
    const navigate = useNavigate();
    const filter = (products: IProduct[], filterBy: IFilter[]) => {
        let productsCopy: IProduct[] = sort([...products], sortingByOption)
        let filtredProducts: IProduct[] = []
        productsCopy.map(product => {
            filterBy.map(item => {
                if (item.value.find(i => i === product[item.category as keyof object])) {
                    filtredProducts.push(product)
                }
            })
        })
        return filtredProducts || productsCopy

    }
    const find = (products:IProduct[],value:string)=>{
        let checkedValue = value.toLowerCase().trim()
        let charNumber = checkedValue.length
        return products.filter(product=>product.title.slice(0,charNumber).toLowerCase()===checkedValue)
    }
    // @ts-ignore
    const sort = (products: IProduct[], option: string): IProduct[] => {
        let sortedProducts: IProduct[] = [...products]
        if (!sortingByOption) {
            return sortedProducts
        }
        switch (option) {
            case 'From cheap to expensive':
                return sortedProducts = products.sort((a, b) => a.price - b.price)
            case 'From expensive to cheap':
                return sortedProducts = products.sort((a, b) => b.price - a.price)
            case 'discountPercentage':
                return sortedProducts = products.sort((a, b) => a.discountPercentage - b.discountPercentage)
            case "rating":
                return sortedProducts = products.sort((a, b) => a.rating - b.rating)
            case "stock":
                return sortedProducts = products.sort((a, b) => a.stock - b.stock)
        }
    }

    useEffect(() => {
        if (!findBy && filterBy.length === 0 && !sortingByOption) {
            setProductsForShow(products)
        } else if (filterBy.length) {
            setProductsForShow(filter(products, filterBy))
            // filter(products,filterBy)
        }
        else if(findBy){
            setProductsForShow(find(products,findBy))
        }
        else {
            setProductsForShow(sort([...products], sortingByOption))
        }
    }, [products, findBy, sortingByOption, filterBy])

    return (
        <div className={classes.products}>
            {productsForShow.map(product => <div className={classes.product} onClick={()=>navigate(`/products/${product.id}`, {state: {product}})} key={product.id}>
                <ProductCard
                    product={product}/>
            </div>)}
            {error && <h1>Error</h1>}
            {pending && <Spin tip="Loading" size="large"/>}
            { findBy && productsForShow.length===0 && <h1>За вашим запитом нічого не знайдено</h1>}
        </div>
    );
};

export {ProductsPages};