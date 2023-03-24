import React from 'react';
import {useLocation, useParams} from "react-router-dom";
import classes from "./singleProductPage.module.css";

const SingleProductPage = () => {
    const {productId} = useParams();
    const {state: {product}} = useLocation();

    return (
        <div className={classes.wrapper}>
            <h4>{product.category}</h4>
            <h2>{product.title}</h2>
            <div className={classes.imgWrapp}>
                <img src={product.images[0]} alt={product.title}/>
                <div>
                    <h4>Price: {product.price}$</h4>
                    <h4>Discount: {product.discountPercentage}%</h4>
                    <h4>Rating: {product.rating}</h4>
                    <h4>Brand: {product.brand}</h4>
                    <div>
                        {product.description}
                    </div>
                </div>
            </div>

        </div>
    );
};

export {SingleProductPage};