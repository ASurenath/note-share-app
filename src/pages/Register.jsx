import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import signup from '../assets/signup.svg'
import Login from '../components/Login';
import { Link } from 'react-router-dom';




function Register() {
  const [userData, setUserData] = useState({
    name: "", email: "", password: "", password2: ""
  })
  const [validity, setValidity] = useState({
    name: true, email: true, password: true, password2: true
  })
  const [readyToSubmit, setReadyToSubmit] = useState(false)

  useEffect(() => {
    if(userData.name!="" &&  userData.email !="" && userData.password!="" && userData.password2!=""
    && validity.name && validity.email && validity.password && validity.password2){
      setReadyToSubmit(true)
    }
    else{
      setReadyToSubmit(false)
    }
  }, [userData, validity])
  // const clearData=()=>{
  //   setUserData({
  //     name: "", email: "", password: "", password2: ""
  //   })
  // }

  console.log(userData);
  console.log(validity);
  const setData = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    if (name == 'name') {
      if (value.match(/^[a-zA-Z ]+$/)) {
        setValidity({ ...validity, [name]: true })
      }
      else {
        setValidity({ ...validity, [name]: false })
      }
    }
    else if (name == 'email') {
      if (value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
        setValidity({ ...validity, [name]: true })
      }
      else {
        setValidity({ ...validity, [name]: false })
      }
    }
    else if (name == 'password') {
      if (value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,100}$/)) {
        setValidity({ ...validity, [name]: true })
      }
      else {
        setValidity({ ...validity, [name]: false })
      }
    }
    else if (name == 'password2') {
      if (value == userData.password) {
        console.log(2);
        setValidity({ ...validity, [name]: true })
      }
      else {
        setValidity({ ...validity, [name]: false })
      }
    }
  }
  return (
    <div className='notebook bg-secondary d-flex flex-column justify-content-center align-items-center text-center pb-5' style={{ minHeight: '100vh' }}>
      <h1 className='serif-bold text-center text-white'>Register for <span className='text-warning serif-bold'>free!</span></h1>
      <Container fluid='sm' className=' normal p-2 text-left text-white'>
        <Row>
          <Col lg={6} className='d-flex justify-content-center align-items-center'>
            <img src={signup} alt="Signup" className='img-fluid' />
          </Col>
          <Col lg={6} className='px-5'>
            <div className=' register-form  text-shadow fs-4'>
              <label htmlFor='name'>Name: </label> {!validity.name && <span className='text-danger'>Invalid name!</span>}
              <input type="text" name='name' onChange={e => setData(e)} value={userData.name} id='name' placeholder='Your name' className='form-control mb-3 rounded-5' />
              <label htmlFor='email'>Email: </label> {!validity.email && <span className='text-danger'>Invalid Email!</span>}
              <input type="email" name='email' onChange={e => setData(e)} value={userData.email} id='email' placeholder='Your E-mail ID' className='form-control mb-3 rounded-5' />
              <label htmlFor='password'>Password: </label> {!validity.password && <span className='text-danger'>Invalid Password!</span>}
              <input type="password" name='password' onChange={e => setData(e)} value={userData.password} id='password' placeholder='Your password' className='form-control mb-3 rounded-5' />
              <label htmlFor='password2'>Re-enter password: </label> {validity.password && !validity.password2 && <span className='text-danger'>Passwords do not match!</span>}
              <input type="password" name='password2' onChange={e => setData(e)} value={userData.password2} id='password2' placeholder='Re-enter your password' className='form-control mb-3 rounded-5' />
            </div>
            <div className='d-flex justify-content-between py-4'>
              <Link to='/'><Button variant='info' className='serif-bold fs-5'>Back&nbsp;to&nbsp;home</Button></Link>
              <Button variant='success fs-5' className='serif-bold' disabled={!readyToSubmit}>Register</Button>
            </div>
            <div className='d-flex align-items-center justify-content-center handwrite fs-3 pt-3 text-shadow'>Already a member? <div className='linkify p-0' style={{ scale: '0.8' }} > <Login/></div></div>
          </Col>
         
        </Row>
      </Container>





    </div>
  )
}

export default Register