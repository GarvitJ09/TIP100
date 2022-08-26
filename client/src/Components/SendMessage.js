import React, { useState } from "react";
import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const style = {
  form: `h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0`,
  input: `w-full text-xl p-3 bg-gray-900  outline-none border-none`,
  button: `w-[20%] bg-green-500`,
};

const SendMessage = ({ uid, collec, id, scroll }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(input);
    if (input === "") {
      alert("Please enter a valid message");
      return;
    }
    try {
      await setDoc(doc(db, collec, uid + " - POLICE - " + id), {
        idFrom: "POLICE",
      });
      await addDoc(
        collection(
          db,
          collec,
          uid + " - POLICE - " + id,
          uid + " - POLICE - " + id
        ),
        {
          content: input,
          idFrom: "POLICE",
          idTo: uid,
          timestamp: Date.now(),
          type: 0,
        }
      );
    } catch (err) {
      console.log(err);
    }
    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <form onSubmit={sendMessage} className={style.form}>
        <input
          value={input}
          onChange={handleChange}
          className={style.input}
          type="text"
          placeholder="Message"
          style={{ float: "right", margin: "3px" }}
        />
        <button onClick={sendMessage} className="btn ${style.button}">
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
