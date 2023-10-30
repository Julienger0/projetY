import React from 'react'
import styled from 'styled-components';
const UserPhotos = () => {

const ImgContainer = styled.img`
width: 300px;
height: auto;
border-radius: 15px;
overflow: hidden;
margin: 10px;

`;

  return (
    <div>
    <ImgContainer src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="randomguy  " />

    </div>
  )
}

export default UserPhotos