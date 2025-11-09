import { HomePage } from './pages/Home/HomePage';
import { Routes, Route } from "react-router-dom";
import {ProductsPage} from './pages/productsTable/productsPage';
import {BrowserRouter} from 'react-router-dom';
import { BillPage } from './pages/BillGenerator/BillPage';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/bill' element={<BillPage />} />
      </Routes>     
    </BrowserRouter>
    </>
  )
}

export default App
