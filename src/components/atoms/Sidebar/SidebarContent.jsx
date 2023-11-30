import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../organisms/Auth/AuthContext";

export const SidebarContentdiv = styled.div`
  overflow: auto;
  height: 100%;
`;

export const SidebarContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  background-color: #fff;
  cursor: pointer;
`;

export const SidebarContentImg = styled.img`
  width: 80px;
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
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          `https://localhost:8000/get-matches/${user.id}`
        );
        const data = await response.json();
        setMatches(data.matches);
      } catch (error) {
        console.error("Error while retrieving matches :", error);
      }
    };

    fetchMatches();
  }, [user.id]);

  const navigateToChat = (userId) => {
    navigate(`/chat/${userId}`);
  };
  return (
    <SidebarContentdiv>
      {matches.map((match, index) => (
        <SidebarContentContainer
          key={index}
          onClick={() => navigateToChat(match.id)}
        >
          <SidebarContentImg src={match.photo} />
          <SidebarContentText>
            <MatchName>{match.name}</MatchName>
            <PreviewMessage>{match.previewMessage.slice(0, 50)}</PreviewMessage>
          </SidebarContentText>
        </SidebarContentContainer>
      ))}
    </SidebarContentdiv>
  );
};

export default SidebarContent;
