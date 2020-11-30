import axios from 'axios';
import get from 'lodash/get';


export const fetchingProducts = 'fetchingProducts';

export const fetchedProducts = 'fetchedProducts';

export const fetchingFailed = 'fetchingFailed';

export const productHandling = 'productHandling';


const fetchingProductsAction = () => {
    return {
        type: fetchedProducts,
        data: {
            loading: 'fetching',
        }
    }
}

const fetchedProductsAction = (products, allProducts={}) => {
    return {
        type: fetchedProducts,
        data: {
            loading: 'fetched',
            showProducts: [...products],
            selectedProducts: [],
            products: {...allProducts},
        }
    }
}

const fetchingFailedActions = () => {
    return {
        type: fetchingFailed,
        data : {
            loading: 'failed',
        }
    }
}

export const productHandlingAction = (showProducts, selectedProducts) => {
    return {
        type: productHandling,
        data : {
            showProducts: [...showProducts],
            selectedProducts: [...selectedProducts]
        }
    }
} 

export const completeProductHandling = (showProducts, selectedProducts) => {
    return (dispatch) => {
        dispatch(productHandlingAction(showProducts, selectedProducts));
    }
}

export const completeProductsAction = () => {
    return (dispatch) => {
        dispatch(fetchingProductsAction);
        axios({
            method:'get',
            url:'https://www.mocky.io/v2/5e9ebdaa2d00007800cb7697',
            headers:{ "Content-Type": "application/json; charset=UTF-8" },
        }).then((data) => {
            const products = Object.keys(get(data, 'data.products.compareSummary.titles') || {});
            dispatch(fetchedProductsAction(products, get(data, 'data.products')));
        })
        .catch((error) => {
            console.log(error);
        })
    }
}