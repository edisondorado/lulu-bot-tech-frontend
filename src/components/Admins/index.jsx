import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./AdminsFull.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import FindSVG from "./img/Find.svg";
import axios from "../../axios";
import ArhiveSVG from "./img/Arhive.svg";
import Add_AdminSVG from "./img/Add_Admin.svg";
import CrosSVG from "./img/Cros.svg";
import AddSVG from "./img/Add.svg";
import DarkFindSVG from "./img/DarkFind.svg";
import NotificationSystem from "../Notif/index";
import { ThemeContext } from '../../ThemeContext';

export const AdminsFull = ({ admins }) => {
  const [findValue, setFindValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [lvlAdmin, setlvlAdmin] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [nick, setNick] = useState("");
  const [id, setId] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [forum, setForum] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [vk, setVk] = useState("");
  const { theme: currentTheme } = useContext(ThemeContext);

  const handleNotificationClick = (message) => {
    setShowNotification(true);
    setNotificationMessage(message);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  function handleSetDate(event) {
    setDate(event.target.value);
  }

  function handleSetForum(event) {
    setForum(event.target.value);
  }

  function handleSetVk(event) {
    setVk(event.target.value);
  }

  function handleSetNick(event) {
    setNick(event.target.value);
  }
  function handleSetId(event) {
    setId(event.target.value);
  }

  function handleReason(event) {
    setReason(event.target.value);
  }
  function handleLvlAdmin(event) {
    setlvlAdmin(event.target.value);
  }
  function handleFindValue(event) {
    setFindValue(event.target.value);
  }

  function handleShowMenu() {
    setShowMenu(!showMenu);
  }

  function findAdmin(item) {
    if (findValue !== "") {
      if (item.nick.toLowerCase().indexOf(findValue.toLowerCase()) !== -1) {
        return (
          <Link to={`https://lulu-bot.tech/profile/admin/${item.id}`}>
            <div className={clsx(styles.listrow)}>
              <img
                src={item.avatar}
                alt=""
                style={{ width: "5vh", height: "5vh", borderRadius: "50%" }}
              />
              <div className={clsx(styles.item)}>
                <p>{item.nick}</p>
              </div>
              <div className={clsx(styles.item)}>
                <p>{item.lvl}</p>
              </div>
              <div className={clsx(styles.item)}>
                <p>{item.typeAdmin}</p>
              </div>
              <div className={clsx(styles.item)}>
                <p>{item.addTypeAdmin}</p>
              </div>
              <div className={clsx(styles.item)}>
                <p>{item.preds}/3</p>
              </div>
              <div className={clsx(styles.item)}>
                <p>{item.blat}</p>
              </div>
              <div className={clsx(styles.item)}>
                <p>{item.plusrep}</p>
              </div>
              <div className={clsx(styles.item)}>
                <p>{item.minusrep}</p>
              </div>
              <div className={clsx(styles.item)}>
                <p>{item.daysinactive}</p>
              </div>
              <div className={clsx(styles.item)}>
                <p>{item.to_inactive}</p>
              </div>
            </div>
          </Link>
        );
      }
    } else {
      return (
        <Link to={`https://lulu-bot.tech/profile/admin/${item.id}`}>
          <div className={clsx(styles.listrow)}>
            <img
              src={item.avatar}
              alt=""
              style={{ width: "5vh", height: "5vh", borderRadius: "50%" }}
            />
            <div className={clsx(styles.item)}>
              <p>{item.nick}</p>
            </div>
            <div className={clsx(styles.item)}>
              <p>{item.lvl}</p>
            </div>
            <div className={clsx(styles.item)}>
              <p>{item.typeAdmin}</p>
            </div>
            <div className={clsx(styles.item)}>
              <p>{item.addTypeAdmin}</p>
            </div>
            <div className={clsx(styles.item)}>
              <p>{item.preds}/3</p>
            </div>
            <div className={clsx(styles.item)}>
              <p>{item.blat}</p>
            </div>
            <div className={clsx(styles.item)}>
              <p>{item.plusrep}</p>
            </div>
            <div className={clsx(styles.item)}>
              <p>{item.minusrep}</p>
            </div>
            <div className={clsx(styles.item)}>
              <p>{item.daysinactive}</p>
            </div>
            <div className={clsx(styles.item)}>
              <p>{item.to_inactive}</p>
            </div>
          </div>
        </Link>
      );
    }
  }

  function registerAdmin(nick, id, lvlAdmin, reason, date, forum, vk) {
    if (
      nick !== "" &&
      id !== "" &&
      lvlAdmin !== "" &&
      reason !== "" &&
      date !== "" &&
      forum !== "" &&
      vk !== ""
    ) {
      const dataAdd = {
        nick: nick,
        id: id,
        lvl: lvlAdmin,
        reason: reason,
        date: date,
        forum: forum,
        vk: vk,
      };
      axios.defaults.withCredentials = true;
      axios
        .post(`/register/admin`, dataAdd, { credentials: "include" })
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
        // window.location = "https://lulu-bot.tech/";
      });
  }, []);

  admins.users.sort(function (a, b) {
    return b.lvl - a.lvl;
  });

  if (isLoading) {
    return <div style={{ backgroundColor: "#17191f", width: "100%", height: "100vh" }}></div>;
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
          currentTheme === "1" ? styles.fullpage : styles.light_fullpage
        )}
      >
        <div className={clsx(styles.firstrow)}>
          <div className={clsx(styles.left_column)}>
            <div className={clsx(styles.amountAdm)}>
              <p>
                Список администрации
                <p style={{ fontWeight: "700" }}>
                  (Всего: {admins.users.length})
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

              <img src={currentTheme === "1" ? FindSVG : DarkFindSVG} alt="" />
            </div>
          </div>
          <div className={clsx(styles.right_column)}>
            {data.accessAdm === true ? (
              <div>
                <Link to="/admins/archive">
                  <img src={ArhiveSVG} alt="" />
                </Link>
                <img src={Add_AdminSVG} alt="" onClick={handleShowMenu} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={clsx(styles.secondrow)}>
          <div className={clsx(styles.item)} style={{ paddingLeft: "9.2vh" }}>
            <p>Ник</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "6vh" }}>
            <p>Уровень</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "4.5vh" }}>
            <p>Должность</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "2.7vh" }}>
            <p>Доп.Должность</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "2vh" }}>
            <p>Выговоры</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "1vh" }}>
            <p>Блат.День</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: ".5vh" }}>
            <p>+Репа</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: ".5vh" }}>
            <p>-Репа</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "1vh" }}>
            <p>Дни неактива</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "0vh" }}>
            <p>Неактив до</p>
          </div>
        </div>
        {admins.users.map((item) => findAdmin(item))}
      </div>
      <div>
        {showMenu &&
          ReactDOM.createPortal(
            <div className={clsx(styles.popup_menu_container)}>
              <div className={clsx(styles.popup_menu_overlay)} />
              <div
                className={clsx(
                  currentTheme === "1"
                    ? styles.popup_menu
                    : styles.light_popup_menu
                )}
              >
                <div className={clsx(styles.header)}>
                  <p>РЕГИСТРАЦИЯ АДМИНА</p>
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
                    <p>ID Discord</p>
                    <input
                      type="number"
                      placeholder="Введите ID"
                      value={id}
                      onChange={handleSetId}
                    />
                  </div>
                  <div>
                    <p>Уровень Администратора</p>
                    <select
                      value={lvlAdmin}
                      onChange={handleLvlAdmin}
                      style={
                        currentTheme === "1"
                          ? { backgroundColor: "#22242b" }
                          : { backgroundColor: "white" }
                      }
                    >
                      <option value=""></option>
                      <option value="5">[5] Куратор</option>
                      <option value="4">[4] Администратор</option>
                      <option value="3">[3] Старший модератор</option>
                      <option value="2">[2] Модератор</option>
                      <option value="1">[1] Младший модератор</option>
                    </select>
                  </div>
                  <div>
                    <p>Назначение</p>
                    <select
                      value={reason}
                      onChange={handleReason}
                      style={
                        currentTheme === "1"
                          ? { backgroundColor: "#22242b" }
                          : { backgroundColor: "white" }
                      }
                    >
                      <option value=""></option>
                      <option value="Обзвон">Обзвон</option>
                      <option value="Лидерка">Лидерка</option>
                      <option value="Восстановление">Восстановление</option>
                      <option value="Перевод">Перевод</option>
                    </select>
                  </div>
                  <div>
                    <p>Дата назначения</p>
                    <input
                      type="date"
                      name=""
                      id=""
                      value={date}
                      onChange={handleSetDate}
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
                </div>
                <div className={clsx(styles.footer)}>
                  <img
                    src={AddSVG}
                    alt=""
                    onClick={() =>
                      registerAdmin(nick, id, lvlAdmin, reason, date, forum, vk)
                    }
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
