import React, { useEffect, useState } from "react";
import {
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
  CRow,
  CPagination,
  CPaginationItem,
  CFormSelect
} from "@coreui/react";
import { Link } from "react-router-dom";

function FetchDocuments() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [docsPerPage, setDocsPerPage] = useState(10);

  useEffect(() => {
    // Simulate fetching documents. Replace with actual API call if available.
    fetch("http://127.0.0.1:5000/api/documents?page=1&per_page=20")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setDocuments(data.data);
          setFilteredDocuments(data.data);
        }
      })
      .catch((error) => console.error("Error fetching documents:", error));
  }, []);

  useEffect(() => {
    const filtered = documents.filter((doc) => {
      return (
        doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredDocuments(filtered);
    setCurrentPage(1);
  }, [searchQuery, documents]);

  const totalDocuments = filteredDocuments.length;
  const totalPages = Math.ceil(totalDocuments / docsPerPage) || 1;
  const startIndex = (currentPage - 1) * docsPerPage;
  const endIndex = Math.min(startIndex + docsPerPage, totalDocuments);
  const paginatedDocs = filteredDocuments.slice(startIndex, endIndex);

  return (
    <CCol xs={12}>
      <CCard className="shadow-lg rounded-3 border-0">
        <CCardHeader className="bg-secondary text-white text-center fw-bold fs-4">
          📄 Document List
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput
                type="text"
                placeholder="🔍 Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </CCol>
          </CRow>
          <CTable hover responsive striped bordered className="text-center align-middle shadow-sm">
            <CTableHead className="table-dark">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Title</CTableHeaderCell>
                <CTableHeaderCell>Description</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {paginatedDocs.length > 0 ? (
                paginatedDocs.map((doc, index) => (
                  <CTableRow key={doc.id} className="table-light">
                    <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                    <CTableDataCell>{doc.title}</CTableDataCell>
                    <CTableDataCell>{doc.description}</CTableDataCell>
                    <CTableDataCell>{doc.date}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/documents/edit/${doc.id}`}>Edit</Link>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="5" className="text-center text-muted py-4">
                    No documents found.
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
          <CRow className="mt-3 d-flex justify-content-between align-items-center">
            <CCol md={3}>
              <CFormSelect
                value={docsPerPage}
                onChange={(e) => {
                  setDocsPerPage(Number(e.target.value));
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

export default FetchDocuments;
