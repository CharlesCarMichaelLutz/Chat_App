import React from "react";

const UserList = ({ userList }) => {
  return (
    <>
      <aside className="sidebar">
        <h2 className="users-title">Users</h2>
        <ul className="user-list">
          {userList.map((user) => (
            <li className="username-active" key={user.userId}>
              {user.username}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default UserList;
