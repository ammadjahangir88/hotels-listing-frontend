
import { BrowserRouter, Routes, Route } from "react-router-dom"


import ListingsPage from "./ListingsPage"
function App() {


  return (
    <>
    <BrowserRouter>
    
      <Routes>

         <Route path="/" element={<ListingsPage />} />

      </Routes>
    
    </BrowserRouter>
      
    </>
  )
}

export default App
