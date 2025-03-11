import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    // Simulate fetching documents from an API
    const dummyDocs = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Document ${i + 1}`,
      author: `Author ${i + 1}`,
      date: new Date().toISOString().split('T')[0],
      status: i % 2 === 0 ? 'Approved' : 'Pending',
    }))
    setDocuments(dummyDocs)
  }, [])

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title' },
    { header: 'Author', accessor: 'author' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status' },
  ]

  return (
    <DataTable
      title="Documents"
      data={documents} // pass the array directly
      columns={columns}
      searchFields={['title', 'author']}
      filterFields={['status']}
    />
  )
}

export default DocumentsPage
