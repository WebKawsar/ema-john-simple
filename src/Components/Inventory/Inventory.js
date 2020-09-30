import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const product = {};
    const handleAddProducts = () => {
        
        fetch("https://immense-escarpment-74086.herokuapp.com/addproduct", {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
        })

    }

    return (
        <div>
            <form action="">
                <p><span>Product Name : </span><input name="name" type="text" placeholder="Product name"/></p>
                <p><span>Price : </span><input name="price" type="text" placeholder="Price"/></p>
                <p><span>Quantity : </span><input name="quantity" type="text" placeholder="Quantity"/></p>
                <p><span>Product image : </span><input name="name" type="file" placeholder="Product name"/></p>
                
                <button onClick={handleAddProducts}>Add products</button>
            </form>
            
        </div>
    );
};

export default Inventory;