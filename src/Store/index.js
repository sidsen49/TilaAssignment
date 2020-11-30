import { combineReducers ,createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { ProductsReducer } from './Reducers/ProductsReducer';


const store=createStore(
    combineReducers({ 
        ProductsReducer
     }),
    applyMiddleware(
      thunkMiddleware
    )
  )

  
export default store