import React, { useContext, useState } from "react";
import SignUp from "../../atoms/Auth/SignUp";
import LogIn from "../../atoms/Auth/LogIn";
import styled from "styled-components";
import { AuthContext } from "../../organisms/Auth/AuthContext";

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 6vw;
  margin-bottom: 24px;
  font-weight: bold;
  color: #fff;
`;

const AuthFormContainer = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: #0073e6;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin: 8px;
  font-size: 16px;

  &:hover {
    background-color: #005bb7;
  }
`;

const Auth = () => {
  const { user, logout } = useContext(AuthContext);
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleCreateAccountClick = () => {
    setShowCreateAccountForm(true);
    setShowLoginForm(false);
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowCreateAccountForm(false);
  };

  return (
    <AuthContainer>
      <Title>PROJET Y</Title>
      <AuthFormContainer>
        {showCreateAccountForm ? (
          <>
            <SignUp />
            <Button onClick={handleLoginClick}>Log In</Button>
          </>
        ) : showLoginForm ? (
          <>
            <LogIn />
            <Button onClick={handleCreateAccountClick}>Create Account</Button>
          </>
        ) : (
          <div>
            {showLoginForm ? null : (
              <Button onClick={handleCreateAccountClick}>Create Account</Button>
            )}
            {showCreateAccountForm ? null : (
              <Button onClick={handleLoginClick}>Log In</Button>
            )}
          </div>
        )}
      </AuthFormContainer>
    </AuthContainer>
  );
};

export default Auth;
