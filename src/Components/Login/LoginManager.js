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
        success: true,
        error: ""
      }

      return signedInUser;
    })
    .catch(error => {

      const newUserInfo = {};
      newUserInfo.isSignedIn = false;
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    })
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(res => {
      
      const {displayName, email, photoURL} = res.user;
      const fbSignedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
        error: ""
      }
      
      return fbSignedInUser;
    })
    .catch(error => {

        const newUserInfo = {};
        newUserInfo.isSignedIn = false;
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;

    })

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

  const updateUserInfo = (name) => {

    const user = firebase.auth().currentUser;
    user.updateProfile({

      displayName: name
    })
    .then( response => {

      
      console.log("User updated successfully");
      return response; 
    })
    .catch(error => {

      console.log(error.message);
    });

  }