import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import {
   initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword 
} from './LoginManager';



function Login() {

  const [newUser, setnewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    success: false
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(response => {

      handleResponse(response, true);

    })
  }

  const signOut = () => {
    handleSignOut()
    .then(response => {

      handleResponse(response, false);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(response => {

      handleResponse(response, true);
    })
  }


  const handleSubmit = (e) => {

    if(newUser && user.email && user.password){

      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(response => {

        handleResponse(response, true);

      })

    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(response => {

        handleResponse(response, true);

    })
  }

    e.preventDefault();
  }


  const handleResponse = (response, redirect) => {

    setUser(response);
    setLoggedInUser(response);
    if(redirect){
      history.replace(from);
    }

  }




  const handleChange = (event) => {
    
    let isFormValid = true;
    if(event.target.name === "email"){

      isFormValid =  /\S+@\S+\.\S+/.test(event.target.value);
      
    }

    if(event.target.name === "password"){

      const isPasswordValid =  event.target.value.length > 6;
      const isPasswordNum =  /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && isPasswordNum;

    }
    if(isFormValid){

      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }

  }





  return (
    <div style={{textAlign: "center"}}>
        {
          user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In using Google</button>
        }
        <br/>
        <button onClick={fbSignIn}>Log in using Facebook</button>
        {
          user.isSignedIn && <div>

          <h2>Welcome {user.name}</h2>
          <h4>email: {user.email}</h4>
          <img src={user.photo} alt=""/>
          </div>
          
        }

        <h2>Our Own Othentication</h2>
        <input type="checkbox" onChange={() => setnewUser(!newUser)} name="newUser" id="newUser"/>
        <label htmlFor="newUser">New user Sign Up</label>

        <form onSubmit={handleSubmit}>
          {newUser && <input type="text" onBlur={handleChange} name="name" id="" placeholder="Your name"/>}
          <br/>
          <input type="text" name="email" onBlur={handleChange} id="" placeholder="Your email" required/>
          <br/>
          <input type="password" name="password" onBlur={handleChange} id="" placeholder="Password" required/>
          <br/>
          <input type="submit" value={newUser ? "Sign Up" : "Sign In"}/>
        </form>
        <p style={{color: "red"}}>{user.error}</p>
        {
          user.success && <p style={{color: "green"}}>User {newUser ? "created" : "Logged in"} successfully</p>
        }
    </div>
  );
}

export default Login;
