import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserCard from "./components/organisms/UserCard/UserCard";
import Sidebar from "./components/organisms/Sidebar/Sidebar";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f0f0f0;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Sidebar />
                <UserCard />
              </>
            }
          />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
