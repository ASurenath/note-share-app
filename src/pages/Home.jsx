import React, { useEffect, useState } from 'react'
import notes from '../assets/notes.png'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Login from '../components/Login'
import { useSelector } from 'react-redux'



function Home() {
  const update = useSelector(state => state.updateReducer)
  const [loginStatus, setLoginStatus] = useState(false)
  useEffect(() => {
    let token=sessionStorage.getItem("token")
    if(token){
      setLoginStatus(true)
    }
    else{
      setLoginStatus(false)
    }
  }, [update])
  

  return (
    <div className='page notebook d-flex flex-column justify-content-start align-items-center bg-secondary text-center pb-5'>
            <h3 className='serif-bold p-4 text-white'><span className='text-warning handwrite'>Share </span> and <span className='text-warning handwrite'> explore </span> notes effortlessly. {!loginStatus && <>Join our learning community today!</>} </h3>

      <img src={notes} alt="clip art of two people sharing notes"  style={{width:'min(900px,90%)'}}/>
     
      <Row className='w-75'>
        {loginStatus?
        
        <>
          <Col md={6} className='d-flex justify-content-around align-items-center pt-5'>
            <Link to='/browse'>
              <Button variant='success'>
                <h3 className='serif-bold'>Explore&nbsp;notes!</h3>
              </Button>
            </Link>
          
          </Col>

             <Col md={6} className='d-flex justify-content-around align-items-center pt-5'>

            <Link to='/dashboard'>
              <Button variant='danger'>
                <h3 className='serif-bold'>Manage&nbsp;your&nbsp;notes</h3>
              </Button>
            </Link>
          </Col>
        </>
        
        :<>
        <Col md={6} className='d-flex justify-content-center align-items-center'>
          <h4 className='handwrite p-3 text-white'>New here? </h4>
          &nbsp;&nbsp;&nbsp;
          <Link to='/register'>
            <Button variant='danger'>
              <h3 className='serif-bold'>Register!</h3>
            </Button>
          </Link>
        </Col>
        <Col md={6} className='d-flex justify-content-center align-items-center'>
          <h4 className='handwrite p-3 text-white'>Already a member? </h4>
          &nbsp;&nbsp;&nbsp;
          <Login/>
        </Col>
        </>}
      </Row>
    </div>
  )
}

export default Home