import React, { useState, useEffect } from "react";
import Badge from "../assets/media/badge.svg";
import Upvote from "../assets/media/upvote.svg";
import Downvote from "../assets/media/downvote.svg";
import Edit from "../assets/media/edit.svg";
import Delete from "../assets/media/delete.svg";
import EditPost from "./editPost";
import {
  fetchData,
  handleVote,
  username,
  handleDeletePost,
} from "../api.js/services";

function Posts(props) {
  const [userPosts, setUserPosts] = useState([]);
  const handleShow = (postId) => {
    const model = document.getElementById(postId);
    model.style.display = "block";
  };

  const handleClose = (postId) => {
    const model = document.getElementById(postId);
    model.style.display = "none";
  };
  useEffect(() => {
    fetchData()
      .then((data) => {
        setUserPosts(data);
      })
      .catch((error) => {
        console.log("Error fetching user posts:", error);
      });
  }, []);
  return (
    <>
      {userPosts && userPosts.length > 0 ? (
        userPosts.map((post) => (
          <div className="mt-user-post" key={post._id}>
            <div className="mt-user-personal-details">
              <div className="mt-user-personal-image">
                <img src={post.userProfile} alt={post.fullName} />
              </div>
              <div className="mt-user-username">
                <p>{post.fullName}</p>
                <p>
                  <img src={Badge} alt={post.fullName} />
                </p>
                <p>@{post.username}</p>
                <p></p>
              </div>
            </div>
            <div className="mt-user-post-details">
              <p>{post.postQuestion}</p>
              {post.postImage !== null && (
                <img src={post.postImage} alt="post" />
              )}
            </div>
            <div>
              <img
                src={Upvote}
                className="img-thumbnail"
                onClick={() => handleVote(post._id, true)}
              />
              <span className="mx-1 fs-5">{post.upvotes}</span>
              <img
                src={Downvote}
                className="img-thumbnail"
                onClick={() => handleVote(post._id, false)}
              />
              <span className="mx-1 fs-5">{post.downvotes}</span>
              {username?.toLowerCase() === post.username?.toLowerCase() && (
                <>
                  <img
                    src={Edit}
                    className="img-thumbnail"
                    onClick={() => handleShow(post._id)}
                    key={post._id}
                  />
                  <img
                    src={Delete}
                    className="img-thumbnail"
                    onClick={() => handleDeletePost(post._id)}
                  />
                </>
              )}
            </div>

            <EditPost
              handleClose={handleClose}
              postId={post._id}
              posttext={post.postQuestion}
              key={post._id}
            />
          </div>
        ))
      ) : (
        <p id="mt-no-post">No Posts Found</p>
      )}
    </>
  );
}

export default Posts;
