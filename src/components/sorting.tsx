import React, {FC} from 'react';
import {Select} from "antd";
import {useDispatch} from "react-redux";

import {IProduct} from "../interfaces";
import {optionsForSorting} from "../constants";
import {productAction} from "../redux";

interface Iprops {
    products: IProduct[]
}

const Sorting: FC<Iprops> = ({products}) => {
    const dispatch = useDispatch();


    const onChange = (value: string) => {
        dispatch(productAction.sortBy(value))
    };


    return (
        <>
            <Select
                style={{width: '180px'}}
                showSearch
                placeholder="Sort By"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={optionsForSorting}
            />
        </>
    );
};

export default Sorting;