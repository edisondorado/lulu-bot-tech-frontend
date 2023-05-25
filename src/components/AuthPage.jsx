import React from "react";
import styles from "./styles/Auth.module.scss";
import clsx from "clsx";
import { Helmet } from "react-helmet";

const AuthPage = () => {
  return (
    <>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <div className={clsx(styles.auth_container)}>
        <button
          className={clsx(styles.my_button)}
          onClick={() =>
            // (window.location.href = "https://lulu-bot.tech/api/auth")
            (window.location.href = "http://localhost:3001/api/auth")
          }
        >
          Авторизоваться
        </button>
      </div>
    </>
  );
};

export default AuthPage;
