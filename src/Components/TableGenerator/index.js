import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BoxLoading } from 'react-loadingg';
import { completeProductsAction, completeProductHandling } from '../../Store/Actions/ProductsActions';
import { SelectTag } from '../Reusables/SelectTag';
import TableRowGenerator from '../TableRowGenerator';
import './Styles.css';
import { get } from 'lodash';

// action dispatcher for fetching the products and seeting required data in redux, please find it inside action folder;
const completeActionDispatcher = () => completeProductsAction();


// Preffered to handle actions data from the component and not from action creator or redux (below function is working on the dropdown
// select and cross button on top of the images, this after processing loading the required data in the redux)
const getProductsHandlingDispatcher = (productName, showProducts, selectedProducts, origin='select', elementName) => {
    let newShowProduct = [...showProducts];
    let newSelectedProducts = [...selectedProducts];
    if (origin==='select') {
        const [showIndex] = [newShowProduct.indexOf(productName)];
        if (showIndex!==-1) { newShowProduct.splice(showIndex, 1); newSelectedProducts.push(productName); return completeProductHandling(newShowProduct, newSelectedProducts ) };
    } 
    const [selectIndex] = [newSelectedProducts.indexOf(elementName)] ;
    if (selectIndex!==-1) { newSelectedProducts.splice(selectIndex, 1); newShowProduct.push(elementName); return completeProductHandling(newShowProduct, newSelectedProducts ) };
} 

// Main Component 

const TableGenerator = () => {
    
    // Handling the show difference internally.
    const [ isShowDifferent, setShowDifferent ] = useState(false);
    // Showing loader depending on the value of the loading.
    const loading = useSelector(state => state.ProductsReducer.loading);
    // This array contains products name to show in the drop down.
    const showProducts = useSelector(state => state.ProductsReducer.showProducts);
    // Fetching all the products data to process the table rows.
    const allProducts = useSelector(state => state.ProductsReducer.products);
    // This array contains the data of selected products for comparision.
    const selectedProducts = useSelector(state => state.ProductsReducer.selectedProducts);
    const dispatch = useDispatch();

    // Firing the action for fetching the data.
    useEffect(() => { dispatch(completeActionDispatcher()) }, []);

    // function for setting show difference on/off
    function differenceHandler() { setShowDifferent(!isShowDifferent) }
    // function for dispatching calling dispacher function with correct data for showProducts and selected products.
    function selectHandler(e,element,origin) { if(origin==='header' || e.target.value !== 'default') dispatch(getProductsHandlingDispatcher(e.target.value, showProducts, selectedProducts, origin, element ))};

    return (
        loading!=='fetching' ? (<div className="outerDiv">
        <table>
            <thead>
                <tr className="rowBorder">
                <th className="tableHeadBorder">
                    <div className="compareText">Compare</div>
                    <div className="selectionDiv">{selectedProducts.length} item selected</div>
                    <div className="diffStyle"><input type="checkbox" name="difference" value="difference" onClick={differenceHandler} /> Show Differences Only</div>
                </th>
                {selectedProducts.map((element) => {
                return (<th key={element} className="tableHeadBorder">
                    <div className="crossHolder" onClick={(e) => {selectHandler(e, element, 'header')}}>
                    <img className="imgStyle" src={process.env.PUBLIC_URL+'/cross.png'} alt="cross" />
                    </div>
                    <div className="displayImageHolder">
                        <img className="displayImage" src={get(allProducts, `compareSummary.images.${element}`)} alt="product pic" />
                    </div>
                    <div className="productName">{get(allProducts, `compareSummary.titles.${element}.title`)}</div>
                    <div className="priceHolder">
                        <span className="finalPrice">&#8377; {get(allProducts, `compareSummary.productPricingSummary.${element}.finalPrice`) || ''}</span>
                        <span className="discountPrice">
                        &#8377; {get(allProducts, `compareSummary.productPricingSummary.${element}.price`) || ''}
                            <span className="strikeThrough"></span>
                        </span>
                        <span className="discountPercentage">{get(allProducts, `compareSummary.productPricingSummary.${element}.totalDiscount`) || ''}%</span>
                    </div>
                </th>)
                })}
                {selectedProducts.length<4 && <th className="tableHeadBorder">
                    <SelectTag showProducts={showProducts} selectHandler={selectHandler} />
                </th>}
                </tr>
            </thead>
            <tbody>
                {allProducts && <TableRowGenerator products={allProducts} isShowDifferent={isShowDifferent} selectedProducts={selectedProducts} />}
            </tbody>
        </table>
        </div>) : <BoxLoading />
    )
}

export default TableGenerator;
