// import * as React from 'react';
import { useContext } from "react";
import { Context } from "../context/UserAuthContext";


const useAuth = () => {
  const {
    user,
    handleAuthLogin,
    signInWithFacebook,
    signInWithGoogle,
    handleAuthRegister,
    handleAuthLogout,
  } = useContext(Context)

  return {
    user,
    handleAuthLogin,
    signInWithFacebook,
    signInWithGoogle,
    handleAuthRegister,
    handleAuthLogout,
  }
};

export default useAuth;