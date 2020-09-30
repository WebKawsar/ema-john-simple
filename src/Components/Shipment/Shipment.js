import React from 'react';
import { useForm } from 'react-hook-form';
import "./Shipment.css";
import { UserContext } from '../../App';
import { useContext } from 'react';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';


const Shipment = () => {
  const [loggedInUser] = useContext(UserContext);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {

    const savedCart = getDatabaseCart();
    const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() }

    fetch('https://immense-escarpment-74086.herokuapp.com/addOrder', {
      method: 'POST',
      body: JSON.stringify(orderDetails),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((response) => response.json())
    .then((data) => {

      if(data){
        processOrder();
        alert("Your order placed successfully")
      }
    })

  };



  return (

    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your name" />
      {errors.name && <span className="error">Name is required</span>}

      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
      {errors.email && <span className="error">Email is required</span>}

      <input name="phone" ref={register({ required: true })} placeholder="Your phone number" />
      {errors.phone && <span className="error">Phone number is required</span>}

      <input name="address" ref={register({ required: true })} placeholder="Your address" />
      {errors.address && <span className="error">Address is required</span>}

      <input type="submit" />
    </form>
  );



};

export default Shipment;