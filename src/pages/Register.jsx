import React, { useEffect, useState } from 'react'
import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import signup from '../assets/signup.svg'
import Login from '../components/Login';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../apiServices/allApis';
import { useDispatch } from 'react-redux';
import { switchUpdate } from '../Redux/Slices/updateSlice';
// ____________________________________________________________

function Register() {
  // _______________________________________________________Hooks_____
  const [userData, setUserData] = useState({
    uname: "", email: "", password: "", password2: ""
  })
  const [validity, setValidity] = useState({
    uname: true, email: true, password: true, password2: true
  })
  const [readyToSubmit, setReadyToSubmit] = useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(() => {
    if (userData.uname != "" && userData.email != "" && userData.password != "" && userData.password2 != ""
      && validity.uname && validity.email && validity.password && validity.password2) {
      setReadyToSubmit(true)
    }
    else {
      setReadyToSubmit(false)
    }
  }, [userData, validity])
  // _____________________________________________________Functions_______
  // const clearData=()=>{
  //   setUserData({
  //     uname: "", email: "", password: "", password2: ""
  //   })
  // }

  console.log(userData);
  console.log(validity);
  // -_____________________________________________________setData_____
  const setData = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    if (name == 'uname') {
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
        if(value==userData.password2){
          setValidity({...validity,[name]: true,password2:true})
        }
        else{
          setValidity({...validity,[name]: true,password2:false})
        }
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
  // -_____________________________________________________HandleRegister_____
  const handleRegister=async()=>{
    try{
      const result= await registerApi(userData)
    if(result.status==200){
      console.log(result);
      sessionStorage.setItem('token',result.data.token)
      sessionStorage.setItem('uname',result.data.user.uname)
      // sessionStorage.setItem('email',result.data.user.email)
      // sessionStorage.setItem('interests',result.data.user.interests)
      // sessionStorage.setItem('bio',result.data.user.bio)
      // sessionStorage.setItem('profilePic',result.data.user.profilePic)
      alert(`Welcome ${userData.uname}.You have successfully registered`)
      navigate('/')
      dispatch(switchUpdate())
    }
    else{
      alert(result.response.data)
    }}
    catch(err){
      alert('Something went wrong. Please try later')
      console.log(err);
    }
  }
    // -________________________________________________________tooltip

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Password should<br /> have
        minimum
        <ul className='text-start'>
            <li>1 small letter</li>
            <li>1 capital letter</li>
            <li>1 number</li>
        </ul>
    </Tooltip>
);
// ________________________________________________________________RETURN
  return (
    <div className='page notebook bg-secondary d-flex flex-column justify-content-center align-items-center text-center pb-5'>
      <h1 className='serif-bold text-center text-white'>Register for <span className='text-warning serif-bold'>free!</span></h1>
      <Container fluid='sm' className=' normal p-2 text-left text-white'>
        <Row>
          <Col lg={6} className='d-flex justify-content-center align-items-center'>
            <img src={signup} alt="Signup" className='img-fluid' />
          </Col>
          <Col lg={6} className='px-5'>
            <div className=' register-form  text-shadow fs-4'>
              <label htmlFor='uname'>Name: </label> {!validity.uname && <span className='text-danger'>Invalid name!</span>}
              <input type="text" name='uname' onChange={e => setData(e)} value={userData.uname} id='uname' placeholder='Your name' className='form-control mb-3 rounded-5' />
              <label htmlFor='email'>Email: </label> {!validity.email && <span className='text-danger'>Invalid Email!</span>}
              <input type="email" name='email' onChange={e => setData(e)} value={userData.email} id='email' placeholder='Your E-mail ID' className='form-control mb-3 rounded-5' />
              <label htmlFor='password'>Password:&nbsp;
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <i className="fa-regular fa-circle-question" />
                </OverlayTrigger>
                &nbsp;
              </label>
              {!validity.password && <span className='text-danger'>Invalid Password!</span>}
              <input type="password" name='password' onChange={e => setData(e)} value={userData.password} id='password' placeholder='Your password' className='form-control mb-3 rounded-5' />
              <label htmlFor='password2'>Re-enter password: </label> {validity.password && !validity.password2 && <span className='text-danger'>Mismatch!</span>}
              <input type="password" name='password2' onChange={e => setData(e)} value={userData.password2} id='password2' placeholder='Re-enter your password' className='form-control mb-3 rounded-5' />
            </div>
            <div className='d-flex justify-content-between py-4'>
              <Link to='/'><Button variant='info' className='serif-bold fs-5'>Back&nbsp;to&nbsp;home</Button></Link>
              <Button onClick={handleRegister} disabled={!readyToSubmit} variant='success fs-5' className='serif-bold' >Register</Button>
            </div>
            <div className='d-flex align-items-center justify-content-center handwrite fs-3 pt-3 text-shadow'>Already a member? <div className='linkify p-0' style={{ scale: '0.8' }} > <Login /></div></div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register