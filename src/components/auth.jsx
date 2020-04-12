import React from "react";
import { Redirect } from "react-router-dom";

function Auth() {
  const isloggedIn = localStorage.getItem("user");
  const help = () => {
    return <Redirect to="/" />;
  };
  return <>{!isloggedIn ? help() : null}</>;
}
export default Auth;
