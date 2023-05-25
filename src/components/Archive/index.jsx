import React, { useState, useEffect, useContext } from "react";
import styles from "./Archive.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import FindSVG from "./img/Find.svg";
import axios from '../../axios'
import { ThemeContext } from '../../ThemeContext';

export const ArchiveFull = ({ admins }) => {
  const [findValue, setFindValue] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setLoading] = useState(true)
  const { theme: currentTheme } = useContext(ThemeContext);
  admins.sort(function (a, b) {
    return b.lvl - a.lvl;
  });
  function handleFindValue(event) {
    setFindValue(event.target.value);
  }
  function findAdmin(item) {
    if (findValue !== "") {
      if (item.nick.indexOf(findValue) !== -1) {
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
  return (
    <div className={clsx(currentTheme === "1" ? styles.fullpage : styles.light_fullpage)}>
      <div className={clsx(styles.firstrow)}>
        <div className={clsx(styles.left_column)}>
          <div className={clsx(styles.amountAdm)}>
            <p>
              Список администрации в архиве
              <p style={{ fontWeight: "700" }}>(Всего: {admins.length})</p>
            </p>
          </div>
          <div className={clsx(styles.find_adm)}>
            <input
              type="text"
              placeholder="Поиск.."
              value={findValue}
              onChange={handleFindValue}
            />
            <img src={FindSVG} alt="" />
          </div>
        </div>
        <div className={clsx(styles.right_column)}>
          <Link to="/admins">
            <div className={clsx(styles.admins)}>
              <p style={currentTheme === "1" ? {color: "white"} : {color: "white"}}>Администрация</p>
            </div>
          </Link>
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
      {(admins).map((item) => findAdmin(item))}
    </div>
  );
};
