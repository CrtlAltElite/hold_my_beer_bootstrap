import React from "react";
import Navbar from "./Navbar";
import LoggedOutNav from "./LoggedOutNav";
// import Footer from './Footer';

const Main = ({user}) => {
      if(user?.token) return <Navbar />
      return <LoggedOutNav/>
};

export default Main;
