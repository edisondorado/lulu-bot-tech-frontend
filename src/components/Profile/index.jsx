import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import styles from "./Profile.module.scss";
import moment from 'moment';
import {
  EditSVG,
  FASVG,
  VKSVG,
  HistorySVG,
  CrosSVG,
  SaveSVG,
} from "./img/index";
import axios from "../../axios";
import { useParams } from "react-router-dom";

export const FullProfile = ({
  idprofile,
  nick,
  lvlprofile,
  avatar,
  lvl_color,
  name_lvl,
  typeAdminprofile,
  addTypeAdminprofile,
  reason,
  preds,
  dateSet,
  dateUp,
  daysinactive,
  minusday,
  minusrep,
  plusrep,
  forumlink,
  vklink,
  inactive,
  blat,
  accessFrom,
  theme
}) => {
  const [history, setHistory] = useState();
  const [isHistoryLoading, setHistoryLoading] = useState(true);
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`/profile/admin/history/${idprofile}`, { credentials: "include" })
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
  const [lvl, setlvl] = useState("");
  const [typeAdmin, settypeAdmin] = useState("");
  const [fromSort, setfromSort] = useState("");
  const [toSort, settoSort] = useState("");
  const [addTypeAdmin, setaddTypeAdmin] = useState("");
  const [active, setactive] = useState("");
  const [from_inactive, setfrom_inactive] = useState("");
  const [to_inactive, setto_inactive] = useState("");
  const [pluspred, setpluspred] = useState("");
  const [minuspred, setminuspred] = useState("");
  const [plusblat, setplusblat] = useState();
  const [giveminusdays, setgiveminusdays] = useState();
  const [takeminusdays, settakeminusdays] = useState();
  const [giveplusrep, setgiveplusrep] = useState();
  const [takeplusrep, settakeplusrep] = useState();
  const [giveminusrep, setgiveminusrep] = useState();
  const [takeminusrep, settakeminusrep] = useState();
  const [minusblat, setminusblat] = useState();
  const [undaysinactive, setundaysinactive] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [stopinactive, setstopinactive] = useState("");
  const { id } = useParams();

  function handlegiveminusrep(event) {
    setgiveminusrep(event.target.value);
  }

  function handletakeminusrep(event) {
    settakeminusrep(event.target.value);
  }

  function handlegiveplusrep(event) {
    setgiveplusrep(event.target.value);
  }

  function handletakeplusrep(event) {
    settakeplusrep(event.target.value);
  }

  function handleGiveminusdays(event) {
    setgiveminusdays(event.target.value);
  }

  function handleTakeminusdays(event) {
    settakeminusdays(event.target.value);
  }

  function handlePlusblat(event) {
    setplusblat(event.target.value);
  }

  function handleMinusblat(event) {
    setminusblat(event.target.value);
  }

  function handlePluspred(event) {
    setpluspred(event.target.value);
  }

  function handleMinuspred(event) {
    setminuspred(event.target.value);
  }

  function handleUndaysInactive(event) {
    setundaysinactive(event.target.value);
  }

  const handleChangeToInactive = (event) => {
    setto_inactive(event.target.value);
  };

  const handleChangefromSort = (event) => {
    setfromSort(event.target.value);
  };

  const handleChangetoSort = (event) => {
    settoSort(event.target.value);
  };

  const handleChangeFromInactive = (event) => {
    setfrom_inactive(event.target.value);
  };

  function handleSelectlvl(event) {
    setlvl(event.target.value);
  }

  function handleChangeStopInactive(event) {
    setstopinactive(event.target.value);
  }

  function handleSelecttypeadmin(event) {
    settypeAdmin(event.target.value);
  }

  function handleSelectaddTypeAdmin(event) {
    setaddTypeAdmin(event.target.value);
  }

  function handleSelectTypeSort(event) {
    setselectedTypeSort(event.target.value);
  }

  function showPopup() {
    setShowMenu(!showMenu);
  }

  function handleEditActive(event) {
    setactive(event.target.value);
  }

  function checkDate(date){
    const setFrom = new Date(fromSort)
    const setTo = new Date(toSort)
    const dateString = date.split(' ')[0];
    const newdate = moment(dateString, 'DD.MM.YYYY').toDate();
    console.log(`newdate ${newdate}`)
    console.log(`setFrom ${setFrom}`)
    console.log(`setTo ${setTo}`)
    if (newdate >= setFrom && newdate <= setTo) {
      console.log("true")
      return true
    } else {
      console.log("false")
      return false
    }
  }

  function parseTypeSort(item){
    // console.log(selectedTypeSort === item.type)
    if(fromSort !== "" && toSort !== ""){
      if (selectedTypeSort !== ""){
        if(selectedTypeSort === item.type){
          const include = checkDate(item.time);
          if(include) return (
            <p>{item.time} | {item.text}</p>
          );
        }
      } else{
        const include = checkDate(item.time);
        if(include) return (
          <p>{item.time} | {item.text}</p>
        );
      }
    } else if(selectedTypeSort !== ""){
      if(selectedTypeSort === item.type){
        console.log(true)
        return (
          <p>{item.time} | {item.text}</p>
        );
      }
    } else {
      return (
        <p>{item.time} | {item.text}</p>
      );
    }
  }

  function handleEditProfile() {
    const dataEdit = {
      stopinactive: stopinactive,
      lvl: lvl,
      typeAdmin: typeAdmin,
      active: active,
      addTypeAdmin: addTypeAdmin,
      from_inactive: from_inactive,
      to_inactive: to_inactive,
      pluspred: pluspred,
      minuspred: minuspred,
      takeinactive: undaysinactive,
      plusblat: plusblat,
      minusblat: minusblat,
      giveminusday: giveminusdays,
      takeminusday: takeminusdays,
      giveplusrep: giveplusrep,
      takeplusrep: takeplusrep,
      giveminusrep: giveminusrep,
      takeminusrep: takeminusrep,
    };
    axios.defaults.withCredentials = true;
    axios
      .post(`/api/edit/admin/${id}`, dataEdit, { credentials: "include" })
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
      <div className={clsx( theme === "1" ? styles.main : styles.light_main)}>
        <div className={clsx(styles.left_profile)}>
          <div className={clsx(styles.profile)}>
            <img src={avatar} alt="" className={clsx(styles.avatar)} style={{marginRight: '0.7vh'}} />
            <p style={{ display: "flex", flexDirection: "row"}}>
              {nick}
              <p style={{ color: "gray", marginLeft: "1vh" }}>
                {inactive === true ? "[Неактив]" : ""}
              </p>
            </p>
            <div className={clsx(styles.additional)} style={accessFrom ? {marginLeft: '4vh'} : {marginLeft: '0vh'}}>
              <div
                className={clsx(styles.admin)}
                style={{ backgroundColor: `${lvl_color}`}}
              >
                <p>{name_lvl}</p>
              </div>
              { accessFrom ? <img
                src={EditSVG}
                alt=""
                style={{ width: "3.5vh", cursor: "pointer" }}
                onClick={showPopup}
              /> : <></>}
            </div>
          </div>
          <div className={clsx(styles.info)}>
            <div className={clsx(styles.info_full)}>
              <div className={clsx(styles.detail_info)}>
                <p>Должность</p>
                <p>{typeAdminprofile}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Доп.Должность</p>
                <p>{addTypeAdminprofile}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Тип назначения</p>
                <p>{reason}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Выговоры</p>
                <p>{preds}/3</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Дата назначения</p>
                <p>{dateSet}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Последнее повышение</p>
                <p>{dateUp}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Дни неактива</p>
                <p>{daysinactive}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Минус дни</p>
                <p>{minusday}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Минус к репе</p>
                <p>{minusrep}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Плюс к репе</p>
                <p>{plusrep}</p>
              </div>
              <div className={clsx(styles.detail_info)}>
                <p>Блат. дни</p>
                <p>{blat}</p>
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
              <a href={forumlink} target="_blank" rel="noopener noreferrer">
                <img src={FASVG} alt="" style={{ width: "6vh" }} />
              </a>
              <a href={vklink} target="_blank" rel="noopener noreferrer">
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
                  style={ theme === "1" ? { backgroundColor: "#22242b" } : { backgroundColor: "white" }}
                >
                  <option value="">Выберите тип сортировки</option>
                  <option value=""></option>
                  <option value="Регистрация">Регистрация</option>
                  <option value="Смена должности">Смена должности</option>
                  <option value="Снятие с администратора">Снятие с администратора</option>
                  <option value="Смена доп.должности">Смена доп.должности</option>
                  <option value="Изменение уровня">Изменение уровня</option>
                  <option value="Выдача выговора">Выдача выговора</option>
                  <option value="Снятие администратора">Снятие администратора</option>
                  <option value="Снятие выговора">Снятие выговора</option>
                  <option value="Выдача неактива">Выдача неактива</option>
                  <option value="Снятие дней неактива">Снятие дней неактива</option>
                  <option value="Отмена актуального неактива">Отмена актуального неактива</option>
                  <option value="Выдача блатного дня">Выдача блатного дня</option>
                  <option value="Снятие блатного дня">Снятие блатного дня</option>
                  <option value="Выдача минус дней">Выдача минус дней</option>
                  <option value="Снятие минус дней">Снятие минус дней</option>
                  <option value="Выдача плюс к репутации">Выдача плюс к репутации</option>
                  <option value="Снятие плюс к репутации">Снятие плюс к репутации</option>
                  <option value="Выдача минус к репутации">Выдача минуск репутации</option>
                  <option value="Снятие минус к репутации">Снятие минус к репутации</option>
                </select>
              </div>
              <div className={clsx(styles.fromSort)}>
                <p>Период от</p>
                <input type="date" value={fromSort} onChange={handleChangefromSort} />
              </div>
              <div className={clsx(styles.toSort)}>
                <p>Период до</p>
                <input type="date" value={toSort} onChange={handleChangetoSort}/>
              </div>
            </div>
            <div className={clsx(styles.main_history)} style={{display: "flex", flexDirection: "column"}}>
              {!isHistoryLoading ? 
              history.map(item => (
                parseTypeSort(item)
              ))
              : <></>}
            </div>
          </div>
        </div>
      </div>
      <div>
        {showMenu &&
          ReactDOM.createPortal(
            <div className={clsx(styles.popup_menu_container)}>
              <div className={clsx(styles.popup_menu_overlay)} />
              <div className={clsx( theme === "1" ? styles.popup_menu : styles.light_popup_menu)}>
                <div className={clsx(styles.header)}>
                  <p>Редактирование</p>
                  <img src={CrosSVG} alt="" onClick={showPopup} />
                </div>
                <div className={clsx(styles.main_popup)}>
                  <div className={clsx(styles.row)}>
                    <div className={clsx(styles.typeAdmin)}>
                      <p>Должность</p>
                      <select
                        value={typeAdmin}
                        onChange={handleSelecttypeadmin}
                        style={ theme === "1" ? { backgroundColor: "#22242b" } : { backgroundColor: "white" }}
                      >
                        <option value="">Выберите должность</option>
                        <option value=""></option>
                        <option value="Тех.Администратор">Тех.Администратор</option>
                        <option value="Следящий за хелперами">
                          Следящий за хелперами
                        </option>
                        <option value="ГС за Частными">ГС за Частными</option>
                        <option value="ГС Нелегалов">ГС Нелегалов</option>
                        <option value="ГС Гос.Структур">ГС Гос.Структур</option>
                        <option value="ЗГС Гос.Структур">
                          ЗГС Гос.Структур
                        </option>
                        <option value="Помощник Тех.Адм.">
                          Помощник Тех.Адм.
                        </option>
                        <option value="ГС Пра-во">ГС Пра-во</option>
                        <option value="ЗГС Пра-во">ЗГС Пра-во</option>
                        <option value="Следящий Пра-во">Следящий Пра-во</option>
                        <option value="ГС МЮ">ГС МЮ</option>
                        <option value="ЗГС МЮ">ЗГС МЮ</option>
                        <option value="Следящий МЮ">Следящий МЮ</option>
                        <option value="ГС МЗ">ГС МЗ</option>
                        <option value="ЗГС МЗ">ЗГС МЗ</option>
                        <option value="Следящий МЗ">Следящий МЗ</option>
                        <option value="ГС МО">ГС МО</option>
                        <option value="ЗГС МО">ЗГС МО</option>
                        <option value="Следящий МО">Следящий МО</option>
                        <option value="ГС СМИ">ГС СМИ</option>
                        <option value="ГС ТСР">ГС ТСР</option>
                        <option value="ГС Гетто">ГС Гетто</option>
                        <option value="ЗГС Гетто">ЗГС Гетто</option>
                        <option value="Следящий Гетто">Следящий Гетто</option>
                        <option value="ГС Мафии">ГС Мафии</option>
                        <option value="ЗГС Мафии">ЗГС Мафии</option>
                        <option value="Следящий Мафии">Следящий Мафии</option>
                        <option value="Следящий Част.МЗ">
                          Следящий Част.МЗ
                        </option>
                        <option value="Следящий Част.Нелегал">
                          Следящий Част.Нелегал
                        </option>
                        <option value="Следящий Част.СМИ">
                          Следящий Част.СМИ
                        </option>
                        <option value="Следящий Част.СК">
                          Следящий Част.СК
                        </option>
                        <option value="Репорт">Репорт</option>
                        <option value="Хелпер">Хелпер</option>
                      </select>
                    </div>
                    <div className={clsx(styles.lvl)}>
                      <p>Уровень</p>
                      <select
                        value={lvl}
                        onChange={handleSelectlvl}
                        style={ theme === "1" ? { backgroundColor: "#22242b" } : { backgroundColor: "white" }}
                      >
                        <option value="">Выберите уровень</option>
                        <option value=""></option>
                        <option value="5">[5] Куратор</option>
                        <option value="4">[4] Администратор</option>
                        <option value="3">[3] Старший модератор</option>
                        <option value="2">[2] Модератор</option>
                        <option value="1">[1] Младший модератор</option>
                      </select>
                    </div>
                    <div className={clsx(styles.addtypeAdmin)}>
                      <p>Доп. Должность</p>
                      <select
                        value={addTypeAdmin}
                        onChange={handleSelectaddTypeAdmin}
                        style={ theme === "1" ? { backgroundColor: "#22242b" } : { backgroundColor: "white" }}
                      >
                        <option value="">Выберите доп.должность</option>
                        <option value=""></option>
                        <option value="ГС за Серв.МП">ГС за Серв.МП</option>
                        <option value="ГС за Жалобами">ГС за Жалобами</option>
                        <option value="ГС за Слетами">ГС за Слетами</option>
                        <option value="ЗГС за Слетами">ЗГС за Слетами</option>
                        <option value="Руководство Группы VK">
                          Руководство Группы VK
                        </option>
                        <option value="Студент Мафии">Студент Мафии</option>
                        <option value="Студент Гетто">Студент Гетто</option>
                        <option value="-">-</option>
                      </select>
                    </div>
                  </div>
                  <div className={clsx(styles.row)}>
                    <div className={clsx(styles.givepred)}>
                      <p>Выдать выговор</p>
                      <input
                        type="text"
                        name=""
                        id=""
                        value={pluspred}
                        onChange={handlePluspred}
                        placeholder="Введите причину"
                      />
                    </div>
                    <div className={clsx(styles.resign)}>
                      <p>Снять админа</p>
                      <input
                        type="text"
                        name=""
                        value={active}
                        onChange={handleEditActive}
                        id=""
                        placeholder="Введите причину"
                      />
                    </div>
                    <div className={clsx(styles.takepred)}>
                      <p>Снять выговор</p>
                      <input
                        type="text"
                        name=""
                        id=""
                        value={minuspred}
                        onChange={handleMinuspred}
                        placeholder="Введите причину"
                      />
                    </div>
                  </div>
                  <div className={clsx(styles.row)}>
                    <div className={clsx(styles.inactive)}>
                      <p>Выдать неактив(От)</p>
                      <input
                        type="date"
                        name=""
                        id=""
                        value={from_inactive}
                        onChange={handleChangeFromInactive}
                        style={{ width: "33vh" }}
                      />
                    </div>
                    <div className={clsx(styles.inactive)}>
                      <p>Выдать неактив(До)</p>
                      <input
                        type="date"
                        name=""
                        id=""
                        value={to_inactive}
                        onChange={handleChangeToInactive}
                        style={{ width: "33vh" }}
                      />
                    </div>
                  </div>
                  <div className={clsx(styles.row)}>
                    <div className={clsx(styles.undaysinactive)}>
                      <p>Снять дни неактива</p>
                      <input
                        type="number"
                        name=""
                        id=""
                        value={undaysinactive}
                        onChange={handleUndaysInactive}
                        placeholder="Введите кол-во"
                        style={{ width: "33vh" }}
                      />
                    </div>
                    <div className={clsx(styles.stopinactive)}>
                      <p>Закончить актуальный неактив</p>
                      <input
                        type="text"
                        name=""
                        id=""
                        value={stopinactive}
                        onChange={handleChangeStopInactive}
                        placeholder="Введите причину"
                        style={{ width: "33vh" }}
                      />
                    </div>
                  </div>
                  <div className={clsx(styles.block)}>
                    <div className={clsx(styles.block_detail)}>
                      <p>Выдать блат.день</p>
                      <input
                        type="number"
                        placeholder="Введите кол-во"
                        value={plusblat}
                        onChange={handlePlusblat}
                      />
                      <p>Снять блат.день</p>
                      <input
                        type="number"
                        placeholder="Введите кол-во"
                        value={minusblat}
                        onChange={handleMinusblat}
                      />
                    </div>
                    <div className={clsx(styles.block_detail)}>
                      <p>Выдать минус дни</p>
                      <input
                        type="number"
                        placeholder="Введите кол-во"
                        value={giveminusdays}
                        onChange={handleGiveminusdays}
                      />
                      <p>Снять минус дни</p>
                      <input
                        type="number"
                        placeholder="Введите кол-во"
                        value={takeminusdays}
                        onChange={handleTakeminusdays}
                      />
                    </div>
                  </div>
                  <div className={clsx(styles.block)}>
                    <div className={clsx(styles.block_detail)}>
                      <p>Выдать плюс к репе</p>
                      <input
                        type="number"
                        placeholder="Введите кол-во"
                        value={giveplusrep}
                        onChange={handlegiveplusrep}
                      />
                      <p>Снять плюс к репе</p>
                      <input
                        type="number"
                        placeholder="Введите кол-во"
                        value={takeplusrep}
                        onChange={handletakeplusrep}
                      />
                    </div>
                    <div className={clsx(styles.block_detail)}>
                      <p>Выдать минус к репе</p>
                      <input
                        type="number"
                        placeholder="Введите кол-во"
                        value={giveminusrep}
                        onChange={handlegiveminusrep}
                      />
                      <p>Снять минус к репе</p>
                      <input
                        type="number"
                        placeholder="Введите кол-во"
                        value={takeminusrep}
                        onChange={handletakeminusrep}
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
