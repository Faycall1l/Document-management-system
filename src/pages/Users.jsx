import React from 'react';
import { CButton, CCol, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import FetchUsers from '../components/FetchUsers';

function Users() {
  return (
    <div>
      <CRow className="mb-3">
        <CCol>
          <h2>User Management</h2>
        </CCol>
        <CCol className="text-end">
          <Link to="/users/new">
            <CButton color="success">Create New User</CButton>
          </Link>
        </CCol>
      </CRow>
      <FetchUsers />
    </div>
  );
}

export default Users;
