import { fetchingProducts, fetchedProducts, fetchingFailed, productHandling } from '../Actions/ProductsActions';


const initialState = {
    loading: 'fetching',
    showProducts: [],
    selectedProducts: [],
    products: {}
}

export const ProductsReducer = (state=initialState, actions) => {
    switch(actions.type) {
        case(fetchingProducts) : {
            return {
                ...state,
                ...actions.data
            }
        }
        case(fetchedProducts): {
            return {
                ...state,
                ...actions.data
            }
        }
        case(productHandling): {
            return {
                ...state,
                ...actions.data
            }
        }
        case(fetchingFailed): {
            return {
                ...state,
                ...actions.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}