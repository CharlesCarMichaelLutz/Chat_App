import React from "react";
import User from "./User";

const UserList = ({ userList }) => {
  return (
    <>
      <aside className="sidebar">
        <h2 className="users-title">Users</h2>
        <ul className="user-list">
          {userList.map((user) => (
            <User user={user} />
          ))}
        </ul>
      </aside>
    </>
  );
};

export default UserList;
