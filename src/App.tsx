
import { BrowserRouter, Routes, Route } from "react-router-dom"


import ListingsPage from "./ListingsPage"
import HotelDetails from "./HotelDetails"
function App() {


  return (
    <>
    <BrowserRouter>
    
      <Routes>

         <Route path="/" element={<ListingsPage />} />
         <Route path="hotel-details/:id" element={<HotelDetails />} />

      </Routes>
    
    </BrowserRouter>
      
    </>
  )
}

export default App
