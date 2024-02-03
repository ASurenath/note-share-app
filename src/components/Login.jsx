import React, { useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { switchUpdate } from '../Redux/Slices/updateSlice';



function Login() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        email: "", password: ""
    })
    const [readyToSubmit, setReadyToSubmit] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (loginData.email && loginData.password) {
            setReadyToSubmit(true)
        }
        else {
            setReadyToSubmit(false)
        }
    }, [loginData])

    const handleClose = () => {
        setShow(false)
        setLoginData({ email: "", password: "" })
    };
    const handleShow = () => setShow(true);

    ///// DUMMY FUNCTIONS
    const dummyLogin = () => {
        handleClose()
        sessionStorage.setItem("token", "dummyToken")
        dispatch(switchUpdate())
        navigate('/')
    }

    return (
        <>
            <Button variant='success' onClick={handleShow}>
                <h3 className='serif-bold'>Log&nbsp;in</h3>
            </Button>

            <Offcanvas
                data-bs-theme={'dark'}
                show={show}
                onHide={handleClose}
                placement={'end'}
                className='bg-black text-white'
            >
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <h2 className='serif-bold text-center'>Log<span className='text-warning serif-bold'>in</span></h2>
                    <div className='form-grid normal p-2'>

                        <label htmlFor='email'>Email: </label>
                        <input type="email" onChange={e => setLoginData({ ...loginData, email: e.target.value })} value={loginData.email} id='email' placeholder='Your email-id' className='form-control my-2 rounded-5' />
                        <label htmlFor='password'>Password: </label>
                        <input type="password" onChange={e => setLoginData({ ...loginData, password: e.target.value })} value={loginData.password} id='password' placeholder='Your password' className='form-control my-2 rounded-5' />


                    </div>

                    <div className='d-flex justify-content-evenly p-5'>
                        <Button onClick={handleClose} className='serif-bold fs-5'>Cancel</Button>
                        <Button variant='success' disabled={!readyToSubmit} onClick={dummyLogin} className='serif-bold fs-5'>Log in</Button>
                    </div>
                    <div className='d-flex justify-content-center align-items-end handwrite fs-4'>
                        Not a member?&nbsp; <span onClick={handleClose}><Link to='/register'> Register</Link></span>
                    </div>




                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Login