import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IProduct, IProductResponse} from "../../interfaces";
import {productServices} from "../../services";

interface Ifilter {
    category: string,
    value: string[]
}

interface IInitialState {
    products: IProduct[]
    sortingByOption: string,
    filterBy: Ifilter[],
    findBy: string,
    error: boolean,
    pending: boolean,
    productForUpdate: any

}

const initialState: IInitialState = {
    products: [],
    sortingByOption: '',
    filterBy: [],
    findBy: '',
    error: false,
    pending: false,
    productForUpdate: null

}

const getAllProducts = createAsyncThunk<IProductResponse>(
    'productSlice/getAllProducts',
    async () => {
        const {data} = await productServices.getProduct()
        return data
    }
);

const addProduct = createAsyncThunk<any, any, any>(
    'productSlice/addProduct',
    async (product: IProduct) => {
        const {data} = await productServices.addProduct(product)
        return product
    }
);

const deleteProduct = createAsyncThunk<string, string>(
    'productSlice/deleteProduct',
    // @ts-ignore
    async (id: string) => {
        const {data} = await productServices.deleteProduct(id)
        console.log(data)
        return data
    }
)


const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        sortBy: (state, action) => {
            state.sortingByOption = action.payload
            state.findBy = ''
        },
        filterBy: (state, action) => {
            let index = state.filterBy.findIndex(c => c.category === action.payload.category)
            if (index === -1) {
                state.filterBy.push(action.payload)
            } else {
                state.filterBy[index] = action.payload;
            }
            state.findBy = ''


        },
        findBy: (state, action) => {
            state.findBy = action.payload
            state.filterBy = []
            state.sortingByOption = ''
        },
        addProductLocal: (state, action) => {
            state.products.push(action.payload)
        },
        updateProductLocal: (state, action) => {

            const product = action.payload;
            const index = state.products.find(p => p.id === product.id)
            let stateCopy = [...state.products]
            // @ts-ignore
            stateCopy[index] = product
            state.products = [...stateCopy]
            state.productForUpdate = null
        },
        setProductForUpdate: (state, action) => {
            state.productForUpdate = action.payload
        }


    },
    extraReducers: (builder => {
        builder
            .addCase(getAllProducts.fulfilled, (state, actions) => {
                const {products} = actions.payload;
                state.products = products
                state.error = false
                state.pending = false
            })
            .addCase(getAllProducts.rejected, (state, actions) => {
                state.error = true
                state.pending = false
            })
            .addCase(getAllProducts.pending, (state, actions) => {
                state.error = false
                state.pending = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.error = false
                state.pending = false
                console.log(action.payload)
                // @ts-ignore
                state.products = [...state.products.filter(product => product.id !== action.payload.id)]
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.pending = true
                // @ts-ignore
                state.products = [...state.products.filter(product => product.id !== action.payload.id)]
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.error = false
                state.pending = false
                // state.products.push(action.payload)
            })
            .addCase(addProduct.pending, (state, action) => {
                state.error = false
                state.pending = true
                // state.products.push(action.payload)
            })
            .addCase(addProduct.rejected, (state, action) => {state.error = false
                state.pending = false
                state.error = false

                // state.products.push(action.payload)
            })
    })
})
const {
    reducer: productsReducer,
    actions: {sortBy, filterBy, findBy, addProductLocal, updateProductLocal, setProductForUpdate}
} = productSlice;
const productAction = {
    getAllProducts,
    sortBy,
    filterBy,
    findBy,
    deleteProduct,
    addProduct,
    addProductLocal,
    updateProductLocal,
    setProductForUpdate

}
export {productAction, productsReducer}