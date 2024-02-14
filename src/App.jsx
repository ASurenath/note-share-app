import { Navigate, Route, Routes, redirect } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import Browse from './pages/Browse'
import Dashboard from './pages/Dashboard'
import { useContext } from 'react'
import { loginStatusContext } from './Context/ContextShare'



function App() {
  const {loginStatus} = useContext(loginStatusContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<> <Header headerFor={'home'}/><Home /></>} />
        <Route path='/register' element={!loginStatus?<> <Header headerFor={'register'}/><Register /></>:<Navigate to={'/'}/>} />
        <Route path='/browse' element={loginStatus?<> <Header headerFor={'browser'}/><Browse /></>:<Navigate to={'/'}/>} />
        <Route path='/dashboard' element={loginStatus?<> <Header headerFor={'dashboard'}/><Dashboard /></>:<Navigate to={'/'}/>} />
        <Route path='/*' element={<Navigate to={'/'}/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
