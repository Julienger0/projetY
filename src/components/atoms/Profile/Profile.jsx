import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { AuthContext } from "../../organisms/Auth/AuthContext";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: linear-gradient(300deg, #bcfc9e, #3776eb, #28eda8);
  padding: 20px;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 0;
`;

const Textarea = styled.textarea`
  width: 300px;
  height: 150px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 0;
  resize: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #3776eb;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #2857da;
  }
`;

const DisconnectButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const CloseIcon = styled.div`
  margin-left: auto;
  margin-right: 16px;
  cursor: pointer;
  font-size: 24px;
`;

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => {
    return {
      photos: user?.photos,
      bio: user?.bio || "",
      interests: user?.interests || [],
      location: user?.location || "",
    };
  });
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProfile = {
        bio: profile.bio,
        location: profile.location,
        interests: profile.interests,
      };

      const headers = {
        Authorization: `Bearer ${user?.token}`, // Assurez-vous que le token est stocké dans l'objet user
      };

      const response = await axios.put(
        "http://localhost:8000/profile/update",
        updatedProfile,
        { headers: headers }
      );

      const updatedUser = { ...user, ...updatedProfile };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  const handleDisconnect = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <ProfileContainer>
      <Form onSubmit={handleSubmit}>
        <CloseIcon onClick={() => navigate("/home")}>
          <AiOutlineCloseCircle />
        </CloseIcon>
        <Textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Your bio"
        />
        <Input
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange}
          placeholder="Your location"
        />
        <Button type="submit">Edit Profile</Button>
        <DisconnectButton onClick={handleDisconnect}>
          Disconnect
        </DisconnectButton>
      </Form>
    </ProfileContainer>
  );
};

export default Profile;
