import React, { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import "./Shipment.css";
import { UserContext } from '../../App';
import { useContext } from 'react';


const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
  
    
  
    return (

      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your name"/>
        {errors.name && <span className="error">This Name is required</span>}

        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email"/>
        {errors.email && <span className="error">This Name is required</span>}

        <input name="phone" ref={register({ required: true })} placeholder="Your phone number"/>
        {errors.phone && <span className="error">This Name is required</span>}

        <input name="address" ref={register({ required: true })} placeholder="Your address"/>
        {errors.address && <span className="error">This Name is required</span>}
        
        <input type="submit" />
      </form>
    );



};

export default Shipment;