import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const ChatInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 10vh;
  background-color: #fff;
  border-top: 2px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  flex: 1;
`;
const InputField = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
`;

const SendButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  margin: 8px;
  font-weight: bold;
`;
const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("idSender", "2");
    formData.append("idReceiver", "3");
    formData.append("text", message);

    axios
      .post("http://localhost:8000/message", formData)
      .then((response) => {
        console.log("Réponse du serveur : ", response.data);
        setMessage("");
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du message : ", error);
      });
    setMessage("");
  };

  return (
    <ChatInputContainer>
      <Form onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
        />
        <SendButton type="submit">Send</SendButton>
      </Form>
    </ChatInputContainer>
  );
};

export default ChatInput;
