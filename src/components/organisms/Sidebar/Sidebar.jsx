import React from 'react'
import SidebarContent from '../../atoms/Sidebar/SidebarContent'
import SidebarHeader from '../../atoms/Sidebar/SidebarHeader'
import styled from 'styled-components'

const SidebarContainer = styled.div`
  background: #28eda8;
  width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader />
      <SidebarContent />
    </SidebarContainer>
  );
};

export default Sidebar