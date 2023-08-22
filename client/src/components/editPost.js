import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { userToken } from "../api.js/services";
import axios from "axios";

function EditPost({ handleClose, setShow, postId, posttext }) {
  const [postText, setPostText] = useState(posttext);

  const handlePostSubmit = (e) => {
    let data = JSON.stringify({
      postQuestion: postText,
    });

    const config = {
      method: "post",
      url: `auth/ivy/post/${postId}`,
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
      data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };
  return (
    <div id={postId} style={{ display: "none" }}>
      <div className="mt-create-post">
        <div className="mt-writte-up">
          <textarea
            type="text"
            placeholder="What is happening?"
            value={postText}
            onChange={handlePostTextChange}
            className="p-2"
          />
        </div>
        <div className="mt-writte-up">
          <button
            onClick={handlePostSubmit}
            className="btn btn-primary ms-2 rounded-pill"
          >
            Edit
          </button>
          <button
            onClick={() => handleClose(postId)}
            className="btn btn-secondary ms-2 rounded-pill"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
