import React, { useState } from "react";
import axios from "axios";
import Countries from "../components/Countries";
import validate from "../helpers/validate";
import userService from "../services/userService";
import Loader from "../components/Loader";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import "./User.css";

const User = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [profession, setProfession] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [disabled, setDisabled] = useState("");
  const [msg, setMsg] = useState("");

  const history = useHistory();

  const fetchCountries = async () => {
    const res = await axios.get(process.env.REACT_APP_API_COUNTRIES);
    setCountries(res.data);
    if (history.location.state !== undefined) {
      console.log(history.location.state);
      setId(history.location.state._id);
      setName(history.location.state.name);
      setCountry(history.location.state.country);
      setProfession(history.location.state.profession);
      setEmail(history.location.state.email);
      setExperience(history.location.state.experience);
    }
    return res;
  };

  const { status, isError } = useQuery("countries", fetchCountries);

  const addMutation = useMutation(
    async (inputs) => await userService.saveUser(inputs),
    {
      onSuccess: () => {
        console.log("Save success");
      },

      onError: () => {
        console.log("Save unsuccessfull");
      },
    }
  );

  const updateMutation = useMutation(
    async (inputs) => await userService.updateUser(inputs),
    {
      onSuccess: () => {
        console.log("Update success");
      },

      onError: () => {
        console.log("Update Unsuccessfull");
      },
    }
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    debugger;
    if (name && country && profession && experience && email) {
      try {
        setDisabled(true);

        const inputs = {
          name: name,
          country: country,
          profession: profession,
          experience: experience,
          email: email,
          id: id,
        };

        const validation = await validate(inputs);

        debugger;
        if (
          validation.name !== undefined ||
          validation.country !== undefined ||
          validation.profession !== undefined ||
          validation.experience !== undefined ||
          validation.email !== undefined
        ) {
          if (validation.name) {
            setErr(validation.name);
            return;
          }
          if (validation.country) {
            setErr(validation.country);
            return;
          }
          if (validation.email) {
            setErr(validation.email);
            return;
          }
          if (validation.profession) {
            setErr(validation.profession);
            return;
          }
          if (validation.experience) {
            setErr(validation.experience);
            return;
          }
          setDisabled(false);
          return;
        } else {
          debugger;
          setErr("");

          const res = id
            ? await updateMutation.mutateAsync(inputs)
            : await addMutation.mutateAsync(inputs);

          if (res !== undefined) {
            setMsg(res.data.msg);
            clearData();
            setDisabled(false);
            return id ? history.push("/") : "";
          } else {
            setErr("Unsuccessfull");
          }

          setDisabled(false);
        }
      } catch (err) {
        setErr(err);
        setDisabled(false);
      }
    }
  };

  const clearData = () => {
    setName("");
    setCountry("");
    setEmail("");
    setExperience("");
    setProfession("");
  };

  const countryHandler = (cName) => {
    setCountry(cName);
  };

  return (
    <>
      {status === "loading" && <Loader />}
      {isError === true && (
        <div className="error">
          <span style={{ color: "red", textAlign: "center" }}>{err}</span>
        </div>
      )}

      <div className="user">
        <h3> Add</h3>
        <span style={{ textAlign: "center", color: "red" }}>{msg}</span>
        {err !== "" ? (
          <div className="error">
            <span style={{ color: "red", textAlign: "center" }}>
              {JSON.stringify(err)}
            </span>
          </div>
        ) : null}
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Write your name here..."
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="setCountry">Country</label>
            <Countries
              countries={countries || []}
              onChange={(e) => countryHandler(e)}
              placeholder="Select you country"
              className="form-control"
              value={country}
            />
          </div>

          <div className="form-group">
            <label htmlFor="profession">Profession</label>
            <input
              type="text"
              className="form-control"
              id="profession"
              placeholder="Write your profession here..."
              required
              name="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="language">Experience</label>
            <input
              type="number"
              className="form-control"
              id="experience"
              placeholder="Write your year of experience here..."
              required
              name="Year of experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              name="email"
              value={email}
              placeholder="Write your email here..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={disabled}>
            {id ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </>
  );
};

export default User;
