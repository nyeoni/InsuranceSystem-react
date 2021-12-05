import React, { useEffect, useState } from "react";
import apiAxios from "../apiAxios";

function Profile({ user }) {
  const { email, password, name } = user || {
    email: "None",
    password: "None",
    name: "None",
  };
  const [time, setTime] = useState(null);
  const [info, setInfo] = useState({
    id: "",
    name: "",
    age: "",
  });

  function TimeToPrint(time) {
    setTime(time);
  }

  function setiingInfo(data) {
    setInfo({
      ...info,
      name: data,
    });
  }

  useEffect(() => {
    setTime(null);

    apiAxios("/test/save", setiingInfo);
  }, []);

  return (
    <>
      <h1>Profile</h1>
      <dt>Email</dt>
      <dd>{email}</dd>
      <dt>Password</dt>
      <dd>{password}</dd>
      <dt>Name</dt>
      <dd>{name}</dd>
      <dt>Info</dt>
      <dd>{info.name}</dd>
    </>
  );
}

export default Profile;
