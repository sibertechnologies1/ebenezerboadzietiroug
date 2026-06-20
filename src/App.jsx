import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='/portfolio' element={<PortfolioSection />} />
        <Route path='/contact' element={<LeadMagnet />} /> */} */
      </Routes>
    </BrowserRouter>
  )
}

export default App