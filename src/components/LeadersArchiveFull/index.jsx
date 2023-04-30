import React, { useState } from "react";
import styles from "./Archive.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { VKSVG, FASVG } from "../Profile/img/index";
import FindSVG from "./img/Find.svg";
import axios from "../../axios";
import { useEffect } from "react";

export const LeadersArchiveFull = ({ admins }) => {
  const [findValue, setFindValue] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setLoading] = useState(true);
  admins.sort(function (a, b) {
    return b.lvl - a.lvl;
  });
  function handleFindValue(event) {
    setFindValue(event.target.value);
  }
  function findLeaders(item) {
    if (findValue !== "") {
      if (item.nick.indexOf(findValue) !== -1) {
        return (
          <Link to={`http://localhost:3000/profile/leader/${item.id}`}>
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
        <Link to={`http://localhost:3000/profile/leader/${item.id}`}>
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
                <img src={VKSVG} alt="" style={{width: "5vh", height: "5vh", marginTop: "1.2vh", marginLeft: "16.3vh"}} />
              </Link>
            </div>
            <div className={clsx(styles.item)}>
              <Link to={item.forum}>
                <img src={FASVG} alt="" style={{width: "5vh", height: "5vh", marginTop: "1.2vh", marginLeft: "32.5vh"}} />
              </Link>
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
        // window.location = "http://localhost:3000/";
      });
  }, []);
  return (
    <div
      className={clsx(
        data.theme === "1" ? styles.fullpage : styles.light_fullpage
      )}
    >
      <div className={clsx(styles.firstrow)}>
        <div className={clsx(styles.left_column)}>
          <div className={clsx(styles.amountAdm)}>
            <p>
              Список лидеров в архиве
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
              <p
                style={
                  data.theme === "1" ? { color: "white" } : { color: "white" }
                }
              >
                Лидеры
              </p>
            </div>
          </Link>
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
      {admins.map((item) => findLeaders(item))}
    </div>
  );
};
