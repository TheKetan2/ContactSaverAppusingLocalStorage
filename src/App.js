import React, { useState, useEffect } from "react";
import "./style.css";
const App = () => {
  const [allusers, setAllusers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(null);

  const handleName = e => {
    setName(e.target.value);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const save = e => {
    e.preventDefault();
    let newUsers = {
      id: Math.floor(Math.random() * 100000),
      name: name,
      email: email
    };
    localStorage.setItem("users", JSON.stringify([...allusers, newUsers]));
    setAllusers(allusers.concat(newUsers));
    console.log("Localstorage:", JSON.parse(localStorage.getItem("users")));
  };

  const setForUpdate = user => {
    setName(user.name);
    setEmail(user.email);
    setId(user.id);
  };

  const update = e => {
    e.preventDefault();
    let modifiedData = allusers.map(user => {
      if (user.id === id) {
        return { ...user, name: name, email: email };
      }
      return user;
    });

    setAllusers(modifiedData);
    localStorage.setItem("users", JSON.stringify(modifiedData));
    setId(null);
  };
  useEffect(() => {
    console.log("Localstorage:", JSON.parse(localStorage.getItem("users")));
    if (localStorage.getItem("users")) {
      setAllusers(JSON.parse(localStorage.getItem("users")));
    }
  }, []);

  return (
    <div>
      <form>
        <input value={name} type="text" name="user" onChange={handleName} />
        <input value={email} type="text" name="email" onChange={handleEmail} />
        <button disabled={!(id == null)} onClick={save}>
          Save
        </button>
        <button disabled={id == null} onClick={update}>
          Update
        </button>
      </form>
      {allusers &&
        allusers.map(user => (
          <div className="userInfo">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <button onClick={() => setForUpdate(user)}>
              select for update
            </button>
          </div>
        ))}
    </div>
  );
};

export default App;
