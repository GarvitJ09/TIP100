import React, { useEffect, useRef, useState } from "react";
import {
  FaList,
  FaUserSecret,
  FaBullhorn,
  FaArrowLeft,
  FaArrowRight,
  FaPowerOff,
} from "react-icons/fa";

const style = {
  message: `flex items-center shadow-xl   py-2   rounded-tl-full rounded-tr-full`,
  name: `absolute mt-[-4rem] text-gray-600 text-xs`,
  sent: `bg-[#395dff] text-black flex-row-reverse text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full`,
};

const Message = ({ message }) => {
  const [time, setTime] = useState(Date.now());
  const [name, setName] = useState("You");
  const dummy = useRef();
  useEffect(() => {
    if (message.idTo === "POLICE") setName("Tipper");
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const messageClass =
    message.idFrom === "POLICE" ? `${style.sent}` : `${style.received}`;

  return (
    <div>
      <div className={`${style.message} ${messageClass}`}>
        <p className={style.name}>{name}</p>
        <p>
          <FaUserSecret />
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default Message;
