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
      <Routes>
        <Route path='/' element={<> <Header headerFor={'home'}/><Home /></>} />
        <Route path='/register' element={<> <Header headerFor={'register'}/><Register /></>} />
        <Route path='/browse' element={<> <Header headerFor={'browser'}/><Browse /></>} />
        <Route path='/dashboard' element={<> <Header headerFor={'dashboard'}/><Dashboard /></>} />
        {/* <Route path='/note/:id' element={<Home />} /> */}
        <Route path='/edit/:id' element={<> <Header headerFor={''}/><Home /></>} />
        <Route path='/*' element={<Navigate to={'/'}/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
