import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.png'
import { Button, Col, Container, Nav, Navbar, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useDispatch, useSelector } from 'react-redux'
import { switchUpdate } from '../Redux/Slices/updateSlice'





function Header() {
  const [loginStatus, setLoginStatus] = useState(false)
  const update = useSelector(state => state.updateReducer)
  const [loggingOut, setLoggingOut] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    let token = sessionStorage.getItem("token")
    if (token) {
      setLoginStatus(true)
    }
    else {
      setLoginStatus(false)
    }
  }, [update])

  const logout = () => {
    setLoggingOut(true)
    setTimeout(() => {
      sessionStorage.removeItem("token")
      setLoginStatus(false)
      dispatch(switchUpdate())
      setLoggingOut(false)
      navigate('/')
    }, 2000);
  }

  return (
    <Navbar expand="sm" className="margin-only bg-secondary text-dark w-100" style={{}}>
      <Container className='w-100'>

        <Link to={'/'}>
          <Navbar.Brand className='fw-bold fs-4'>
            <img src={Logo} alt="NoteShare Logo" style={{ maxWidth: '50vw' }} />
          </Navbar.Brand>

        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          {loginStatus ?
            <>

              <Nav className='text-center text-white p-1' >
                <Link to={'/dashboard'} style={{ color: 'white' }}><i className="fa-regular fa-user"></i>&nbsp;: User</Link>
              </Nav>


              <Nav className='text-center'>
                <Button variant='danger' onClick={logout} style={{ scale: '0.75' }}>
                  <h3 className='serif-bold'>

                    {loggingOut ?
                      <>
                        <Spinner animation="grow" variant="success" size='sm' />
                        <Spinner animation="grow" variant="info" size='sm' />
                        <Spinner animation="grow" variant="warning" size='sm' />
                        <Spinner animation="grow" variant="danger" size='sm' />
                      </>
                      : <>Log&nbsp;out</>}
                  </h3>
                </Button>
              </Nav>
            </>
            : <div style={{ scale: '0.75' }}><Login /></div>
          }
        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}

export default Header