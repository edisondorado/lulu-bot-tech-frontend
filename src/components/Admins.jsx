import React, { useState, useEffect } from "react";
import axios from "../axios";
import { NavMenu } from "./NavMenu/index";
import { Helmet } from "react-helmet";
import { AdminsFull } from './Admins/index.jsx'

const Admins = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/admins/`, { credentials: "include" })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location = "https://lulu-bot.tech/";
      });
  }, []);

  if (isLoading) {
    return (
      <div style={{ backgroundColor: "#17191f", width: "100%", height: "100vh" }}>
        
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Список администрации</title>
      </Helmet>
      <NavMenu profile={data.user}/>
      <AdminsFull admins={data}/>
    </div>
  );
};

export default Admins;
