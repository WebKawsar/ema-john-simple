import React, { useState } from 'react';
import fakeData from '../../fakeData';
import "./Shop.css";
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from "../../utilities/databaseManager";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products] = useState(first10);
    const [cart, setCart] = useState([]);

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
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(findPro => findPro.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;

        })

       setCart(previousCart);

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