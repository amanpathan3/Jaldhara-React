// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { PrivateRoute } from "./pages/auth/PrivateRoute";

import { HomePage } from './pages/Home/HomePage';
import { ProductsPage } from './pages/productsTable/productsPage';
import { BillPage } from './pages/BillGenerator/BillPage';
import { CustomerManagement } from './pages/cutomerDetails/CustomerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />

        <Route path="/products" element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        } />

        <Route path="/bill" element={
          <PrivateRoute>
            <BillPage />
          </PrivateRoute>
        } />

        <Route path="/customer-details" element={
          <PrivateRoute>
            <CustomerManagement />
          </PrivateRoute>
        } />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
