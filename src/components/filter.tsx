import React, {useEffect, useState} from 'react';
import { MenuProps, Select, SelectProps} from "antd";
import {useDispatch} from "react-redux";

import {useAppSelector} from "../hooks/redux";
import {IProduct, IProductFilter} from "../interfaces";
import {productAction} from "../redux";

type MenuItem = Required<MenuProps>['items'][number];


const filterOptions = ['brand', 'category', 'price', 'stock']

const Filter = () => {

    const {products} = useAppSelector(state => state.productsReducer);
    const [filterCategory, setFilterCategory] = useState<IProductFilter | null>(null);
    const dispatch = useDispatch();

    const getFilters = (products: IProduct[], filterOptions: string[]) => {
        let filterCategory = {
            brand: [],
            category: [],
            price: [],
            stock: []
        }

        products.map(product => {
            filterOptions.map((key) => {
                // @ts-ignore
                if (!filterCategory[key as keyof object].find(p => p.value === product[key as keyof object])) { // @ts-ignore
                    filterCategory[key as keyof object].push({
                        value: product[key as keyof object],
                        label: product[key as keyof object]
                    })
                }
            })
        })
        setFilterCategory(filterCategory)

    }
    useEffect(() => {
        if (products) {
            getFilters(products, filterOptions)
        }
    }, [products])

    const handleChange = (value: any[] | number, category: string) => {
        dispatch(productAction.filterBy({value, category}))
    };

    return (
        <div>
            {filterCategory && filterOptions.map((option) => {

                let arrOfOptions: SelectProps['options'] = filterCategory[option as keyof object]
                return (<div key={option}>
                    <h3>{option}</h3>
                    <Select
                        mode="tags"
                        style={{width: '100%'}}
                        placeholder={option}
                        onChange={(value) => handleChange(value, option)}
                        options={arrOfOptions}
                    />
                </div>)

            })}

        </div>
    );
};


export {Filter};