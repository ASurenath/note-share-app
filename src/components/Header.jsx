import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.png'
import { Button, ButtonGroup, Col, Container, Nav, Navbar, Row, Spinner, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useDispatch, useSelector } from 'react-redux'
import { switchUpdate } from '../Redux/Slices/updateSlice'





function Header({headerFor}) {
// ___________________________________________________________HOOKS
  const [loginStatus, setLoginStatus] = useState(false)
  const update = useSelector(state => state.updateReducer)
  const [loggingOut, setLoggingOut] = useState(false)
  const [uname,setUname]=useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // useEffect(()=>{
  //   setHeaderFor(props.headerFor)
  // },[props.headerFor])
  console.log(headerFor)
  useEffect(() => {
    let token = sessionStorage.getItem("token")
    if (token) {
      setLoginStatus(true)
      setUname(sessionStorage.getItem("uname"))
    }
    else {
      setLoginStatus(false)
    }
  }, [update])
// _______________________________________________________________________FUNCTIONS
// _______________________________________________________Logout
  const logout = () => {
    setLoggingOut(true)
    setTimeout(() => {
      sessionStorage.clear()
      setLoginStatus(false)
      dispatch(switchUpdate())
      setLoggingOut(false)
      navigate('/')
    }, 2000);
  }
// _________________________________________________________________RETURN
  return (
    <Navbar expand="lg" className="margin-only bg-secondary text-dark w-100" style={{}}>
      <Container className='w-100'>

        <Link to={'/'}>
          <Navbar.Brand className=''>
            <img src={Logo} alt="NoteShare Logo" style={{ maxWidth: '50vw' }} />
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav-2" >
          {loginStatus &&
            <Nav className='me-lg-auto'>
              <div  name="navigation"  className='pt-3 text-center' >
                <Button disabled={headerFor=='home'} onClick={() => {navigate('/')}} variant={'success'} style={{ borderRadius: '50px 0 0 50px' }} className='px-md-4'>
                  <b>Home</b>
                </Button>
                <Button  disabled={headerFor=='browser'}  onClick={() => navigate('/browse')} variant={'success'} className='px-md-4'>
                  <b>Browse</b>
                </Button>
                <Button  disabled={headerFor=='dashboard'} onClick={() => navigate('/dashboard')} variant={'success'} style={{ borderRadius: '0 50px 50px 0' }} className='px-md-4'>
                  <b>Dashboard</b>
                </Button>
              </div>
            </Nav>
          }
          <Nav className='ms-auto'>
            {loginStatus ?
              <>
                <div className='text-center'>
                  <Link to={'/dashboard'} style={{ color: 'white' }}><i className="fa-regular fa-user"></i>&nbsp;: {uname}</Link>
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
                </div>
              </>
              : <div style={{ scale: '0.75' }} className='d-flex justify-content-center align-items-center'><Login /></div>
            }
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}

export default Header