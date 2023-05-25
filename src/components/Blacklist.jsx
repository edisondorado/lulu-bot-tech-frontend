import React, { useState, useEffect } from "react";
import axios from "../axios";
import { NavMenu } from "./NavMenu/index";
import { Helmet } from "react-helmet";
import { BlacklistFull } from './Blacklist/index'

const Blacklist = () => {
  const [isLoading, setLoading] = useState(true);
  const [isSelfLoading, setSelfLoading] = useState(true);
  const [data, setData] = useState();
  const [selfData, setSelfData] = useState();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/blacklist`, { credentials: "include" })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location = "https://lulu-bot.tech/";
      });
  }, []);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/profile/admin`, { credentials: "include" })
      .then((res) => {
        setSelfData(res.data);
        setSelfLoading(false);
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

  if (isSelfLoading) {
    return (
      <div style={{ backgroundColor: "#17191f", width: "100%", height: "100vh" }}>
        
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Список провинившихся</title>
      </Helmet>
      <NavMenu profile={selfData}/>
      <BlacklistFull Blacklist={data}/>
    </div>
  );
};

export default Blacklist;
