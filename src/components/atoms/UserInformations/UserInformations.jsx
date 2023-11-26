import React from "react";
import styled from "styled-components";

const UserCardContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const UserName = styled.h3`
  color: #3776eb;
  font-size: 24px;
  margin-bottom: 10px;
`;

const UserDescription = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
`;

const UserInformations = () => {
  return (
    <UserCardContainer>
      <UserName>Jean Pedro</UserName>
      <UserDescription>
        Jean Pedro aime les lampadaires allumés Jean Pedro aime les lampadaires
        allumés Jean Pedro aime les lampadaires allumés Jean Pedro aime les
        lampadaires allumés Jean Pedro aime les lampadaires allumés Jean Pedro
        aime les lampadaires allumés
      </UserDescription>
    </UserCardContainer>
    // utiliser modal de MUI
  );
};

export default UserInformations;
