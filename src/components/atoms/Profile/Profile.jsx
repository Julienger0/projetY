import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from "../../organisms/Auth/AuthContext";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: linear-gradient(300deg, #bcfc9e, #3776eb, #28eda8);
  padding: 20px;
  box-sizing: border-box;
  max-height: 100vh;
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
  overflow-y: auto;
  max-height: 90vh;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 300px;
  min-height: 150px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
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

const PhotoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Photo = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #ff4d4f;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ff7875;
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;

  &:hover {
    border-color: #3776eb;
  }
`;
const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const StyledAutocomplete = styled(Autocomplete)`
  width: 300px;

  .MuiFormControl-root {
    width: 100%;
  }

  .MuiOutlinedInput-root {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;
const InterestContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const InterestButton = styled.button`
  background-color: ${(props) => (props.selected ? "#3776eb" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  padding: 10px 20px;
  border: 2px solid ${(props) => (props.selected ? "#3776eb" : "#ddd")};
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #2857da;
    color: #fff;
    border-color: #2857da;
  }
`;
const FavoriteBookTitle = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #3776eb;
`;

const Label = styled.label`
  font-weight: bold;
  color: #3776eb;
`;

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [favoriteBookTitle, setFavoriteBookTitle] = useState("");
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    photos: user?.photos || [],
    bio: user?.bio || "",
    interests: user?.interests || [],
    location: user?.location || "",
    favoriteBook: user?.favoriteBook || "",
  });

  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNewPhotoChange = async (e) => {
    const newPhotos = [...e.target.files];

    if (profile.photos.length + newPhotos.length > 5) {
      alert("You can only have a maximum of 5 photos.");
      return;
    }
    const newPhotoUrls = [];

    for (const photo of newPhotos) {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "n8xu4idh");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dybhpxiai/image/upload",
          formData
        );
        newPhotoUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }

    setProfile({
      ...profile,
      photos: [...profile.photos, ...newPhotoUrls],
    });
  };

  const handleInterestSelect = (interest) => {
    const updatedInterests = profile.interests.includes(interest)
      ? profile.interests.filter((i) => i !== interest)
      : [...profile.interests, interest];
    setProfile({ ...profile, interests: updatedInterests });
  };

  const handleSearchChange = (value) => {
    if (value.length > 2) {
      axios
        .get(`https://openlibrary.org/search.json?q=${value}&page=1&limit=10`)
        .then((response) => {
          setBooks(response.data.docs);
        })
        .catch((error) => {
          console.error("Error fetching books: ", error);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProfile = {
        bio: profile.bio,
        location: profile.location,
        interests: profile.interests,
        photos: profile.photos, // Include photos in the update
        favoriteBook: profile.favoriteBook,
      };

      const headers = {
        Authorization: `Bearer ${user?.token}`, // Ensure the token is stored in the user object
      };

      const response = await axios.put(
        "https://localhost:8000/profile/update",
        updatedProfile,
        { headers: headers }
      );

      const updatedUser = { ...user, ...updatedProfile };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePhotoDelete = (photoUrl) => {
    if (profile.photos.length > 3) {
      setProfile({
        ...profile,
        photos: profile.photos.filter((photo) => photo !== photoUrl),
      });
    } else {
      alert("You cannot have less than 3 photos.");
    }
  };

  const handleDisconnect = () => {
    setUser(null);
    navigate("/");
  };
  useEffect(() => {
    const fetchFavoriteBookTitle = async () => {
      try {
        if (profile.favoriteBook) {
          const response = await axios.get(
            `https://openlibrary.org${profile.favoriteBook}.json`
          );
          setFavoriteBookTitle(response.data.title); // Mettre à jour le titre du livre préféré
        }
      } catch (error) {
        console.error("Error fetching favorite book title: ", error);
        setFavoriteBookTitle("Unavailable"); // En cas d'erreur
      }
    };
    fetchFavoriteBookTitle();
  });

  const allInterests = [
    "Music",
    "Sports",
    "Reading",
    "Travel",
    "Cooking",
    "Technology",
    "Art",
    "Cinema",
    "Theater",
    "Dance",
    "Nature",
    "Photography",
    "Video",
    "Gaming",
    "Yoga",
    "Hiking",
    "Cycling",
    "Running",
    "Swimming",
    "Fitness",
  ];

  return (
    <ProfileContainer>
      <Form onSubmit={handleSubmit}>
        <CloseIcon onClick={() => navigate("/home")}>
          <AiOutlineCloseCircle />
        </CloseIcon>
        <Label htmlFor="photos">Photos</Label>
        <PhotoContainer>
          {profile.photos.map((photoUrl, index) => (
            <PhotoWrapper key={index}>
              <Photo src={photoUrl} alt={`Photo ${index + 1}`} />
              <DeleteButton
                type="button"
                onClick={() => handlePhotoDelete(photoUrl)}
              >
                Delete
              </DeleteButton>
            </PhotoWrapper>
          ))}
          <FileInput type="file" multiple onChange={handleNewPhotoChange} />
        </PhotoContainer>
        <FavoriteBookTitle>
          Your favorite book is: {favoriteBookTitle}
        </FavoriteBookTitle>
        <StyledAutocomplete
          options={books}
          getOptionLabel={(option) => option.title || ""}
          onInputChange={(event, newInputValue) => {
            handleSearchChange(newInputValue);
          }}
          onChange={(event, value) => {
            setProfile({
              ...profile,
              favoriteBook: value ? value.key : "",
            });
          }}
          renderOption={(option) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={`http://covers.openlibrary.org/b/id/${option.cover_i}-S.jpg`}
                alt={option.title}
                style={{ marginRight: 10, height: 50 }}
              />
              <div>
                <div>{option.title}</div>
                <div style={{ color: "#888" }}>
                  {option.author_name?.join(", ")}
                </div>
              </div>
            </div>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Change Your Favorite Book"
              variant="outlined"
            />
          )}
        />
        <Label htmlFor="bio">Interests</Label>
        <InterestContainer>
          {allInterests.map((interest) => (
            <InterestButton
              key={interest}
              selected={profile.interests.includes(interest)}
              onClick={() => handleInterestSelect(interest)}
            >
              {interest}
            </InterestButton>
          ))}
        </InterestContainer>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Your bio"
        />
        <Label htmlFor="bio">Location</Label>
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
