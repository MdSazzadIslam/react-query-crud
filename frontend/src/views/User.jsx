import React, { useState } from "react";
import "./User.css";

const User = ({ props }) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [profession, setProfession] = useState("");
  const [language, setLanguage] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form>
      <div className="container">
        <div className="user">
          <h3> Add</h3>
          <form>
            <div className="form-group">
              <label for="inputEmail">User</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name here..."
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                required
              />
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </form>
  );
};

export default User;
