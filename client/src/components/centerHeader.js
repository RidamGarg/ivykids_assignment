import React from "react";

function CenterHeader({ followingPerson, setFollowingPerson }) {
  return (
    <div>
      <div className="mt-main-header">
        <div className="mt-heading text-center mt-2">
          <h2 className="fs-2">Home</h2>
        </div>
        <div className="mt-header">
          <h2
            onClick={() => setFollowingPerson(false)}
            style={
              !followingPerson
                ? { borderBottom: "solid rgb(29, 155, 240) 4px" }
                : { borderBottom: "0px", color: "rgb(83, 100, 113)" }
            }
          >
            For you
          </h2>
          <h2
            onClick={() => setFollowingPerson(true)}
            style={
              followingPerson
                ? {
                    borderBottom: "solid rgb(29, 155, 240) 4px",
                    color: "black",
                  }
                : { borderBottom: "0px", color: "rgb(83, 100, 113)" }
            }
          >
            Following
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CenterHeader;
