import React, { useEffect } from "react";
import styles from "./styles/Auth.module.scss";
import clsx from "clsx";
import axios from "../axios";
import { Helmet } from "react-helmet";

const AuthPage = () => {
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/checkauth`, { credentials: "include" })
      .then((res) => {
        if(res.data.success === true && res.data.isAdmin === true) return window.location = `https://lulu-bot.tech/profile/admin/${res.data.userId}`
        if(res.data.success === true && res.data.isAdmin === false) return window.location = `https://lulu-bot.tech/profile/leader/${res.data.userId}`
      })
      .catch((err) => {
        console.warn(err);
        // window.location = "https://lulu-bot.tech/";
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <div className={clsx(styles.auth_container)}>
        <button
          className={clsx(styles.my_button)}
          onClick={() =>
            (window.location.href = "https://lulu-bot.tech/api/auth")
          }
        >
          Авторизоваться
        </button>
      </div>
    </>
  );
};

export default AuthPage;
