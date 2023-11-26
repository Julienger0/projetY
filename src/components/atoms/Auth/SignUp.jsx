import axios from "axios";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../organisms/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const SignUpContainer = styled.div`
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

const SignUp = () => {
  const { setRegistrationData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    setRegistrationData({
      email: formData.email,
      password: formData.password,
    });

    navigate("/onboarding");
  };

  return (
    <SignUpContainer>
      <h2>Create Account</h2>
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
        <FormGroup>
          <Label>Confirm Password:</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Save</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
