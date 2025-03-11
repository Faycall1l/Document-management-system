import React from 'react';
import { CButton, CCol, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import FetchDocuments from '../components/FetchDocuments';

function Documents() {
  return (
    <div>
      <CRow className="mb-3">
        <CCol>
          <h2>Document Management</h2>
        </CCol>
        <CCol className="text-end">
          <Link to="/documents/new">
            <CButton color="success">Create New Document</CButton>
          </Link>
        </CCol>
      </CRow>
      <FetchDocuments />
    </div>
  );
}

export default Documents;
