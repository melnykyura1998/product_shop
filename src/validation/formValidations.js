import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, InputNumber } from "antd";
import Joi from "joi";

const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(10).max(300).required(),
    price: Joi.number().min(1).required(),
    discountPercentage: Joi.number().min(0).max(100).optional(),
    rating: Joi.number().min(1).max(5).required(),
    stock: Joi.number().min(0).required(),
    brand: Joi.string().required(),
});