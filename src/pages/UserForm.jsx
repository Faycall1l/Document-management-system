import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CForm, CFormInput, CCol, CRow } from '@coreui/react';

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    hire_date: '',
    status: ''
  });

  useEffect(() => {
    if (id) {
      // Fetch the user data for editing (dummy implementation)
      fetch(`http://127.0.0.1:5000/api/users?page=1&per_page=20`)
        .then((response) => response.json())
        .then((data) => {
          const user = data.data.find(u => u.id === parseInt(id));
          if (user) {
            setUserData(user);
          }
        })
        .catch(error => console.error("Error fetching user:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for creating/updating a user.
    console.log("Submitting user data:", userData);
    navigate("/users");
  };

  return (
    <CRow className="justify-content-center">
      <CCol md={6}>
        <CCard>
          <CCardHeader>
            {id ? "Edit User" : "Create New User"}
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CFormInput
                type="text"
                placeholder="Name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="mb-3"
              />
              <CFormInput
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="mb-3"
              />
              <CFormInput
                type="text"
                placeholder="Phone"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="mb-3"
              />
              <CFormInput
                type="text"
                placeholder="Position"
                name="position"
                value={userData.position}
                onChange={handleChange}
                className="mb-3"
              />
              <CFormInput
                type="text"
                placeholder="Department"
                name="department"
                value={userData.department}
                onChange={handleChange}
                className="mb-3"
              />
              <CFormInput
                type="date"
                placeholder="Hire Date"
                name="hire_date"
                value={userData.hire_date}
                onChange={handleChange}
                className="mb-3"
              />
              <CFormInput
                type="text"
                placeholder="Status"
                name="status"
                value={userData.status}
                onChange={handleChange}
                className="mb-3"
              />
              <CButton type="submit" color="primary" className="w-100">
                {id ? "Update User" : "Create User"}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default UserForm;
