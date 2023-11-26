import React from "react";
import styled from "styled-components";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  },
  {
    original:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ChatSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 250px;
  background-color: #fff;
  border-left: 2px solid #ccc;
  overflow-y: auto;
  max-height: 100%;
`;
const ProfileImage = styled.div`
  width: 100%;
  height: 300px;
`;

const ProfileName = styled.div`
  text-align: center;
  font-weight: bold;
`;

const ProfileContent = styled.div`
  text-align: center;
  font-weight: bold;
`;

const ChatSidebar = () => {
  return (
    <ChatSidebarContainer>
      <ProfileImage
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Photo de profil de Jean Pedro"
      />
      <Gallery
        items={images}
        showBullets={false}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        useBrowserFullscreen={false}
        showNav={true}
        autoPlay={false}
      />
      <ProfileName>JEAN YVES</ProfileName>
      et la que du blabla et la que du blabla et la que du blabla et la que du
      blabla et la que du blabla et la que du blabla et la que du blabla et la
      que du blabla et la que du blabla et la que du blabla et la que du blabla
      et la que du blabla et la que du blabla et la que du blabla et la que du
      blabla et la que du blabla et la que du blabla et la que du blabla et la
      que du blabla et la que du blabla et la que du blabla et la que du blabla
      et la que du blabla et la que du blabla et la que du blabla et la que du
      blabla et la que du blabla et la que du blabla et la que du blabla et la
      que du blabla et la que du blabla et la que du blabla et la que du blabla
      et la que du blabla et la que du blabla et la que du blabla et la que du
      blabla et la que du blabla et la que du blabla et la que du blabla et la
      que du blabla
    </ChatSidebarContainer>
    //ne pas oublier d'utiliser api externe pour livre/musique
  );
};

export default ChatSidebar;
