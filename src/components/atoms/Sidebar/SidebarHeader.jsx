import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const SidebarHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #28eda8;
  border-bottom: 1px solid #e0e0e0;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background-color: transparent;
    color: #000;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  color: #3776eb;
  border: 2px solid #3776eb;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
`;

const SidebarHeader = () => {
  const navigate = useNavigate();

  return (
    <SidebarHeaderContainer>
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <StyledButton onClick={() => navigate("/profile")}>
        My profile
      </StyledButton>
    </SidebarHeaderContainer>
  );
};

export default SidebarHeader;
