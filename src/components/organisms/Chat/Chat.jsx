import React from "react";
import styled from "styled-components";
import ChatHeader from "../../atoms/Chat/ChatHeader";
import ChatMessages from "../../atoms/Chat/ChatMessages";
import ChatInput from "../../atoms/Chat/ChatInput";
import ChatSidebar from "../../atoms/Chat/ChatSidebar";

const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: row;
`;
const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; 
`;

const Chat = () => {
  return (
    <ChatContainer>
      <ChatContent>
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </ChatContent>

        <ChatSidebar />
    </ChatContainer>
  );
};

export default Chat;
