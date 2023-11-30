import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../organisms/Auth/AuthContext";
import { useContext } from "react";

const LogInContainer = styled.div`
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  text-align: left;
  width: 500px;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #0073e6;
  }
`;

const Button = styled.button`
  background-color: #0073e6;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px;
  margin: 16px 0;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005bb7;
  }
`;

const LogIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:8000/login",
        formData
      );
      localStorage.setItem("userToken", response.data.token);
      const userWithToken = {
        ...response.data.user,
        token: response.data.token,
      };
      setUser(userWithToken);
      navigate("/home");
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <LogInContainer>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Log In</Button>
      </form>
    </LogInContainer>
  );
};

export default LogIn;
