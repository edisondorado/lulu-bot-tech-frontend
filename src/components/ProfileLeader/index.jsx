import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import styles from "./ProfileLeader.module.scss";
import moment from "moment";
import {
  EditSVG,
  FASVG,
  VKSVG,
  HistorySVG,
  CrosSVG,
  SaveSVG,
} from "../Profile/img/index";
import axios from "../../axios";
import { useParams } from "react-router-dom";

export const FullProfileLeader = ({
  idprofile,
  selfid,
  nick,
  avatar,
  rank,
  fraction,
  reason,
  ustwarn,
  strwarn,
  city,
  age,
  dateSet,
  forum,
  vk,
  active,
  theme,
  accessFrom,
  discord
}) => {
  const [history, setHistory] = useState();
  const [isHistoryLoading, setHistoryLoading] = useState(true);
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/profile/leader/history/${idprofile}`, { credentials: "include" })
      .then((res) => {
        setHistory(res.data);
        setHistoryLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        window.location = "http://localhost:3000/";
      });
  }, [idprofile]);
  const [selectedTypeSort, setselectedTypeSort] = useState("");
  const [fromSort, setfromSort] = useState("");
  const [toSort, settoSort] = useState("");
  const [isActive, setActive] = useState("");
  const [rankFront, setRankFront] = useState("");
  const [fractionFront, setFractionFront] = useState("");
  const [reasonFront, setReasonFront] = useState("");
  const [dateSetFront, setDateSetFront] = useState("");
  const [strwarnFront, setStrwarnFront] = useState("");
  const [ustwarnFront, setUstwarnFront] = useState("");
  const [unstrwarnFront, setUnstrwarnFront] = useState("");
  const [unustwarnFront, setUnustwarnFront] = useState("");
  const [nickEdit, setNickEdit] = useState("");
  const [ageFront, setAgeFront] = useState();
  const [cityFront, setCityFront] = useState("");
  const [discordFront, setDiscordFront] = useState("");
  const [vkFront, setVkFront] = useState("");
  const [forumFront, setForumFront] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { id } = useParams();

  function handleSelectRank(event) {
    setRankFront(event.target.value);
  }

  function handleSelectFraction(event) {
    setFractionFront(event.target.value);
  }

  function handleSelectReasonFront(event) {
    setReasonFront(event.target.value);
  }

  function handleSelectDateSetFront(event) {
    setDateSetFront(event.target.value);
  }

  function handleStrwarnFront(event) {
    setStrwarnFront(event.target.value);
  }

  function handleEditActive(event) {
    setActive(event.target.value);
  }

  function handleUstwarnFront(event) {
    setUstwarnFront(event.target.value);
  }

  function handleUnstrwarnFront(event) {
    setUnstrwarnFront(event.target.value);
  }

  function hanldeUnustwarnFront(event) {
    setUnustwarnFront(event.target.value);
  }

  function handleNickEdit(event) {
    setNickEdit(event.target.value);
  }

  function handleAgeFront(event) {
    setAgeFront(event.target.value);
  }

  function handleCityFront(event) {
    setCityFront(event.target.value);
  }

  function handleDiscordFront(event) {
    setDiscordFront(event.target.value);
  }

  function handleVkFront(event) {
    setVkFront(event.target.value);
  }

  function handleForumFront(event) {
    setForumFront(event.target.value);
  }

  const handleChangefromSort = (event) => {
    setfromSort(event.target.value);
  };

  const handleChangetoSort = (event) => {
    settoSort(event.target.value);
  };

  function handleSelectTypeSort(event) {
    setselectedTypeSort(event.target.value);
  }

  function showPopup() {
    setShowMenu(!showMenu);
  }

  function checkDate(date) {
    const setFrom = new Date(fromSort);
    const setTo = new Date(toSort);
    const dateString = date.split(" ")[0];
    const newdate = moment(dateString, "DD.MM.YYYY").toDate();
    console.log(`newdate ${newdate}`);
    console.log(`setFrom ${setFrom}`);
    console.log(`setTo ${setTo}`);
    if (newdate >= setFrom && newdate <= setTo) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

  function parseTypeSort(item) {
    // console.log(selectedTypeSort === item.type)
    if (fromSort !== "" && toSort !== "") {
      if (selectedTypeSort !== "") {
        if (selectedTypeSort === item.type) {
          const include = checkDate(item.time);
          if (include)
            return (
              <p>
                {item.time} | {item.text}
              </p>
            );
        }
      } else {
        const include = checkDate(item.time);
        if (include)
          return (
            <p>
              {item.time} | {item.text}
            </p>
          );
      }
    } else if (selectedTypeSort !== "") {
      if (selectedTypeSort === item.type) {
        console.log(true);
        return (
          <p>
            {item.time} | {item.text}
          </p>
        );
      }
    } else {
      return (
        <p>
          {item.time} | {item.text}
        </p>
      );
    }
  }

  function handleEditProfile() {
    const dataEdit = {
      rank: rankFront,
      fraction: fractionFront,
      reason: reasonFront,
      dateSet: dateSetFront,
      resign: isActive,
      strwarn: strwarnFront,
      ustwarn: ustwarnFront,
      unstrwarn: unstrwarnFront,
      unustwarn: unustwarnFront,
      nick: nickEdit,
      age: ageFront,
      city: cityFront,
      discord: discordFront,
    };
    axios.defaults.withCredentials = true;
    axios
      .post(`/api/edit/leader/${id}`, dataEdit, { credentials: "include" })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.warn(err);
        setShowMenu(!showMenu);
      });
  }

  return (
    <>
      <div className={clsx(theme === "1" ? styles.main : styles.light_main)}>
        <div className={clsx(styles.left_profile)}>
          <div className={clsx(styles.profile)}>
            <img
              src={avatar}
              alt=""
              className={clsx(styles.avatar)}
              style={{ marginRight: "0.7vh" }}
            />
            <p style={{ display: "flex", flexDirection: "row" }}>{nick}</p>
            <div
              className={clsx(styles.additional)}
              style={accessFrom ? { marginLeft: "4vh" } : { marginLeft: "0vh" }}
            >
              <div
                className={clsx(styles.admin)}
                style={{ backgroundColor: `#5155ff` }}
              >
                <p>{rank}</p>
              </div>
              {accessFrom ? (
                <img
                  src={EditSVG}
                  alt=""
                  style={{ width: "3.5vh", cursor: "pointer" }}
                  onClick={showPopup}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={clsx(styles.info)}>
            <div className={clsx(styles.info_full)}>
              <div className={clsx(styles.detail_info)}>
                <p>Должность</p>
                <p>{rank}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Фракция</p>
                <p>{fraction}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Тип назначения</p>
                <p>{reason}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Строгие выговоры</p>
                <p>{strwarn}/3</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Устные выговоры</p>
                <p>{ustwarn}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Дата постановления</p>
                <p>{dateSet}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Город</p>
                <p>{city}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Возраст</p>
                <p>{age}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Дискорд</p>
                <p>{discord}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.right_profile)}>
          <div className={clsx(styles.buttons)}>
            <div className={clsx(styles.left_buttons)}>
              <img src={HistorySVG} alt="" style={{ width: "20vh" }} />
            </div>
            <div className={clsx(styles.right_buttons)}>
              <a href={forum} target="_blank" rel="noopener noreferrer">
                <img src={FASVG} alt="" style={{ width: "6vh" }} />
              </a>
              <a href={vk} target="_blank" rel="noopener noreferrer">
                <img src={VKSVG} alt="" style={{ width: "6vh" }} />
              </a>
            </div>
          </div>
          <div className={clsx(styles.history)}>
            <div className={clsx(styles.sort)}>
              <div className={clsx(styles.typeSort)}>
                <p>Тип</p>
                <select
                  value={selectedTypeSort}
                  onChange={handleSelectTypeSort}
                  style={
                    theme === "1"
                      ? { backgroundColor: "#22242b" }
                      : { backgroundColor: "white" }
                  }
                >
                  <option value="">Выберите тип сортировки</option>
                  <option value=""></option>
                  <option value="Изменение должности">Изменение должности</option>
                  <option value="Изменение фракции">Изменение фракции</option>
                  <option value="Изменение причины постановления">Изменение причины постановления</option>
                  <option value="Смена даты назначения">Смена даты назначения</option>
                  <option value="Снятие лидера">Снятие лидера</option>
                  <option value="Выдача строгих выговоров">Выдача строгих выговоров</option>
                  <option value="Выдача устных выговоров">Выдача устных выговоров</option>
                  <option value="Снятие строгих выговоров">Снятие строгих выговоров</option>
                  <option value="Снятие устных выговоров">Снятие устных выговоров</option>
                  <option value="Смена никнейма">Смена никнейма</option>
                  <option value="Смена возраста">Смена возраста</option>
                  <option value="Смена города">Смена города</option>
                  <option value="Смена дискорда">Смена дискорда</option>
                </select>
              </div>
              <div className={clsx(styles.fromSort)}>
                <p>Период от</p>
                <input
                  type="date"
                  value={fromSort}
                  onChange={handleChangefromSort}
                />
              </div>
              <div className={clsx(styles.toSort)}>
                <p>Период до</p>
                <input
                  type="date"
                  value={toSort}
                  onChange={handleChangetoSort}
                />
              </div>
            </div>
            <div
              className={clsx(styles.main_history)}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {!isHistoryLoading ? (
                history.map((item) => parseTypeSort(item))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {showMenu &&
          ReactDOM.createPortal(
            <div className={clsx(styles.popup_menu_container)}>
              <div className={clsx(styles.popup_menu_overlay)} />
              <div
                className={clsx(
                  theme === "1" ? styles.popup_menu : styles.light_popup_menu
                )}
              >
                <div className={clsx(styles.header)}>
                  <p>Редактирование</p>
                  <img src={CrosSVG} alt="" onClick={showPopup} />
                </div>
                <div className={clsx(styles.main_popup)}>
                  <div className={clsx(styles.row)}>
                    <div className={clsx(styles.rank)}>
                      <p>Должность</p>
                      <select
                        value={rankFront}
                        onChange={handleSelectRank}
                        style={
                          theme === "1"
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
                    <div className={clsx(styles.fraction)}>
                      <p>Фракция</p>
                      <select
                        value={fractionFront}
                        onChange={handleSelectFraction}
                        style={
                          theme === "1"
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
                        <option value="Министр Финансов">
                          Министр Финансов
                        </option>
                        <option value="Министр Обороны">Министр Обороны</option>
                        <option value="Министр Юстиции">Министр Юстиции</option>
                        <option value="Министр Здравоохранения">
                          Министр Здравоохранения
                        </option>
                      </select>
                    </div>
                    <div className={clsx(styles.reasonFront)}>
                      <p>Назначение</p>
                      <select
                        value={reasonFront}
                        onChange={handleSelectReasonFront}
                        style={
                          theme === "1"
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
                  </div>
                  <div className={clsx(styles.row)}>
                    <div className={clsx(styles.dateSetFront)}>
                      <p>Дата назначения</p>
                      <input
                        type="date"
                        name=""
                        id=""
                        style={{ width: "30vh" }}
                        value={dateSetFront}
                        onChange={handleSelectDateSetFront}
                      />
                    </div>
                    <div className={clsx(styles.resign)}>
                      <p>Снять</p>
                      <input
                        type="input"
                        name=""
                        placeholder="Введите причину"
                        id=""
                        style={{ width: "30vh" }}
                        value={isActive}
                        onChange={handleEditActive}
                      />
                    </div>
                  </div>
                  <div className={clsx(styles.block)}>
                    <div className={clsx(styles.block_detail)}>
                      <p>Выдать выговор</p>
                      <input
                        type="text"
                        placeholder="Введите причину"
                        value={strwarnFront}
                        onChange={handleStrwarnFront}
                      />
                      <p>Выдать предупреждение</p>
                      <input
                        type="text"
                        placeholder="Введите причину"
                        value={ustwarnFront}
                        onChange={handleUstwarnFront}
                      />
                    </div>
                    <div className={clsx(styles.block_detail)}>
                      <p>Снять выговор</p>
                      <input
                        type="text"
                        placeholder="Введите причину"
                        value={unstrwarnFront}
                        onChange={handleUnstrwarnFront}
                      />
                      <p>Снять предупреждение</p>
                      <input
                        type="text"
                        placeholder="Введите причину"
                        value={unustwarnFront}
                        onChange={hanldeUnustwarnFront}
                      />
                    </div>
                  </div>
                  <div className={clsx(styles.block)}>
                    <div className={clsx(styles.block_detail)}>
                      <p>Ник</p>
                      <input
                        type="text"
                        placeholder="Введите ник"
                        value={nickEdit}
                        onChange={handleNickEdit}
                      />
                      <p>Возраст</p>
                      <input
                        type="number"
                        placeholder="Введите число"
                        value={ageFront}
                        onChange={handleAgeFront}
                      />
                    </div>
                    <div className={clsx(styles.block_detail)}>
                      <p>Город проживания</p>
                      <input
                        type="text"
                        placeholder="Введите город"
                        value={cityFront}
                        onChange={handleCityFront}
                      />
                      <p>Дискорд</p>
                      <input
                        type="text"
                        placeholder="Введите логин"
                        value={discordFront}
                        onChange={handleDiscordFront}
                      />
                    </div>
                  </div>
                  <div className={clsx(styles.row)}>
                    <div className={clsx(styles.forum)}>
                      <p>Ссылка на форум</p>
                      <input
                        type="text"
                        name=""
                        placeholder="Введите ссылку"
                        id=""
                        style={{ width: "30vh" }}
                        value={forumFront}
                        onChange={handleForumFront}
                      />
                    </div>
                    <div className={clsx(styles.vk)}>
                      <p>Ссылка на ВКонтакте</p>
                      <input
                        type="input"
                        name=""
                        placeholder="Введите ссылку"
                        id=""
                        style={{ width: "30vh" }}
                        value={vkFront}
                        onChange={handleVkFront}
                      />
                    </div>
                  </div>
                </div>
                <div className={clsx(styles.footer)}>
                  <img src={SaveSVG} alt="" onClick={handleEditProfile} />
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </>
  );
};
