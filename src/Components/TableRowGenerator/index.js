import React from 'react';
import get from 'lodash/get';
import './Styles.css'


// Main function to create the rows with data of all the products and selected product for  comparision.
const TableRowGenerator = (props) => {
    if (Array.isArray(get(props, 'products.featuresList'))) {
        let newArray = [];
        // looping through the featurelist and making the tittle row
        props.products.featuresList.forEach((firstElement, index) => {
            newArray.push(<tr key={`${firstElement.title+index}`} className="categoryStyle">
                <td key={`${firstElement.title+'sub'}`}>{firstElement.title}</td>
                {props.selectedProducts.map((element, index) => <td key={firstElement+index} className="tdDesign"></td>)}
            </tr>);
            // looping again and making the feature name row
            firstElement.features.forEach((secondElement, index) => {
            let newdata = [];
            newdata.push(<td key={`${secondElement.featureName+index}`}>{secondElement.featureName}</td>);
            // Handling show difference only table data. 
            if(props.isShowDifferent && get(secondElement, 'properties.isDifferent')) {
                (newdata.push(...(props.selectedProducts.map(((elementValues, index) => <td key={`${secondElement.values+index}`}
                className="tdDesign">
                {secondElement.values[elementValues]}</td>)))));
            } else if(!(props.isShowDifferent)) {
                // Generating table data for selected products for comparision.
                (newdata.push(...(props.selectedProducts.map(((elementValues, index) => <td key={`${secondElement.values+index}`}
                className="tdDesign">
                {secondElement.values[elementValues]}</td>)))));
            }
            newArray.push(<tr key={`${secondElement.featureName+(index+index)}`}>{newdata}</tr>)
            });
        });
        return newArray
    }
    return null;
}

export default TableRowGenerator;