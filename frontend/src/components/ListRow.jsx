import React from "react";
import { Link } from "react-router-dom";
const ListRow = ({ users, deleteHandler, disabled }) => {
  const userData = users.map((user) => {
    return (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.country}</td>
        <td>{user.profession}</td>
        <td>{user.experience}</td>
        <td>{user.email}</td>
        <td>
          <input
            type="button"
            className="button_btn"
            value="Delete"
            onClick={(e) => deleteHandler(user._id)}
            disabled={disabled}
          />
          <Link
            className="button_btn"
            to={{
              pathname: "/user",
              state: {
                _id: user._id,
                name: user.name,
                country: user.country,
                profession: user.profession,
                email: user.email,
                experience: user.experience,
              },
            }}
          >
            Edit
          </Link>
        </td>
      </tr>
    );
  });

  return <> {userData}</>;
};

export default ListRow;
