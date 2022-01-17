import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import auth from "../../utils/auth";
import "../../App.css";

const ProfileCard = () => {
  const navigate = useNavigate();

  let [userProfile, setUserProfile] = useState({});

  const getProfile = async () => {
    try {
      const response = await axios.get("/user/profile");

      console.log(response.data);

      setUserProfile(response.data);
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  useEffect(() => {
    if (!auth.getToken()) {
      navigate("/auth/login", { replace: true });
    } else {
      getProfile();
    }
  }, []);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="card">
        <h1>
          {userProfile.firstName || "--"} {userProfile.lastName || "--"}
        </h1>
        <p className="title">{userProfile.address || "--"}</p>
        <p>Email: {userProfile.email || "--"}</p>
        <p>Phone: {userProfile.phone || "--"}</p>
        <p>
          <a href={`mailto:${userProfile.email}`}>Contact</a>
        </p>
      </div>
    </div>
  );
};
export default ProfileCard;
