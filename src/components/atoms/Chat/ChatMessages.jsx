import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ChatMessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  overflow: auto;
  padding: 16px;
`;

const MessageContainer = styled.div`
  max-width: 50%;
  margin-top: 10px;
  border-radius: 8px;
  padding: 12px;
`;

const MessageReceived = styled(MessageContainer)`
  background-color: #e4e4e4;
`;

const MessageSent = styled(MessageContainer)`
  background-color: #007bff;
  color: #fff;
  margin-left: auto;
  margin-right: 12px;
`;
const ChatMessages = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const formData = new FormData();
    formData.append("idSender", "2");
    formData.append("idReceiver", "3");

    axios
      .post("http://localhost:8000/messages", formData)
      .then((response) => {
        setMessages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  return (
    <>
      <ChatMessagesContainer>
        {messages.map((message, index) =>
          message.idSender === 2 ? (
            <MessageSent key={index}>{message.text}</MessageSent>
          ) : (
            <MessageReceived key={index}>{message.text}</MessageReceived>
          )
        )}
      </ChatMessagesContainer>
      {/* <ChatMessagesContainer>
        <MessageReceived>TEST MESSAGE1</MessageReceived>
        <MessageReceived>
          TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2
        </MessageReceived>

        <MessageSent>
          TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2
        </MessageSent>
        <MessageSent>TESTMESSAGE3</MessageSent>
        <MessageSent>
          TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2
        </MessageSent>
        <MessageSent>
          TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2
        </MessageSent>
        <MessageSent>
          TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2
        </MessageSent>
        <MessageSent>
          TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2
        </MessageSent>
        <MessageSent>
          TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2
        </MessageSent>
        <MessageSent>
          TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST MESSAGE2TEST
          MESSAGE2TEST MESSAGE2
        </MessageSent>
      </ChatMessagesContainer> */}
    </>
  );
};

export default ChatMessages;
