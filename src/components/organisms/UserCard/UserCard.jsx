import React, { useState } from 'react';
import UserPhotos from '../../atoms/UserPhotos/UserPhotos';
import UserInformations from '../../atoms/UserInformations/UserInformations';
import styled, { keyframes } from 'styled-components';
import UserCardButtons from '../../atoms/UserCardButtons/UserCardButtons';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: linear-gradient(300deg, #bcfc9e, #3776eb, #28eda8);
  background-size: 180% 180%;
  animation: ${gradientAnimation} 6s ease infinite;
`;

const UserCardContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
  position: relative;
`;

const DetailsButton = styled.button`
  background: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 16px;
  z-index: 1; 
`;

const CancelButton = styled.button`
  background: #ff6b6b;
  color: #fff;
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

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 8px;

  button {
    background: #ff6b6b;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    margin: 0 8px;
  }
`;

const UserCard = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleShowUserInfo = () => {
    setShowUserInfo(true);
  };

  const handleHideUserInfo = () => {
    setShowUserInfo(false);
  };

  return (
    <Container>
      <UserCardContainer>
        <UserPhotos />
        {showUserInfo ? (
          <UserInfoOverlay>
            <UserInformations />
            <CancelButton onClick={handleHideUserInfo}>Annuler</CancelButton>
          </UserInfoOverlay>
        ) : (
          <DetailsButton onClick={handleShowUserInfo}>Détails</DetailsButton>
        )}
      </UserCardContainer>
      <StyledButtons>
        <UserCardButtons />
      </StyledButtons>
    </Container>
  );
};

export default UserCard;
