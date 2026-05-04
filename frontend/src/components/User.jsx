import React from "react";

const User = ({ user }) => {
  return (
    <>
      <li key={user.id} className="username-active">
        {user.username}
      </li>
    </>
  );
};

export default User;
