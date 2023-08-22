import React, { useState, useEffect } from "react";
import Badge from "../assets/media/badge.svg";
import { fetchFollowingUsers, handleUnfollow } from "../api.js/services";
function Following(props) {
  const [followingUsers, setFollowingUsers] = useState([]);
  useEffect(() => {
    fetchFollowingUsers()
      .then((data) => {
        console.log(data);
        setFollowingUsers(data);
      })
      .catch((error) => {
        console.log("Error fetching following users:", error);
      });
  }, []);
  return (
    <div>
      {followingUsers && followingUsers.length > 0 ? (
        <div className="mt-users">
          {followingUsers.map((el) => {
            const user = el.receiverId;

            return (
              <div className="mt-peroples">
                <div className="mt-peoples-profile">
                  <img src={user.userProfile} alt={user.username} />
                </div>
                <div className="mt-peoples-details">
                  <div className="mt-username-badge">
                    <p>{user.fullName}</p>
                    <img src={Badge} alt="" />
                  </div>
                  <p>@{user.email}</p>
                </div>
                <div className="mt-peoples-profile">
                  <button
                    id={user.isFollowing}
                    onClick={(e) => handleUnfollow(e, user._id)}
                  >
                    Unfollow
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-no-post text-center mt-5">No Users Found</p>
      )}
    </div>
  );
}

export default Following;
