import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { PrivateRoute } from "./pages/auth/PrivateRoute";

import { HomePage } from "./pages/Home/HomePage";
import { ProductsPage } from "./pages/productsTable/productsPage";
import { BillPage } from "./pages/BillGenerator/BillPage";
import { CustomerManagement } from "./pages/cutomerDetails/CustomerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/bill" element={<BillPage />} />
          <Route path="/customer-details" element={<CustomerManagement />} />
        </Route>

        {/* Redirect unknown pages */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
