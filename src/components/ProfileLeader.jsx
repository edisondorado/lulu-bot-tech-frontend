import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/main.css";
import axios from "../axios";
import { FullProfileLeader } from "./ProfileLeader/index";
import { NavMenu } from "./NavMenu/index";
import { Helmet } from "react-helmet";

const ProfileAdmin = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [selfdata, setSelfData] = useState();
  const [selfLoading, setSelfLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/profile/leader/${id}`, { credentials: "include" })
      .then((res) => {
        if (res.data.message === "User not found") {
          window.location = `https://lulu-bot.tech/profile/leader/${res.data.user}`;
        } else {
          setData(res.data);
          setLoading(false);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.warn(err);
        window.location = "http://localhost:3000/";
      });
  }, [id]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/profile/admin/`, { credentials: "include" })
      .then((res) => {
        if (res.data.message === "User not found") {
          window.location = `https://lulu-bot.tech/profile/admin/`;
        } else {
          setSelfData(res.data);
          setSelfLoading(false);
        }
      })
      .catch((err) => {
        console.warn(err);
        window.location = "https://lulu-bot.tech/";
      });
  }, [id]);

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
        <title>{data.nick}</title>
      </Helmet>
      <NavMenu profile={selfdata}/>
      <FullProfileLeader
        idprofile={data.idprofile}
        selfid={data.selfid}
        nick={data.nick}
        avatar={data.avatar}
        rank={data.rank}
        fraction={data.fraction}
        reason={data.reason}
        ustwarn={data.ustwarn}
        strwarn={data.strwarn}
        city={data.city}
        age={data.age}
        dateSet={data.dateSet}
        forum={data.forum}
        vk={data.vk}
        active={data.active}
        theme={data.theme}
        accessFrom={data.accessFrom}
        discord={data.discord}
        online={data.online}
      />
    </div>
  );
};

export default ProfileAdmin;
