import * as React from "react";
import { createContext, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
// import { auth } from '../lib/init-firebase'

export const Context = createContext<any>([]);

const UserAuthContext = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  //signin with facebook
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //sign in  with email and password
  const handleAuthLogin = async (email: string, password: string) => {
    // debugger;
    try {
      const user = await signInWithEmailAndPassword (
        auth,
        email,
        password
      );
      console.log(user);
      console.log(user.user.email)
      localStorage.setItem("user", JSON.stringify(user));
      console.log("signed in");
      }
      catch (error: any) {
        console.log(error.message);
      };
  };

  //create a user with email and password
  const handleAuthRegister = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword (
        auth,
        email,
        password
      );
      console.log(user);
      console.log(user.user.email)
      localStorage.setItem("user", JSON.stringify(user));
      console.log("signed up");
      }
      catch (error: any) {
        console.log(error.message);
      };
  };

  //sign out
  const handleAuthLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
        localStorage.removeItem("user");
        setUser(null);
        return true;
      })
      .catch((error) => console.log(error));
  };

  return (
    <Context.Provider
      value={{
        user,
        handleAuthLogin,
        signInWithFacebook,
        handleAuthRegister,
        handleAuthLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default UserAuthContext;
