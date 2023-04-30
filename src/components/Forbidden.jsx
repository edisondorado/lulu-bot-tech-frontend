import React from "react";
import "../styles/app.css";
import { Link } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="auth-container">
      <Link to="http://localhost:3001/auth">
        <button>Авторизоваться</button>
      </Link>
    </div>
  );
};

export default AuthPage;
