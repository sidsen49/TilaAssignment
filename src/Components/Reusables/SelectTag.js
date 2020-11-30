import React from 'react';
import PropTypes from 'prop-types';

export const SelectTag = (props) => {
    return (
    <>
    <select name="cars" onChange={props.selectHandler}>
        <option value="default">Please select the model</option>
    {props.showProducts.map(element => <option value={element} key={element}>{element}</option>)}
    </select>
    </>
    )
}

SelectTag.propTypes = {
    showProducts : PropTypes.array,
    selectHandler: PropTypes.func
}
