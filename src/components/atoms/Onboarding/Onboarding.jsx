import React, { useState, useContext } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from "../../organisms/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(300deg, #bcfc9e, #3776eb, #28eda8);
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 40px;
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
  width: 500px;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 0;
  resize: none;
  font-family: inherit;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 0;
`;

const Select = styled.select`
  width: 320px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  margin: 10px 0;
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

const InterestButton = styled.button`
  background-color: ${(props) => (props.selected ? "#3776eb" : "#fff")});
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  margin: 5px;
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

const InterestContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
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
    margin: 10px 0;
  }
`;

const Onboarding = () => {
  const { registrationData } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [books, setBooks] = useState([]);
  const [userDetails, setUserDetails] = useState({
    photos: [],
    firstName: "",
    lastName: "",
    birthDate: null,
    gender: "",
    location: "",
    interests: [],
    favoriteBook: "",
    bio: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files.length < 3 || e.target.files.length > 5) {
      alert("Please select between 3 and 5 photos.");
      return;
    }
    setUserDetails({ ...userDetails, photos: [...e.target.files] });
  };

  const uploadPhotos = async () => {
    const uploadedPhotoUrls = [];
    for (const photo of userDetails.photos) {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "n8xu4idh");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dybhpxiai/image/upload",
          formData
        );
        uploadedPhotoUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image", error);
      }
    }
    return uploadedPhotoUrls;
  };

  const handleDateChange = (date) => {
    setUserDetails({ ...userDetails, birthDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedPhotosUrls = await uploadPhotos();
    if (step === 1) {
      setStep(2);
    } else {
      const userData = {
        ...registrationData,
        ...userDetails,
        photos: uploadedPhotosUrls,
      };
      axios
        .post("https://localhost:8000/register", userData)
        .then((response) => {
          console.log("Inscription réussie :", response.data);
          localStorage.setItem("userToken", response.data.token);
        })
        .catch((error) => {
          console.error("Erreur d'inscription :", error);
        });
      navigate("/");
    }
  };

  const handleInterestSelect = (interest) => {
    const updatedInterests = userDetails.interests.includes(interest)
      ? userDetails.interests.filter((i) => i !== interest)
      : [...userDetails.interests, interest];
    setUserDetails({ ...userDetails, interests: updatedInterests });
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

  const interests = [
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
    <OnboardingContainer>
      {step === 1 ? (
        <Form onSubmit={handleSubmit}>
          <h2>Welcome! Let's complete your profile.</h2>
          <input type="file" multiple onChange={handlePhotoChange} />
          <Input
            type="text"
            name="firstName"
            value={userDetails.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            required
          />
          <Input
            type="text"
            name="lastName"
            value={userDetails.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
          />
          <StyledDatePicker
            selected={userDetails.birthDate}
            placeholderText="Birth Date"
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            showYearDropdown
            dropdownMode="select"
            required
          />
          <Select
            name="gender"
            value={userDetails.gender}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </Select>
          <Input
            type="text"
            name="location"
            value={userDetails.location}
            onChange={handleInputChange}
            placeholder="Location"
            required
          />
          {/* Implémenter la sélection des centres d'intérêt */}
          {/* Implémenter la sélection du livre préféré avec une librairie externe */}
          <StyledAutocomplete
            options={books}
            getOptionLabel={(option) => option.title || ""}
            onInputChange={(event, newInputValue) => {
              handleSearchChange(newInputValue);
            }}
            onChange={(event, value) => {
              setUserDetails({
                ...userDetails,
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
              <TextField {...params} label="Favorite Book" variant="outlined" />
            )}
          />

          <Button type="submit">Save</Button>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <InterestContainer>
            {interests.map((interest, index) => (
              <InterestButton
                key={index}
                selected={userDetails.interests.includes(interest)}
                onClick={(e) => {
                  e.preventDefault();
                  handleInterestSelect(interest);
                }}
              >
                {interest}
              </InterestButton>
            ))}
          </InterestContainer>
          <Textarea
            name="bio"
            value={userDetails.bio}
            onChange={handleInputChange}
            placeholder="Your bio"
          />
          <Button type="submit">Create Account</Button>
        </Form>
      )}
    </OnboardingContainer>
  );
};

export default Onboarding;
