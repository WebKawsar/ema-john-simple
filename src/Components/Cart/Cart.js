import React from 'react';


const Cart = (props) => {

    const cart = props.cart;
    const total = cart.reduce((total, value) => total + (value.price * value.quantity), 0);

    function getNumber(num){
        return parseFloat(num.toFixed(2));
    }
    const grandTotal = getNumber(total);

    let shipping = 0;
    if(grandTotal > 0 && grandTotal < 100){
        shipping = 8;
    }
    else if(grandTotal > 100 && grandTotal < 200){
        shipping = 4;
    }
    else if(grandTotal > 200){
        shipping = 0;
    }
    
    return (
        <div>
            <h4>Order Summary : </h4>
            <p>Items Ordered : {cart.length}</p>
            <p>Product Price : {getNumber(total)}</p>
            <p data-toggle="tooltip" data-placement="right" title="Tooltip on right">
                <small>Shipping Cost : {getNumber(shipping)}</small>
            </p>
            <p>Total : {getNumber(total + shipping)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;