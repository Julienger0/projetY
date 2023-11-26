import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserCard from "./components/organisms/UserCard/UserCard";
import Sidebar from "./components/organisms/Sidebar/Sidebar";
import styled, { keyframes } from "styled-components";
import Chat from "./components/organisms/Chat/Chat";
import Auth from "./components/organisms/Auth/Auth";
import Onboarding from "./components/atoms/Onboarding/Onboarding";
import Profile from "./components/atoms/Profile/Profile";
import { createGlobalStyle } from "styled-components";
import { AuthProvider } from "./components/organisms/Auth/AuthContext";

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

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(300deg, #bcfc9e, #3776eb, #28eda8);
  background-size: 180% 180%;
  animation: ${gradientAnimation} 6s ease infinite;
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <AppContainer>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route
                path="/Home"
                element={
                  <>
                    <Sidebar />
                    <UserCard />
                  </>
                }
              />
              <Route
                path="/chat/:userId"
                element={
                  <>
                    <Sidebar />
                    <Chat />
                  </>
                }
              />
              <Route
                path="/onboarding"
                element={
                  <>
                    <Onboarding />
                  </>
                }
              />{" "}
              <Route
                path="/profile"
                element={
                  <>
                    <Sidebar />

                    <Profile />
                  </>
                }
              />
            </Routes>
          </AppContainer>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
