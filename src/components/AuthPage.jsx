import React from "react";
import styles from "./styles/Auth.module.scss";
import clsx from "clsx";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AuthPage = () => {
  return (
    <>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <div className={clsx(styles.auth_container)}>
        <Link to="http://localhost:3001/auth">
          <button className={clsx(styles.my_button)}>Авторизоваться</button>
        </Link>
      </div>
    </>
  );
};

export default AuthPage;
