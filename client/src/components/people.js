import React, { useState, useEffect } from "react";
import { fetchUsers, handleFollow } from "../api.js/services";
import Badge from "../assets/media/badge.svg";
function People(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
  }, []);
  return (
    <div className="mt-users mt-people-box">
      <h1>Who to follow</h1>
      {users && users.length > 0 ? (
        users.map((user) => (
          <div className="mt-peroples">
            <div className="mt-peoples-profile">
              <img src={user.userProfile} alt={user.username} />
            </div>
            <div className="mt-peoples-details">
              <div className="mt-username-badge">
                <p>{user.fullName}</p>
                <img src={Badge} alt="" />
              </div>
              <p>@{user.username}</p>
            </div>
            <div className="mt-peoples-profile">
              <button
                id={user.isFollowing}
                onClick={(e) => handleFollow(e, user.receiverId)}
              >
                {user.isFollowing}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p id="mt-no-post">No Users Found</p>
      )}
    </div>
  );
}

export default People;
