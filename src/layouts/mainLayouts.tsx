import React, {FC, useEffect, useState} from 'react';
import {Layout, Input} from "antd";
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import {FilterOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {Header} from "antd/es/layout/layout";

import Sorting from "../components/sorting";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {productAction} from "../redux";
import classes from "./mainLayout.module.css";
import {Filter, ProductForm} from "../components";


const {Content} = Layout;


const MainLayouts: FC = () => {

    const [collapsed, setCollapsed] = useState(true);
    const {products, findBy} = useAppSelector(state => state.productsReducer);

    const dispatch = useAppDispatch();

    const {pathname} = useLocation();
    const navigate = useNavigate();


    const setFindValue = (str: string) => {
        dispatch(productAction.findBy(str))
        if (pathname !== '/products') {
            navigate('products')
        }
    }


    useEffect(() => {
        // @ts-ignore
        dispatch(productAction.getAllProducts())
    }, [])

    return (
        <Layout>
            <Header className={classes.header}>
                <div className={classes.filter}>
                    <h3>Filters</h3>
                    <FilterOutlined className={classes.img} onClick={() => setCollapsed(!collapsed)}/></div>
                <h3>Product Shop</h3>
                <Input className={classes.input} value={findBy} placeholder={'enter name'}
                       onChange={(e) => setFindValue(e.target.value)}/>
                <Sorting products={products}/>
                <ProductForm/>
            </Header>
            <Layout>
                {!collapsed && pathname === '/products' && <Sider
                    className={classes.sider}
                >
                    <Filter/>
                </Sider>}

                <Content>
                    <Outlet/>
                </Content>

            </Layout>


        </Layout>
    );
};

export {MainLayouts};