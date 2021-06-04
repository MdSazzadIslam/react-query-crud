import React from "react";
import { Link } from "react-router-dom";
const ListRow = ({ users, deleteHandler }) => {
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
            className="btn"
            value="Delete"
            onClick={(e) => deleteHandler(user._id)}
          />
          <Link
            className="btn"
            to={{
              pathname: "/user",
              query: {
                id: user._id,
                name: user.name,
                country: user.country,
                profession: user.profession,
                email: user.email,
              },
            }}
          >
            Edit
          </Link>
        </td>
      </tr>
    );
  });

  return <>{userData}</>;
};

export default ListRow;
