import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../../organisms/Auth/AuthContext";
import { useParams } from "react-router-dom";

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
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  useEffect(() => {
    const fetchMessages = () => {
      const formData = new FormData();
      formData.append("idSender", user.id);
      formData.append("idReceiver", userId);

      axios
        .post("https://localhost:8000/messages", formData)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    };
    fetchMessages();

    const interval = setInterval(fetchMessages, 1000); // Rafraîchir les messages toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, [userId, user.id]);
  return (
    <ChatMessagesContainer>
      {messages.map((message, index) =>
        message.idSender === user.id ? (
          <MessageSent key={index}>{message.text}</MessageSent>
        ) : (
          <MessageReceived key={index}>{message.text}</MessageReceived>
        )
      )}
    </ChatMessagesContainer>
  );
};

export default ChatMessages;
