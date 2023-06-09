import React, { useState, useEffect } from "react";
import axios from "../axios";
import { NavMenu } from "./NavMenu/index";
import { Helmet } from "react-helmet";
import { ArchiveFull } from './Archive/index.jsx'

const Archive = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [selfdata, setSelfData] = useState();
  const [selfLoading, setSelfLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/admins/archive`, { credentials: "include" })
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
      .get(`/profile/admin/`, { credentials: "include" })
      .then((res) => {
        if (res.data.message === "User not found") {
          window.location = `https://lulu-bot.tech/profile/admin/${res.data.user}`;
        } else {
          setSelfData(res.data);
          setSelfLoading(false);
        }
      })
      .catch((err) => {
        console.warn(err);
        window.location = "https://lulu-bot.tech/";
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <div
          style={{ backgroundColor: "#17191f", width: "100%", height: "100vh" }}
        ></div>
      </div>
    );
  }

  if (selfLoading) {
    return (
      <div>
        <div
          style={{ backgroundColor: "#17191f", width: "100%", height: "100vh" }}
        ></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Архив Администрации</title>
      </Helmet>
      <NavMenu profile={selfdata}/>
      <ArchiveFull admins={data}/>
    </div>
  );
};

export default Archive;
