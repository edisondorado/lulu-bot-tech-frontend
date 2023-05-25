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
        window.location = "https://lulu-bot.tech/";
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
        window.location = "https://lulu-bot.tech/";
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
        {/* <title>Alan_Butler</title> */}
        <title>{data.nick}</title>
      </Helmet>
      {/* <NavMenu/> */}
      <NavMenu profile={selfdata} />
      <FullProfile
        // idprofile="701440080111337513"
        // nick="Alan_Butler"
        // avatar="https://images-ext-2.discordapp.net/external/mli4pt0V8NNrm-LLQpdDOFjGxxKeScHfg_xEiI8CwSw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/701440080111337513/a_eaeaf5c6186daaeb46788882f2600311.gif"
        // lvlprofile="4"
        // lvl_color="rgb(64, 64, 253)"
        // name_lvl="Администратор"
        // typeAdminprofile="Помощник Тех.Адм."
        // addTypeAdminprofile="-"
        // reason="Лидерка"
        // preds="0"
        // dateSet="2023-01-25"
        // dateUp="2023-01-25"
        // daysinactive="0"
        // minusday="0"
        // minusrep="0"
        // plusrep="0"
        // forumlink="https://forum.arizona-rp.com/members/744778/"
        // vklink="https://vk.com/id604594805"
        // inactive="0"
        // blat="0"
        // accessAdm="true"
        // accessFrom="true"
        // daysUp="100"
        // online={[
        //   {
        //     "date": "2023.05.09",
        //     "online": "00:00:00"
        //   },
        //   {
        //     "date": "2023.05.10",
        //     "online": "00:00:42"
        //   },
        //   {
        //     "date": "2023.05.11",
        //     "online": "03:41:19"
        //   },
        //   {
        //     "date": "2023.05.12",
        //     "online": "00:00:00"
        //   },
        //   {
        //     "date": "2023.05.13",
        //     "online": "05:04:57"
        //   },
        //   {
        //     "date": "2023.05.14",
        //     "online": "02:52:08"
        //   },
        //   {
        //     "date": "2023.05.15",
        //     "online": "01:59:21"
        //   },
        //   {
        //     "date": "2023.05.16",
        //     "online": "00:53:03"
        //   },
        //   {
        //     "date": "2023.05.17",
        //     "online": "02:15:13"
        //   },
        //   {
        //     "date": "2023.05.18",
        //     "online": "02:33:00"
        //   },
        //   {
        //     "date": "2023.05.19",
        //     "online": "05:07:36"
        //   },
        //   {
        //     "date": "2023.05.21",
        //     "online": "01:39:06"
        //   },
        //   {
        //     "date": "2023.05.22",
        //     "online": "02:02:23"
        //   },
        //   {
        //     "date": "2023.05.23",
        //     "online": "02:02:23"
        //   },
        //   {
        //     "date": "2023.05.24",
        //     "online": "02:02:23"
        //   }
        // ]}
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
        daysUp={data.daysUp}
        online={data.online}
      />
    </div>
  );
};

export default ProfileAdmin;
