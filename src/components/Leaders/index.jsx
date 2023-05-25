import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Leaders.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import FindSVG from "../Admins/img/Find.svg";
import axios from "../../axios";
import ArhiveSVG from "../Admins/img/Arhive.svg";
import Add_AdminSVG from "../Admins/img/Add_Admin.svg";
import CrosSVG from "../Admins/img/Cros.svg";
import { VKSVG, FASVG } from "../Profile/img/index";
import DarkFindSVG from "../Admins/img/DarkFind.svg";
import SaveSVG from "./img/Save.svg";
import NotificationSystem from "../Notif/index";
import { useEffect } from "react";

export const LeadersFull = ({ leaders }) => {
  const [findValue, setFindValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [fraction, setFraction] = useState("");
  const [rank, setRank] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [nick, setNick] = useState("");
  const [id, setId] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [forum, setForum] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [vk, setVk] = useState("");

  function handleFraction(event) {
    setFraction(event.target.value);
  }

  function handleRank(event) {
    setRank(event.target.value);
  }

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
  function handleFindValue(event) {
    setFindValue(event.target.value);
  }

  function handleShowMenu() {
    setShowMenu(!showMenu);
  }

  function findLeaders(item) {
    if (findValue !== "") {
      if (item.nick.toLowerCase().indexOf(findValue.toLowerCase()) !== -1) {
        return (
          <Link to={`https://lulu-bot.tech/profile/leader/${item.id}`}>
            <div className={clsx(styles.listrow)}>
              <img
                src={item.avatar}
                alt=""
                style={{ width: "5vh", height: "5vh", borderRadius: "50%" }}
              />
              <div className={clsx(styles.item)}>
                <p>{item.nick}</p>
              </div>
              <div className={clsx(styles.item)} style={{ marginLeft: "5vh" }}>
                <p>{item.fraction}</p>
              </div>
              <div className={clsx(styles.item)} style={{ marginLeft: "9vh" }}>
                <p>{item.rank}</p>
              </div>
              <div className={clsx(styles.item)} style={{ marginLeft: "8vh" }}>
                <p>{item.strwarn}/3</p>
              </div>
              <div className={clsx(styles.item)}>
                <Link to={item.vk}>
                  <img
                    src={VKSVG}
                    alt=""
                    style={{
                      width: "5vh",
                      height: "5vh",
                      marginTop: "1.2vh",
                      marginLeft: "16.3vh",
                    }}
                  />
                </Link>
              </div>
              <div className={clsx(styles.item)}>
                <Link to={item.forum}>
                  <img
                    src={FASVG}
                    alt=""
                    style={{
                      width: "5vh",
                      height: "5vh",
                      marginTop: "1.2vh",
                      marginLeft: "16.5vh",
                    }}
                  />
                </Link>
              </div>
            </div>
          </Link>
        );
      } else {
        return null;
      }
    } else {
      return (
        <Link to={`https://lulu-bot.tech/profile/leader/${item.id}`}>
          <div className={clsx(styles.listrow)}>
            <img
              src={item.avatar}
              alt=""
              style={{ width: "5vh", height: "5vh", borderRadius: "50%" }}
            />
            <div className={clsx(styles.item)}>
              <p>{item.nick}</p>
            </div>
            <div className={clsx(styles.item)} style={{ marginLeft: "5vh" }}>
              <p>{item.fraction}</p>
            </div>
            <div className={clsx(styles.item)} style={{ marginLeft: "9vh" }}>
              <p>{item.rank}</p>
            </div>
            <div className={clsx(styles.item)} style={{ marginLeft: "8vh" }}>
              <p>{item.strwarn}/3</p>
            </div>
            <div className={clsx(styles.item)}>
              <Link to={item.vk}>
                <img
                  src={VKSVG}
                  alt=""
                  style={{
                    width: "5vh",
                    height: "5vh",
                    marginTop: "1.2vh",
                    marginLeft: "16.3vh",
                  }}
                />
              </Link>
            </div>
            <div className={clsx(styles.item)}>
              <Link to={item.forum}>
                <img
                  src={FASVG}
                  alt=""
                  style={{
                    width: "5vh",
                    height: "5vh",
                    marginTop: "1.2vh",
                    marginLeft: "16.5vh",
                  }}
                />
              </Link>
            </div>
          </div>
        </Link>
      );
    }
  }

  function sortLeaders(leaders) {
    leaders.sort(function(a, b) {
      if (a.rank < b.rank) {
        return -1;
      }
      if (a.rank > b.rank) {
        return 1;
      }
      // If the ranks are equal, sort by the first character of the nickname
      if (a.rank === b.rank) {
        if (a.nick && b.nick && a.nick.charAt(0) < b.nick.charAt(0)) {
          return -1;
        }
        if (a.nick && b.nick && a.nick.charAt(0) > b.nick.charAt(0)) {
          return 1;
        }
      }
      return 0;
    });
    return leaders;
  }
  
  const sortedLeaders = sortLeaders(leaders);
  const leaderItems = sortedLeaders.map((item) => findLeaders(item));

  function registerLeader(nick, id, rank, fraction, reason, date, forum, vk) {
    if (
      nick !== "" &&
      id !== "" &&
      rank !== "" &&
      fraction !== "" &&
      reason !== "" &&
      date !== "" &&
      forum !== "" &&
      vk !== ""
    ) {
      const dataAdd = {
        nick: nick,
        id: id,
        rank: rank,
        fraction: fraction,
        reason: reason,
        date: date,
        forum: forum,
        vk: vk,
      };
      axios.defaults.withCredentials = true;
      axios
        .post(`/register/leader`, dataAdd, { credentials: "include" })
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
      .get(`/profile/`, { credentials: "include" })
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
                Список лидеров
                <p style={{ fontWeight: "700" }}>(Всего: {leaders.length})</p>
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
            {data.lvl > 2 && data.active ? (
              <Link to="/leaders/archive">
                <img src={ArhiveSVG} alt="" />
              </Link>
            ) : (
              <></>
            )}
            {data.lvl > 2 && data.active ? (
              <img src={Add_AdminSVG} alt="" onClick={handleShowMenu} />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={clsx(styles.secondrow)}>
          <div className={clsx(styles.item)} style={{ paddingLeft: "9.2vh" }}>
            <p>Ник</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "20vh" }}>
            <p>Фракция</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>Должность</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>Выговоры</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>ВК</p>
          </div>
          <div className={clsx(styles.item)} style={{ paddingLeft: "30vh" }}>
            <p>Форум</p>
          </div>
        </div>
        {leaderItems}
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
                  <p>РЕГИСТРАЦИЯ</p>
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
                    <p>Должность</p>
                    <select
                      value={rank}
                      onChange={handleRank}
                      style={
                        data.theme === "1"
                          ? { backgroundColor: "#22242b" }
                          : { backgroundColor: "white" }
                      }
                    >
                      <option value=""></option>
                      <option value="Лидер">Лидер</option>
                      <option value="Заместитель">Заместитель</option>
                      <option value="Министр">Министр</option>
                    </select>
                  </div>
                  <div>
                    <p>Фракция</p>
                    <select
                      value={fraction}
                      onChange={handleFraction}
                      style={
                        data.theme === "1"
                          ? { backgroundColor: "#22242b" }
                          : { backgroundColor: "white" }
                      }
                    >
                      <option value=""></option>
                      <option style={{ color: "gray" }} value="">
                        МЮ
                      </option>
                      <option value="Полиция ЛС">Полиция ЛС</option>
                      <option value="Полиция СФ">Полиция СФ</option>
                      <option value="Полиция ЛВ">Полиция ЛВ</option>
                      <option value="Полиция РК">Полиция РК</option>
                      <option value="ФБР">ФБР</option>
                      <option style={{ color: "gray" }} value="">
                        Пра-во
                      </option>
                      <option value="Правительство">Правительство</option>
                      <option value="Центр Лицензирования">
                        Центр Лицензирования
                      </option>
                      <option style={{ color: "gray" }} value="">
                        МО
                      </option>
                      <option value="Армия ЛС">Армия ЛС</option>
                      <option value="Армия СФ">Армия СФ</option>
                      <option value="ТСР">ТСР</option>
                      <option style={{ color: "gray" }} value="">
                        МЗ
                      </option>
                      <option value="Больница ЛС">Больница ЛС</option>
                      <option value="Больница ЛВ">Больница ЛВ</option>
                      <option style={{ color: "gray" }} value="">
                        СМИ
                      </option>
                      <option value="Радиоцентр ЛС">Радиоцентр ЛС</option>
                      <option style={{ color: "gray" }} value="">
                        Министры
                      </option>
                      <option value="Кабинет Министров">
                        Кабинет Министров
                      </option>
                      <option value="Министр Финансов">Министр Финансов</option>
                      <option value="Министр Обороны">Министр Обороны</option>
                      <option value="Министр Юстиции">Министр Юстиции</option>
                      <option value="Министр Здравоохранения">
                        Министр Здравоохранения
                      </option>
                      <option style={{ color: "gray" }} value="">Банды</option>
                      <option value="Grove Street">Grove Street</option>
                      <option value="The Ballas">The Ballas</option>
                      <option value="Los Santos Vagos">Los Santos Vagos</option>
                      <option value="The Rifa">The Rifa</option>
                      <option value="Night Wolves">Night Wolves</option>
                      <option value="Varios Los Aztecas">Varios Los Aztecas</option>
                      <option style={{ color: "gray" }} value="">Мафии</option>
                      <option value="Warlock MC">Warlock MC</option>
                      <option value="Yakuza">Yakuza</option>
                      <option value="Russian Mafia">Russian Mafia</option>
                    </select>
                  </div>
                  <div>
                    <p>Назначение</p>
                    <select
                      value={reason}
                      onChange={handleReason}
                      style={
                        data.theme === "1"
                          ? { backgroundColor: "#22242b" }
                          : { backgroundColor: "white" }
                      }
                    >
                      <option value=""></option>
                      <option value="Собеседование">Собеседование</option>
                      <option value="Доверенное лицо">Доверенное лицо</option>
                      <option value="Из состава">Из состава</option>
                      <option value="Отчет">Отчет</option>
                      <option value="Выборы">Выборы</option>
                      <option value="Кабинет Министров">
                        Кабинет Министров
                      </option>
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
                    src={SaveSVG}
                    alt=""
                    onClick={() =>
                      registerLeader(
                        nick,
                        id,
                        rank,
                        fraction,
                        reason,
                        date,
                        forum,
                        vk
                      )
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
