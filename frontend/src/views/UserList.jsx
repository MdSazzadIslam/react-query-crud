import React, { useState } from "react";
import ListRow from "../components/ListRow";
import { useQuery } from "react-query";
import userService from "../services/userService";
import Loader from "../components/Loader";
import "./UserList.css";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const res = await userService.getUser();
    setUsers(res.data);
    return res;
  };

  const { status, isError } = useQuery("users", fetchUsers);
  const deleteHandler = (id) => {
    console.log(id);
  };
  return (
    <div className="container">
      <div className="center">
        {status === "loading" && <Loader />}
        {isError === true && (
          <div className="error">
            <span style={{ color: "red", textAlign: "center" }}>
              Something went wrong
            </span>
          </div>
        )}
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Profession</th>
              <th>Experience</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <ListRow users={users} deleteHandler={deleteHandler} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
