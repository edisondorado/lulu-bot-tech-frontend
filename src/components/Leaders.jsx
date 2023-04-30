import React, { useState, useEffect } from "react";
import axios from "../axios";
import { NavMenu } from "./NavMenu/index";
import { Helmet } from "react-helmet";
import { LeadersFull } from './Leaders/index.jsx'

const Leaders = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [selfData, setSelfData] = useState();
  const [selfLoading, setSelfLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/leaders/`, { credentials: "include" })
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
      .get(`/profile/`, { credentials: "include" })
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
        // window.location = "http://localhost:3000/";
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        
      </div>
    );
  }

  if (selfLoading) {
    return (
      <div>
        
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Список лидеров</title>
      </Helmet>
      <NavMenu profile={selfData}/>
      <LeadersFull leaders={data}/>
    </div>
  );
};

export default Leaders;
