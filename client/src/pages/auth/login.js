import React, { useState } from "react";
import MiniTwiiterLogoWBG from "../../assets/media/logo_wbg.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (prop) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    sessionStorage.setItem("username", username);
    let data = JSON.stringify({
      email: username,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `secure/ivy/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === true) {
          navigate("/home");
          window.location.reload();
          console.log(response.data);
          sessionStorage.setItem("userToken", response.data.userToken);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
  };

  const handleSignupScreen = () => {
    navigate("/signup");
  };

  return (
    <div className="mt-app">
      <div className="mt-loginscreen">
        <img src={MiniTwiiterLogoWBG} alt="mini-twitter" />
        <h1>Sign in to Mini Twitter</h1>
        {error && (
          <h2
            className="bg-danger text-white rounded"
            style={{ margin: "0px 20px" }}
          >
            {error}
          </h2>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          autoComplete="off"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="off"
        />
        <br />
        <button onClick={handleLogin}>Next</button>
        <button id="forgot-password">Forgot Password?</button>
        <p onClick={handleSignupScreen}>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
