import React, { useState } from "react";
import ListRow from "../components/ListRow";
import { useQuery, useMutation, useQueryClient } from "react-query";
import userService from "../services/userService";
import Loader from "../components/Loader";
import "./UserList.css";
const UserList = () => {
  const queryCache = useQueryClient();
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const fetchUsers = async () => {
    const res = await userService.getUser();
    setUsers(res.data);
    return res;
  };

  const { status, isError } = useQuery("users", fetchUsers);

  const mutation = useMutation(async (id) => await userService.deleteUser(id), {
    onSuccess: async () => {
      await queryCache.invalidateQueries("users");
      console.log("success");
    },
    onError: () => {
      console.log("Unsuccessfull");
    },
  });

  const deleteHandler = async (id) => {
    const res = await mutation.mutateAsync(id);

    if (res !== undefined) {
      setMsg(res.data.msg);
    } else {
      setErr("Unsuccessfull");
    }

    setDisabled(false);
  };
  return (
    <>
      {status === "loading" && <Loader />}
      {isError === true && (
        <div className="error">
          <span style={{ color: "red", textAlign: "center" }}>
            Something went wrong
          </span>
        </div>
      )}
      <span style={{ textAlign: "center", color: "red" }}>{msg}</span>
      {err !== "" ? (
        <div className="error">
          <span style={{ color: "red", textAlign: "center" }}>
            {JSON.stringify(err)}
          </span>
        </div>
      ) : null}

      <div className="center">
        <h6>Total {users.length} records found</h6>
        <div className="table-responsive">
          <table class="table">
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
              <ListRow
                users={users}
                deleteHandler={(e) => deleteHandler(e)}
                disabled={disabled}
              />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserList;
