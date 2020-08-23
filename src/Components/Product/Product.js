import React from 'react';
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {

    const {name, img, seller, price, stock} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt={name}/>
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order soon</small></p>
                <button onClick={() => props.handleAddProduct(props.product)} className="btn-cart"><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;