import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import "sweetalert2/dist/sweetalert2.min.css";
import Following from "../../components/following";
import CenterHeader from "../../components/centerHeader";
import Posts from "../../components/posts";
import People from "../../components/people";
const Home = () => {
  const [followingPerson, setFollowingPerson] = useState(false);

  return (
    <div className="mt-container">
      <Sidebar />
      <div className="mt-userposts">
        <CenterHeader
          followingPerson={followingPerson}
          setFollowingPerson={setFollowingPerson}
        />
        <div className="mt-ugc">
          {!followingPerson && <Posts />}
          {followingPerson && <Following />}
        </div>
      </div>
      <div className="mt-rightmenu">
        <People />
      </div>
    </div>
  );
};
export default Home;
