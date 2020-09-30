import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import "./Review.css";
import happyImage from "../../images/giphy.gif";
import { useHistory } from 'react-router-dom';

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced] = useState(false);
    const history = useHistory();
    useEffect(() => {

        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);


        fetch("https://immense-escarpment-74086.herokuapp.com/productsByKeys", {
            method: 'POST',
            body: JSON.stringify(productKeys),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setCart(data))



    }, []);

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    const handleProceedCheckout = () => {

        history.push("/shipment");
    }
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="" />
    }

    return (
        <div className="review-container">
            <div className="review-product">
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="review-cart">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="btn-cart">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;