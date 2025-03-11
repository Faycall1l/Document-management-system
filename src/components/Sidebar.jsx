import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { CContainer, CRow, CCol } from '@coreui/react';

const DashboardLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <CContainer fluid className="p-4">
        <Outlet />
      </CContainer>
    </div>
  );
};

export default DashboardLayout;
