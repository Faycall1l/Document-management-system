import React, { useEffect, useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CFormSelect,
  CRow,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import { Link } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";

function FetchUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/users?page=1&per_page=20")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setUsers(data.data);
          setFilteredUsers(data.data);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      return (
        (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!positionFilter || user.position === positionFilter) &&
        (!statusFilter || user.status === statusFilter)
      );
    });
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, positionFilter, statusFilter, users]);

  const getBadge = (status) => {
    const statusColors = {
      Active: "success",
      Inactive: "secondary",
      Remote: "info",
      "On Leave": "warning",
      Contract: "primary",
    };
    return statusColors[status] || "dark";
  };

  const uniquePositions = [...new Set(users.map((user) => user.position))].filter(Boolean);
  const uniqueStatuses = [...new Set(users.map((user) => user.status))].filter(Boolean);

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage) || 1;
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = Math.min(startIndex + usersPerPage, totalUsers);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <CCol xs={12}>
      <CCard className="shadow-lg rounded-3 border-0">
        <CCardHeader className="bg-primary text-white text-center fw-bold fs-4">
          🏢 Employee List
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol md={4}>
              <CFormInput
                type="text"
                placeholder="🔍 Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </CCol>
            <CCol md={4}>
              <CFormSelect value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
                <option value="">All Positions</option>
                {uniquePositions.map((pos, index) => (
                  <option key={index} value={pos}>
                    {pos}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <CFormSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Statuses</option>
                {uniqueStatuses.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CTable hover responsive striped bordered className="text-center align-middle shadow-sm">
            <CTableHead className="table-dark">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Phone</CTableHeaderCell>
                <CTableHeaderCell>Position</CTableHeaderCell>
                <CTableHeaderCell>Department</CTableHeaderCell>
                <CTableHeaderCell>Hire Date</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <CTableRow key={user.id} className="table-light">
                    <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                    <CTableDataCell className="fw-semibold">{user.name}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.phone}</CTableDataCell>
                    <CTableDataCell>{user.position}</CTableDataCell>
                    <CTableDataCell>{user.department}</CTableDataCell>
                    <CTableDataCell>{user.hire_date}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={getBadge(user.status)} className="px-3 py-2">
                        {user.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/users/edit/${user.id}`}>Edit</Link>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="9" className="text-center text-muted py-4">
                    No users found.
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>

          <CRow className="mt-3 d-flex justify-content-between align-items-center">
            <CCol md={3}>
              <CFormSelect
                value={usersPerPage}
                onChange={(e) => {
                  setUsersPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[5, 10, 20].map((num) => (
                  <option key={num} value={num}>
                    Show {num}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CPagination align="center">
                <CPaginationItem disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
                  « First
                </CPaginationItem>
                <CPaginationItem disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                  ‹ Prev
                </CPaginationItem>
                <CPaginationItem disabled>
                  Page {currentPage} of {totalPages}
                </CPaginationItem>
                <CPaginationItem disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                  Next ›
                </CPaginationItem>
                <CPaginationItem disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
                  Last »
                </CPaginationItem>
              </CPagination>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  );
}

export default FetchUsers;
