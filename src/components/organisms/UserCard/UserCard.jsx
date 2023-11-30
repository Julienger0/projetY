import React, { useState, useContext } from "react";
import UserPhotos from "../../atoms/UserPhotos/UserPhotos";
import UserInformations from "../../atoms/UserInformations/UserInformations";
import styled from "styled-components";
import UserCardButtons from "../../atoms/UserCardButtons/UserCardButtons";
import { AuthContext } from "../../organisms/Auth/AuthContext";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const UserCardContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
  position: relative;
  max-width: 75%;
  margin-right: auto;
  margin-left: auto;
  max-height: 100vh;
  overflow: hidden;
`;

const DetailsButton = styled.button`
  position: absolute;
  background-color: transparent;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 16px;
  z-index: 1;
`;

const CancelButton = styled.button`
  background-color: transparent;

  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
`;

const UserInfoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const UserCard = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const tinderCardRef = React.createRef();
  const [currentUserId, setCurrentUserId] = useState(null);
  const { user } = useContext(AuthContext);

  const handleShowUserInfo = () => setShowUserInfo(true);
  const handleHideUserInfo = () => setShowUserInfo(false);
  const swipe = async (direction, userId) => {
    if (tinderCardRef.current) {
      await tinderCardRef.current.swipe(direction);
      const action = direction === "left" ? "dislike" : "like";
      axios
        .post(`https://localhost:8000/user-action`, {
          userId: user.id,
          targetUserId: userId,
          actionType: action,
        })
        .catch((error) => console.error("Erreur :", error));
    }
  };

  return (
    <Container>
      <UserCardContainer>
        <UserPhotos
          showNav={!showUserInfo}
          tinderCardRef={tinderCardRef}
          swipe={swipe}
          setCurrentUserId={setCurrentUserId}
        />
        {showUserInfo ? (
          <UserInfoOverlay>
            <UserInformations userId={currentUserId} />
            <CancelButton onClick={handleHideUserInfo}>Cancel</CancelButton>
          </UserInfoOverlay>
        ) : (
          <DetailsButton onClick={handleShowUserInfo}>Details</DetailsButton>
        )}
      </UserCardContainer>
      <UserCardButtons swipe={swipe} />
    </Container>
  );
};

export default UserCard;
