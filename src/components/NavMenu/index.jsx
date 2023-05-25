import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import moment from "moment";
import styles from "./NavMenu.module.scss";
import {
  ListSVG,
  ProfileSVG,
  NotifSVG,
  SettingsSVG,
  ExitSVG,
  CrosSVG,
  LightSVG,
  DarkSVG,
  MarkSVG,
  LightDarkSVG,
} from "./img/index";
import axios from "../../axios";
import { ThemeContext } from '../../ThemeContext';

export const NavMenu = ({ profile }) => {
  const [data, setData] = useState();
  const [leaderData, setLeaderData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [statusSettings, setStatusSettings] = useState(false);
  const [statusNotif, setStatusNotif] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  function handlerNotif() {
    setStatusNotif(!statusNotif);
  }

  function handlerSettings() {
    setStatusSettings(!statusSettings);
  }

  function handlerMenuIcon() {
    setStatusModal(!statusModal);
  }
  const selfHistory = [];
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/profile/admin`, { credentials: "include" })
      .then((res) => {
        setData(res.data);
        setLoading(false);
        console.log(res.data);
        if (res.data.lvl > 0 && res.data.active && res.data.lvl && res.data.history){
          try{
            res.data.history.map((item) => {
              if(item.time && item.text){
                if (parseTypeSort(item.time, item.text)) {
                  return selfHistory.push(`${item.time} | ${item.text}`);
                } else {
                  return null;
                }
              } else {
                return null;
              }
            }).filter(item => item !== null);            
          }catch(e){
            console.log(e);
          }
        }
      })
      .catch((err) => {
        console.warn(err);
        // window.location = "https://lulu-bot.tech/";
      });
  }, []);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/profile/leader`, { credentials: "include" })
      .then((res) => {
        setLeaderData(res.data);
        setLoading(false);
        if(res.data.history){
          try{
            res.data.history.map((item) => {
              if(item.time && item.text){
                if (parseTypeSort(item.time, item.text)) {
                  return selfHistory.push(`${item.time} | ${item.text}`);
                } else {
                  return null;
                }
              } else {
                return null;
              }
            }).filter(item => item !== null);
          } catch(e){
            console.log(e);
          }
        }
      })
      .catch((err) => {
        console.warn(err);
        // window.location = "https://lulu-bot.tech/";
      });
  }, []);

  function checkDate(date) {
    const dateString = date.split(" ")[0];
    const newdate = moment(dateString, "DD.MM.YYYY").toDate();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (newdate >= yesterday) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

  function parseTypeSort(time, text) {
    if (checkDate(time) === true) {
      return true;
    }
  }

  return (
    <>
      <div
        className={clsx(
          theme === "1"
            ? styles.navmenu
            : theme === "0"
            ? styles.light_navmenu
            : styles.navmenu
        )}
      >
        <div className={clsx(styles.navbar_left)}>
          <img
            src={ListSVG}
            alt=""
            style={{ width: "6.3vh", cursor: "pointer" }}
            className={clsx(styles.navicon)}
            onClick={handlerMenuIcon}
          />
          <Link to={isLoading === false && data && data.lvl && data.lvl > 0 && data.active ? `/profile/admin/${data.id}` : leaderData ? `/profile/leader/${leaderData.id}` : `/`}>
            <img
              src={ProfileSVG}
              alt=""
              style={{ width: "6.36vh" }}
              className={clsx(styles.navicon)}
            />
          </Link>
        </div>
        <div className={clsx(styles.navbar_right)}>
          <img
            src={SettingsSVG}
            alt=""
            style={{ width: "6.3vh" }}
            className={clsx(styles.navicon)}
            onClick={handlerSettings}
          />
          <img
            src={NotifSVG}
            alt=""
            style={{ width: "7.5vh" }}
            className={clsx(styles.navicon)}
            onClick={handlerNotif}
          />
          <a href="https//lulu-bot.tech/api/auth/logout">
            <img
              src={ExitSVG}
              alt=""
              style={{ width: "4.4vh" }}
              className={clsx(styles.exiticon)}
            />
          </a>
        </div>
      </div>
      {statusModal ? (
        <div
          className={clsx(
            theme === "1"
              ? styles.modal
              : theme === "0"
              ? styles.light_modal
              : styles.modal
          )}
          style={data.id === '566400714184851457' || data.id === '701440080111337513' ? {height: '15vh'} : {height: "10vh"}}
          
        >
          {data.active === true && data.lvl > 0 ? (
            <Link to="https://lulu-bot.tech/admins">
            <div className={clsx(styles.admins)}>
              <p>Список администрации</p>
            </div>
          </Link>
          ) : (
            <></>
          ) }
          {(data.active === true && data.fraction) || (data.active === true && data.lvl > 2) ? (
          <Link to="https://lulu-bot.tech/leaders">
            <div className={clsx(styles.leaders)}>
              <p>Список лидеров</p>
            </div>
          </Link>
          ) : (<></>)}
          {data.id === '566400714184851457' || data.id === '701440080111337513' ? (<Link to="https://lulu-bot.tech/blacklist">
            <div className={clsx(styles.leaders)}>
              <p>Список провинившихся</p>
            </div>
          </Link>) : (<></>)} 
        </div>
      ) : (
        <></>
      )}
      {statusNotif && !isLoading ? (
        <div
          className={clsx(
            theme === "1"
              ? styles.modal_popup
              : styles.light_modal_popup
          )}
        >
          {selfHistory.length !== 0 ? (
            <div className={clsx(styles.header)}>
              <p>Последние уведомления:</p>
              {selfHistory.map((item) => (
                <p>{item}</p>
              ))}
            </div>
          ) : (
            <p>Уведомлений нету</p>
          )}
        </div>
      ) : (
        <></>
      )}
      {statusSettings && !isLoading ? (
        <div
          className={clsx(
            theme === "1"
              ? styles.popup_menu_container
              : theme === "0"
              ? styles.light_popup_menu_container
              : styles.popup_menu_container
          )}
        >
          <div className={clsx(styles.popup_menu_overlay)} />
          <div
            className={clsx(
              theme === "1"
                ? styles.modal_settings
                : theme === "0"
                ? styles.light_modal_settings
                : styles.modal_settings
            )}
          >
            <div className={clsx(styles.header)}>
              <p>Настройки</p>
              <img src={CrosSVG} alt="" onClick={handlerSettings} />
            </div>
            <p>Переключение темы</p>
            <div className={clsx(styles.main)}>
              <img
                src={MarkSVG}
                alt=""
                style={
                  theme === "1"
                    ? { position: "absolute", marginLeft: "9vh" }
                    : { position: "absolute", marginLeft: "3vh" }
                }
              />{" "}
              <img
                src={LightSVG}
                alt=""
                onClick={toggleTheme}
                style={{ width: "4.5vh", height: "4.5vh" }}
              />
              <img
                src={theme === "1" ? DarkSVG : LightDarkSVG}
                alt=""
                onClick={toggleTheme}
                style={{ marginLeft: "1vh", width: "4.5vh", height: "4.5vh" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
