import React from 'react';
import {Card, Popover} from 'antd';
import {EditOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";

import {IProduct} from "../interfaces";
import classes from "./productCard.module.css";

import {productAction} from "../redux";

const {Meta} = Card;

interface IProps {
    product: IProduct
}

const ProductCard: React.FC<IProps> = ({product}) => {
    const dispatch = useDispatch();


    const content = (
        <div className={classes.popover}>
            <p onClick={(e) => {
                e.stopPropagation()
                // @ts-ignore
                dispatch(productAction.deleteProduct(product.id.toString()))
                // dispatch(productAction.deleteProduct.)
            }}>Delete</p>
            <p onClick={(e) => {
                e.stopPropagation()
                dispatch(productAction.setProductForUpdate(product))
            }
            }>Edit</p>
        </div>
    );
    return (

        <div>
            <Popover content={content}>
                <EditOutlined className={classes.edit}/>
            </Popover>
            <Card className={classes.product}
                  hoverable
                  style={{width: 240, height: 350}}
                  cover={<img alt="example" src={product.images[0]}/>}
            >

                <Meta title={product.title} style={{textOverflow: 'ellipsis'}} description={product.description}/>
            </Card></div>
    )
};

export {ProductCard} ;