import React, { useState } from 'react';
import "./Shop.css";
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from "../../utilities/databaseManager";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';


const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch("https://immense-escarpment-74086.herokuapp.com/products")
        .then(response => response.json())
        .then(data => setProducts(data))
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1;
        let newCart;

        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        
        setCart(newCart);
        addToDatabaseCart(product.key, count);
        
    };

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
    

    return (
        <div className="container">
            <div className="shop-container">
                <div className="product-container">
                {
                    products.map(singleProduct => <Product showAddToCart={true} handleAddProduct={handleAddProduct} product={singleProduct} key={singleProduct.key}>{singleProduct.name}</Product>)
                }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="btn-cart">Review order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
            <div className="footer-section">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Shop;