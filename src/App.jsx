import { Navigate, Route, Routes, redirect } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import Browse from './pages/Browse'
import Dashboard from './pages/Dashboard'



function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/browse' element={<Browse />} />
        {/* <Route path='/favorites' element={<Home />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        {/* <Route path='/note/:id' element={<Home />} /> */}
        <Route path='/edit/:id' element={<Home />} />
        <Route path='/*' element={<Navigate to={'/'}/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
