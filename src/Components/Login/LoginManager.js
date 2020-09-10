import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig)
    }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }

      return signedInUser;

    })
    .catch(error => console.log(error.errorCode, error.errorMessage))
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(function(result) {

      const token = result.credential.accessToken;
      const user = result.user;
      user.success = true;
      return user;
      
    })
    .catch(function(error) {

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);

    });

}

export const handleSignOut = () => {

    return firebase.auth().signOut()
    .then(response => {
      const signOut = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        error: "",
        success: false
      }
      return signOut;
    })
    .catch(error => console.log(error.message))

}


export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {

      const newUserInfo = response.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserInfo(name);
      return newUserInfo;

    })
    .catch(error => {

        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;

    })
  }

export const signInWithEmailAndPassword = (email, password) => {

    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {

      const newUserInfo = response.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;

    })
    .catch(error => {
      
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;

    })

  }

  const updateUserInfo = name => {

    const user = firebase.auth().currentUser;
    user.updateProfile({

      displayName: name
    })
    .then( () => {

      console.log("User name updated successfully"); 
    })
    .catch(error => {

      console.log(error.message);
    });

  }