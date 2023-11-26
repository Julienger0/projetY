import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ChatHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 5vh;
  background-color: #fff;
  border-bottom: 2px solid #ccc;
  padding: 8px;
  font-weight: bold;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
`;

const CloseIcon = styled.div`
  margin-left: auto;
  margin-right: 16px;
  cursor: pointer;
  font-size: 24px;
`;

const ChatHeader = () => {
  const navigate = useNavigate();

  return (
    <ChatHeaderContainer>
      <ProfileContainer>
        <ProfileImage
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo de profil de Jean Pedro"
        />
        Jean Pedro
      </ProfileContainer>
      <CloseIcon onClick={() => navigate("/home")}>
        <AiOutlineCloseCircle />
      </CloseIcon>
    </ChatHeaderContainer>
  );
};

export default ChatHeader;
