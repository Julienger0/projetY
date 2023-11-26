import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const SidebarContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  background-color: #fff;
  cursor: pointer;
`;

export const SidebarContentImg = styled.img`
  min-width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

export const SidebarContentText = styled.div`
  margin-left: 16px;
`;

export const MatchName = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 4px;
`;

export const PreviewMessage = styled.p`
  font-size: 14px;
`;

const SidebarContent = () => {
  const matches = [
    {
      id: 1,
      name: "Match 1",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewMessage: "Hello",
    },
    {
      id: 2,
      name: "Match 2",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      previewMessage:
        "Hello 2Hello 2Hello 2Hello 2Hello 2Hello 2Hello 2Hello 2Hello 2Hello 2Hello 2Hello 2Hello 2",
    },
  ];
  const navigate = useNavigate();
  const navigateToChat = (userId) => {
    navigate(`/chat/${userId}`);
  };
  return (
    <div>
      {matches.map((match, index) => (
        <SidebarContentContainer
          key={index}
          onClick={() => navigateToChat(match.id)}
        >
          <SidebarContentImg src={match.image} />
          <SidebarContentText>
            <MatchName>{match.name}</MatchName>
            <PreviewMessage>{match.previewMessage.slice(0, 50)}</PreviewMessage>
          </SidebarContentText>
        </SidebarContentContainer>
      ))}
    </div>
  );
};

export default SidebarContent;
