import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Users from './pages/Users';
import Documents from './pages/Documents';
import UserForm from './pages/UserForm';
import DocumentForm from './pages/DocumentForm';
import ProtectedRoute from './components/ProtectedRoute';

const Layout = ({ children }) => {
  const location = useLocation();

  // Hide sidebar on login page
  if (location.pathname === "/login") return children;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', background: '#f0f0f0', padding: '20px' }}>
        <h3>Dashboard</h3>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/documents">Documents</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes with sidebar layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/new"
        element={
          <ProtectedRoute>
            <Layout>
              <UserForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/edit/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <UserForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <Layout>
              <Documents />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/new"
        element={
          <ProtectedRoute>
            <Layout>
              <DocumentForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/edit/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <DocumentForm />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
