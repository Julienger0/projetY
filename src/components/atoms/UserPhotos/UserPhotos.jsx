import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import TinderCard from "react-tinder-card";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { AuthContext } from "../../organisms/Auth/AuthContext";

const ImgContainer = styled.div`
  width: 350px;
  height: auto;
  border-radius: 15px;
  overflow: hidden;
  margin: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserPhotos = ({ showNav, tinderCardRef, swipe, setCurrentUserId }) => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  const formatImages = (photos) => {
    return photos.map((photo) => ({
      original: photo.replace(".png", ""),
    }));
  };

  useEffect(() => {
    axios
      .get(`https://localhost:8000/get-unseen-users/${user.id}`)
      .then((response) => {
        setUsers(response.data);
        if (users.length > 0) {
          setCurrentUserId(users[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching unseen users", error);
      });
  }, [users, setCurrentUserId, user.id]);
  return (
    <>
      {users.length > 0 ? (
        <TinderCard
          key={users[0].id}
          ref={tinderCardRef}
          onCardLeftScreen={() => swipe("left", users[0].id)}
          onCardRightScreen={() => swipe("right", users[0].id)}
          preventSwipe={["up", "down"]}
        >
          <ImgContainer>
            <Gallery
              items={formatImages(users[0].photos)}
              showBullets={false}
              showThumbnails={false}
              showFullscreenButton={false}
              showPlayButton={false}
              useBrowserFullscreen={false}
              showNav={showNav}
              autoPlay={false}
            />
          </ImgContainer>
        </TinderCard>
      ) : (
        <p>No users found.</p>
      )}
    </>
  );
};

export default UserPhotos;
