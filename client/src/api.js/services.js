import axios from "axios";
export const token = sessionStorage.getItem("userToken");
export const username = sessionStorage.getItem("username");
export const userToken = token;

export const fetchData = async () => {
  try {
    const response = await axios.get(`/auth/ivy/homefeed/posts`, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`/auth/ivy/connection`, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFollowingUsers = async () => {
  try {
    const responseFollowing = await axios.get(`/auth/ivy/mynetworks`, {
      headers: {
        Authorization: userToken,
      },
    });
    return responseFollowing.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleFollow = (e, value) => {
  e.preventDefault();
  console.log(value);
  let data = JSON.stringify({
    receiverId: value,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/auth/ivy/following`,
    headers: {
      Authorization: userToken,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      fetchUsers();
      fetchFollowingUsers();
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleUnfollow = (e, value) => {
  e.preventDefault();
  console.log(value);
  let data = JSON.stringify({
    receiverId: value,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/auth/ivy/unfollow`,
    headers: {
      Authorization: userToken,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      fetchUsers();
      fetchFollowingUsers();
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleVote = (postId, upvote) => {
  console.log(postId, upvote);
  let data = JSON.stringify({
    postId: postId.toString(),
    upvote: upvote,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `auth/ivy/post/vote`,
    headers: {
      Authorization: userToken,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleDeletePost = (postId) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `auth/ivy/post/${postId}`,
    headers: {
      Authorization: userToken,
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
