import React, { useState } from "react";
import close from "../assets/media/close.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { userToken } from "../api.js/services";
import axios from "axios";

function CreatePost({ show, handleClose, setShow }) {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  const handlePostSubmit = (e) => {
    const formData = new FormData();
    formData.append("postImage", selectedImage);
    formData.append("postQuestion", postText);
    formData.append("postPrivacy", "public");
    const config = {
      method: "post",
      url: `auth/ivy/post`,
      headers: {
        Authorization: userToken,
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setShow(false);
        Swal.fire({
          title: "Tweet Published",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };
  return (
    <div>
      <div className="mt-create-post">
        <Modal show={show} onHide={handleClose}>
          <Button variant="secondary" onClick={handleClose} id="close">
            <img src={close} alt="close" style={{ float: "right" }} />
          </Button>

          <div className="mt-writte-up">
            <textarea
              type="text"
              placeholder="What is happening?"
              value={postText}
              onChange={handlePostTextChange}
            />
          </div>
          <div className="mt-writte-up">
            <div className="mt-post-icons">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <button
              onClick={handlePostSubmit}
              className="btn btn-primary ms-2 rounded-pill"
            >
              Tweet
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default CreatePost;
