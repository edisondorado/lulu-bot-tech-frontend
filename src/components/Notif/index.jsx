import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Notif.module.scss";

const Notification = ({ message, success, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [visibleAnim, setVisibleAnim] = useState(false);

  useEffect(() => {
    setVisible(true);
    setVisibleAnim(true);

    const timeout = setTimeout(() => {
      onClose();
      setVisibleAnim(false);
    }, 5000);
    const newTimeout = setTimeout(() => {
      setVisible(false);
    }, 4300);

    return () => {
      clearTimeout(timeout);
      clearTimeout(newTimeout);
    };
  }, [message, onClose]);
  console.log(success);
  return (
    <>
      {visible && (
        <div
          className={clsx(
            visibleAnim
              ? styles.notification_visible
              : styles.notification_invisible
          )}
          style={success ? {borderBottom: '1px solid green'} : {borderBottom: '1px solid red'}}
        >
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
