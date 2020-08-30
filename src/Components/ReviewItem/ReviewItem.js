import React from 'react';

const ReviewItem = (props) => {
    const {name, price, quantity} = props.product;
    const reviewItemStyle = {
        borderBottom: "2px solid gray",
        padding: "40px 40px",
        margin: "10px 20px"
    };


    return (
        <div style={reviewItemStyle} className="review-item">
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <br/>
            <button className="btn-cart">Remove</button>
        </div>
    );
};

export default ReviewItem;