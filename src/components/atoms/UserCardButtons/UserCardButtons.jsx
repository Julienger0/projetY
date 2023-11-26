import React from 'react'
import styled from 'styled-components';

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 8px;

  button {
    background: #ff6b6b;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    margin: 0 8px;
  }
`;

const UserCardButtons = ({swipe}) => {
  return (
    <StyledButtons>
         <button onClick={()=>swipe('left')}>Dislike</button>
        <button onClick={()=>swipe('right')}>Like</button>      
        </StyledButtons>
  )
}

export default UserCardButtons