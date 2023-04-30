import React, { useState, useEffect } from "react";
import axios from "../axios";
import { NavMenu } from "./NavMenu/index";
import { Helmet } from "react-helmet";
import { LeadersArchiveFull } from './LeadersArchiveFull/index.jsx'

const Archive = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [selfdata, setSelfData] = useState();
  const [selfLoading, setSelfLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/leaders/archive`, { credentials: "include" })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location = "http://localhost:3000/";
      });
  }, []);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/profile/admin/`, { credentials: "include" })
      .then((res) => {
        if (res.data.message === "User not found") {
          window.location = `http://localhost:3000/profile/admin/${res.data.user}`;
        } else {
          setSelfData(res.data);
          setSelfLoading(false);
        }
      })
      .catch((err) => {
        console.warn(err);
        window.location = "http://localhost:3000/";
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
        <title>Архив Лидеров</title>
      </Helmet>
      <NavMenu profile={selfdata}/>
      <LeadersArchiveFull admins={data}/>
    </div>
  );
};

export default Archive;
