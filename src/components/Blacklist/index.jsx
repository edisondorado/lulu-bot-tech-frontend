import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Blacklist.module.scss";
import clsx from "clsx";
import FindSVG from "../Admins/img/Find.svg";
import axios from "../../axios";
import { VKSVG, FASVG, TrashSVG } from "../Profile/img/index";
import Add_AdminSVG from "../Admins/img/Add_Admin.svg";
import CrosSVG from "../Admins/img/Cros.svg";
import AddSVG from "../Admins/img/Add.svg";
import DarkFindSVG from "../Admins/img/DarkFind.svg";
import NotificationSystem from "../Notif/index";
import { useEffect } from "react";

export const BlacklistFull = ({ Blacklist }) => {
  const [findValue, setFindValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [nick, setNick] = useState("");
  const [ip, setIp] = useState("");
  const [email, setEmail] = useState("");
  const [forum, setForum] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [vk, setVk] = useState("");

  function handleIp(event) {
    setIp(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  const handleNotificationClick = (message) => {
    setShowNotification(true);
    setNotificationMessage(message);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  function handleSetForum(event) {
    setForum(event.target.value);
  }

  function handleSetVk(event) {
    setVk(event.target.value);
  }

  function handleSetNick(event) {
    setNick(event.target.value);
  }

  function handleFindValue(event) {
    setFindValue(event.target.value);
  }

  function handleShowMenu() {
    setShowMenu(!showMenu);
  }

  function findAdmin(item) {
    if (findValue !== "") {
      if (item.nick.indexOf(findValue) !== -1) {
        return (
          <div className={clsx(styles.listrow)}>
            <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
              <p>{item.nick}</p>
            </div>
            <div className={clsx(styles.item)} style={{ paddingLeft: "30vh", paddingTop: "2.2vh", width: "4vh", height: '4vh' }}>
              <a href={item.forum}>
                <img src={FASVG} alt="" />
              </a>
            </div>
            <div className={clsx(styles.item)} style={{ paddingLeft: "30vh", paddingTop: "2.2vh", width: "4vh", height: '4vh' }}>
              <a href={item.vk}>
                <img src={VKSVG} alt="" />
              </a>
            </div>
            <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
              <p>{item.ip}</p>
            </div>
            <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
              <p>{item.email}</p>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className={clsx(styles.listrow)}>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>{item.nick}</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh", paddingTop: "2.2vh", width: "4vh", height: '4vh' }}>
            <a href={item.forum}>
              <img src={FASVG} alt="" />
            </a>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh", paddingTop: "2.2vh", width: "4vh", height: '4vh' }}>
            <a href={item.vk}>
              <img src={VKSVG} alt="" />
            </a>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>{item.ip}</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>{item.email}</p>
          </div>
        </div>
      );
    }
  }

  function registerAdmin(nick, email, forum, ip, vk) {
    if (nick !== "" && email !== "" && forum !== "" && ip !== "" && vk !== "") {
      const dataAdd = {
        nick: nick,
        ip: ip,
        forum: forum,
        vk: vk,
        email: email,
      };
      axios.defaults.withCredentials = true;
      axios
        .post(`/blacklist`, dataAdd, { credentials: "include" })
        .then((res) => {
          if (res.data.message === "User already exist") {
            handleNotificationClick("Пользователь с данным ID уже существует.");
          } else if (res.data.message === "Success") {
            handleNotificationClick("Пользователь успешно создан.");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        })
        .catch((err) => {
          console.warn(err);
          // window.location.reload();
        });
    } else {
      handleNotificationClick("Вы ввели не всю информаци. Заполните все поля");
    }
  }

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/profile/admin`, { credentials: "include" })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location = "https://lulu-bot.tech/";
      });
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      {showNotification && (
        <NotificationSystem
          message={notificationMessage}
          onClose={handleNotificationClose}
        />
      )}
      <div
        className={clsx(
          data.theme === "1" ? styles.fullpage : styles.light_fullpage
        )}
      >
        <div className={clsx(styles.firstrow)}>
          <div className={clsx(styles.left_column)}>
            <div className={clsx(styles.amountAdm)}>
              <p>
                Список пидерастов
                <p style={{ fontWeight: "700" }}>
                  (Всего: {Blacklist.users.length})
                </p>
              </p>
            </div>
            <div className={clsx(styles.find_adm)}>
              <input
                type="text"
                placeholder="Поиск.."
                value={findValue}
                onChange={handleFindValue}
              />

              <img src={data.theme === "1" ? FindSVG : DarkFindSVG} alt="" />
            </div>
          </div>
          <div className={clsx(styles.right_column)}>
            <img src={Add_AdminSVG} alt="" onClick={handleShowMenu} />
          </div>
        </div>
        <div className={clsx(styles.secondrow)}>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>Ник</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>Форум</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>ВК</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>IP</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>Email</p>
          </div>
        </div>
        {Blacklist.users.map((item) => findAdmin(item))}
      </div>
      <div>
        {showMenu &&
          ReactDOM.createPortal(
            <div className={clsx(styles.popup_menu_container)}>
              <div className={clsx(styles.popup_menu_overlay)} />
              <div
                className={clsx(
                  data.theme === "1"
                    ? styles.popup_menu
                    : styles.light_popup_menu
                )}
              >
                <div className={clsx(styles.header)}>
                  <p>ЗАНЕСЕНИЕ</p>
                  <img src={CrosSVG} alt="" onClick={handleShowMenu} />
                </div>
                <div className={clsx(styles.main)}>
                  <div>
                    <p>Игровой ник</p>
                    <input
                      type="text"
                      placeholder="Введите ник"
                      value={nick}
                      onChange={handleSetNick}
                    />
                  </div>
                  <div>
                    <p>Форумный аккаунт</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      value={forum}
                      onChange={handleSetForum}
                      placeholder="Введите ссылку"
                    />
                  </div>
                  <div>
                    <p>ВКонтакте</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      value={vk}
                      onChange={handleSetVk}
                      placeholder="Введите ссылку"
                    />
                  </div>
                  <div>
                    <p>IP</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      value={ip}
                      onChange={handleIp}
                      placeholder="Введите IP"
                    />
                  </div>
                  <div>
                    <p>E-mail</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      value={email}
                      onChange={handleEmail}
                      placeholder="Введите почту"
                    />
                  </div>
                </div>
                <div className={clsx(styles.footer)}>
                  <img
                    src={AddSVG}
                    alt=""
                    onClick={() => registerAdmin(nick, email, forum, ip, vk)}
                  />
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </>
  );
};
