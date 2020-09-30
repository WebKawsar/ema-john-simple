import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    
    const [product, setProduct] = useState({});
    useEffect(() => {

        fetch("https://immense-escarpment-74086.herokuapp.com/product/"+productKey)
        .then(response => response.json())
        .then(data => setProduct(data))
    }, [productKey])

    // const singleProduct = fakeData.find(pd => pd.key === productKey)

    return (
        <div>
            <h1>Your product details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;