import React, {useEffect, useState} from 'react';
import {Formik, Form, Field} from 'formik';
import {Input, Upload, Button, Modal} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import * as Yup from 'yup';


import classes from "./form.module.css";
import {productAction} from "../redux";
import {useAppDispatch, useAppSelector} from "../hooks/redux";


const {Dragger} = Upload;

interface Product {
    title: string;
    category: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    images: string[];
}

const ProductSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').min(0),
    discountPercentage: Yup.number().min(0).max(100),
    rating: Yup.number().required('Rating is required').min(1).max(5),
    stock: Yup.number().required('Stock is required').min(0),
    brand: Yup.string().required('Brand is required'),
    images: Yup.array().required('Images are required').max(3),
});

interface FormValues {
    title: string;
    category: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    stock: number;
    brand: string;
    images: FileList | null;
}

const ProductForm: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {productForUpdate} = useAppSelector(state => state.productsReducer);
    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();

    const initialValues: FormValues = {
        title: productForUpdate?.title || '',
        category: productForUpdate?.category || '',
        description: productForUpdate?.description || '',
        price: productForUpdate?.price || 0,
        discountPercentage: productForUpdate?.discountPercentage || 0,
        rating: productForUpdate?.rating || 1,
        stock: productForUpdate?.stock || 0,
        brand: productForUpdate?.brand || '',
        images: null,
    };

    useEffect(() => {
        if (productForUpdate) {
            setIsModalOpen(true)
        }
    }, [productForUpdate])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = (values: FormValues) => {
        const images: string[] = [];
        if (values.images) {
            for (let i = 0; i < values.images.length; i++) {
                images.push(URL.createObjectURL(values.images[i]));
            }
        }

        const product: Product = {
            title: values.title,
            category: values.category,
            description: values.description,
            price: values.price,
            discountPercentage: values.discountPercentage || 0,
            rating: values.rating,
            stock: values.stock,
            brand: values.brand,
            images: images,
        };
        if (productForUpdate) {
            dispatch(productAction.updateProductLocal({id: productForUpdate.id, ...product}))
            dispatch(productAction.setProductForUpdate(null))
        }
        dispatch(productAction.addProduct(product))
        dispatch(productAction.addProductLocal(product))
        setIsModalOpen(false)

    };


    return (
        <>
            <Button type="primary" onClick={showModal}>
                AddProduct
            </Button>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} footer={null} onCancel={handleCancel}>
                <Formik initialValues={initialValues} validationSchema={ProductSchema} onSubmit={handleSubmit}>
                    {({errors, touched, setFieldValue, values, handleChange}) => (

                        <Form>
                            <div>
                                <label htmlFor="title">Title:</label>
                                <Field name="title" as={Input} onChange={handleChange} value={values.title}/>
                                {errors.title && touched.title ? <div>{errors.title}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="category">Category:</label>
                                <Field name="category" as={Input} onChange={handleChange} value={values.category}/>
                                {errors.category && touched.category ? <div>{errors.category}</div> : null}
                            </div>

                            <div>
                                <label htmlFor="description">Description:</label>
                                <Field name="description" onChange={handleChange} as={Input.TextArea}
                                       value={values.description}/>
                                {errors.description && touched.description ? <div>{errors.description}</div> : null}
                            </div>

                            <div>
                                <label htmlFor="price">Price:</label>
                                <Field name="price" as={Input} onChange={handleChange} value={values.price}
                                       type={'number'}/>
                                {errors.price && touched.price ? <div>{errors.price}</div> : null}
                            </div>

                            <div>
                                <label htmlFor="discountPercentage">Discount Percentage:</label>
                                <Field name="discountPercentage" as={Input}
                                       type="number"
                                       onChange={handleChange}
                                       min={0}
                                       max={100}
                                       value={values.discountPercentage}
                                    // formatter={(value: any) => `${value}%`}
                                    // parser={(value: string) => value.replace('%', '')}
                                />
                                {errors.discountPercentage && touched.discountPercentage ?
                                    <div>{errors.discountPercentage}</div> : null}
                            </div>

                            <div>
                                <label htmlFor="rating">Rating:</label>
                                <Field name="rating" onChange={handleChange} value={values.rating} as={Input}
                                       type="number"/>
                                {errors.rating && touched.rating ? <div>{errors.rating}</div> : null}
                            </div>

                            <div>
                                <label htmlFor="stock">Stock:</label>
                                <Field name="stock" onChange={handleChange} value={values.stock} as={Input}
                                       type="number"/>
                                {errors.stock && touched.stock ? <div>{errors.stock}</div> : null}
                            </div>

                            <div>
                                <label htmlFor="brand">Brand:</label>
                                <Field name="brand" onChange={handleChange} value={values.brand} as={Input}/>
                                {errors.brand && touched.brand ? <div>{errors.brand}</div> : null}
                            </div>

                            <div>
                                <label htmlFor="images">Images:</label>
                                {/*{initialValues?.images && <img src={URL.createObjectURL(initialValues.images[0])} alt=""/>}*/}
                                {values.images ?
                                    <img className={classes.img} src={URL.createObjectURL(values.images[0])} alt=""/> :
                                    <Field name="images">
                                        {({field}: { field: { name: string; value: string[]; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void } }) => (
                                            <Dragger
                                                name={field.name}
                                                multiple
                                                accept="image/*"
                                                onChange={(info) => {
                                                    const files = info.fileList.map((file) => file.originFileObj);
                                                    setFieldValue(field.name, files);
                                                }}
                                            >
                                                <p className="ant-upload-drag-icon">
                                                    <UploadOutlined/>
                                                </p>
                                                <p className="ant-upload-text">Click or drag file to this area to
                                                    upload</p>
                                            </Dragger>
                                        )}
                                    </Field>}
                                {errors.images && touched.images ? <div>{errors.images}</div> : null}
                            </div>


                            <div className={classes.btn}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik></Modal></>
    );
};

export {ProductForm};

