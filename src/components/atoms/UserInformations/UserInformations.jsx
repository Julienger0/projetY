import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const UserCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  max-width: 500px;
`;

const UserName = styled.h3`
  color: #3776eb;
  font-size: 24px;
  margin-bottom: 10px;
`;

const UserDescription = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  text-align: center;
`;

const Bio = styled.div`
  margin-bottom: 20px;
`;

const Detail = styled.div`
  margin: 5px 0;
  color: #3776eb;
  font-weight: bold;
`;

const UserInformations = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [favoriteBookTitle, setFavoriteBookTitle] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://localhost:8000/user/${userId}`)
        .then((response) => {
          setUser(response.data);
          if (response.data.favoriteBook) {
            fetchBookTitle(response.data.favoriteBook);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  const fetchBookTitle = (bookId) => {
    axios
      .get(`https://openlibrary.org${bookId}.json`)
      .then((response) => {
        setFavoriteBookTitle(response.data.title);
      })
      .catch((error) => {
        console.error("Error fetching book title:", error);
        setFavoriteBookTitle("Unavailable");
      });
  };
  return (
    <UserCardContainer>
      <UserName>
        {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
      </UserName>
      <UserDescription>
        {user ? (
          <>
            <Detail>
              Birthdate:{" "}
              {user?.birthDate
                ? new Date(user.birthDate).toLocaleDateString()
                : "Not available"}
            </Detail>
            <Bio>{user.bio || "Bio not available"}</Bio>
            <Detail>Location: {user.location || "Not available"}</Detail>
            <Detail>
              Interests: {user.interests.join(", ") || "Not available"}
            </Detail>
            <Detail>
              Favorite Book:{" "}
              {favoriteBookTitle || user?.favoriteBook || "Not available"}
            </Detail>
          </>
        ) : (
          "Loading user data..."
        )}
      </UserDescription>
    </UserCardContainer>
  );
};

export default UserInformations;
