import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/main.css";
import axios from "../axios";
import { FullProfile } from "./Profile/index.jsx";
import { NavMenu } from "./NavMenu/index";
import { Helmet } from "react-helmet";

const ProfileAdmin = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [selfdata, setSelfData] = useState();
  const [selfLoading, setSelfLoading] = useState(true);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/profile/admin/${id}/`, { credentials: "include" })
      .then((res) => {
        if (res.data.message === "User not found") {
          window.location = `https://lulu-bot.tech/profile/admin/${res.data.user}`;
        } else {
          setData(res.data);
          setLoading(false);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.warn(err);
        // window.location = "https://lulu-bot.tech/";
      });
    axios
      .get(`/profile/admin/`, { credentials: "include" })
      .then((res) => {
        if (res.data.message === "User not found") {
          window.location = `https://lulu-bot.tech/profile/admin/${res.data.user}`;
        } else {
          setSelfData(res.data);
          setSelfLoading(false);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.warn(err);
        // window.location = "https://lulu-bot.tech/";
      });
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <div
          style={{ backgroundColor: "#17191f", width: "100%", height: "100vh" }}
        >
        </div>
      </div>
    );
  }
  if (selfLoading) {
    return (
      <div>
        <div
          style={{ backgroundColor: "#17191f", width: "100%", height: "100vh" }}
        >
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{data.nick}</title>
      </Helmet>
      <NavMenu profile={selfdata} />
      <FullProfile
        idprofile={data.id}
        nick={data.nick}
        avatar={data.avatar}
        lvlprofile={data.lvl}
        lvl_color={data.lvl_color}
        name_lvl={data.name_lvl}
        typeAdminprofile={data.typeAdmin}
        addTypeAdminprofile={data.addTypeAdmin}
        reason={data.reason}
        preds={data.preds}
        dateSet={data.dateSet}
        dateUp={data.dateUp}
        daysinactive={data.daysinactive}
        minusday={data.minusday}
        minusrep={data.minusrep}
        plusrep={data.plusrep}
        forumlink={data.forum}
        vklink={data.vk}
        inactive={data.inactive}
        blat={data.blat}
        accessAdm={data.accessAdm}
        accessFrom={data.accessFrom}
        theme={data.theme}
        daysUp={data.daysUp}
        online={data.online}
      />
    </div>
  );
};

export default ProfileAdmin;
