import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CForm, CFormInput, CCol, CRow } from '@coreui/react';

function DocumentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [docData, setDocData] = useState({
    title: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    if (id) {
      // Fetch document data for editing (dummy implementation)
      fetch(`http://127.0.0.1:5000/api/documents?page=1&per_page=20`)
        .then((response) => response.json())
        .then((data) => {
          const doc = data.data.find(d => d.id === parseInt(id));
          if (doc) {
            setDocData(doc);
          }
        })
        .catch(error => console.error("Error fetching document:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setDocData({ ...docData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle document submission (create/update)
    console.log("Submitting document data:", docData);
    navigate("/documents");
  };

  return (
    <CRow className="justify-content-center">
      <CCol md={6}>
        <CCard>
          <CCardHeader>
            {id ? "Edit Document" : "Create New Document"}
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CFormInput
                type="text"
                placeholder="Title"
                name="title"
                value={docData.title}
                onChange={handleChange}
                className="mb-3"
              />
              <CFormInput
                type="text"
                placeholder="Description"
                name="description"
                value={docData.description}
                onChange={handleChange}
                className="mb-3"
              />
              <CFormInput
                type="date"
                placeholder="Date"
                name="date"
                value={docData.date}
                onChange={handleChange}
                className="mb-3"
              />
              <CButton type="submit" color="primary" className="w-100">
                {id ? "Update Document" : "Create Document"}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default DocumentForm;
