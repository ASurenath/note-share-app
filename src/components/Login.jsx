import React, { useContext, useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../apiServices/allApis';
import { loginStatusContext } from '../Context/ContextShare';
import { toast } from 'react-toastify';



function Login() {
    // ________________________________________________________HOOKS
    const [show, setShow] = useState(false);
    const { setLoginStatus} = useContext(loginStatusContext)
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
    //// _______________________________________________________Functions
    const handleClose = () => {
        setShow(false)
        setLoginData({ email: "", password: "" })
    };
    const handleShow = () => setShow(true);

    /////______________________________________________________ Login
    const Login = async () => {
        const loginToast = toast.loading("Please wait...")
        try {
            const result = await loginApi(loginData)
            if (result.status == 200) {
                toast.update(loginToast, { render:"Logged in.", type: "success", isLoading: false,autoClose:true });
                handleClose()
                sessionStorage.setItem('token', result.data.token)
                sessionStorage.setItem('uname', result.data.user.uname)
                navigate('/')
                setLoginStatus(true)
            }
            else if (result.response.status == 404) {
                // toast.warning(result.response.data);
                toast.update(loginToast, { render: result?.response?.data, type: "warning", isLoading: false,autoClose:true });
            }
        }
        catch (err) {
            console.log(err);
            toast.update(loginToast, { render:'Something went wrong. Please try again later', type: "error", isLoading: false,autoClose:true });
        }
    }
    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
          document.getElementById('login-button').click();
        }
      };
    // //____________________________________________________________Return
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
                        <input type="email" onChange={e => setLoginData({ ...loginData, email: e.target.value })} value={loginData.email} id='email' onKeyDown={handleKeypress} placeholder='Your email-id' className='form-control my-2 rounded-5' />
                        <label htmlFor='password'>Password: </label>
                        <input type="password" onChange={e => setLoginData({ ...loginData, password: e.target.value })} value={loginData.password} id='password' onKeyDown={handleKeypress} placeholder='Your password' className='form-control my-2 rounded-5' />


                    </div>

                    <div className='d-flex justify-content-evenly p-5'>
                        <Button onClick={handleClose} className='serif-bold fs-5'>Cancel</Button>
                        <Button variant='success' disabled={!readyToSubmit} onClick={Login} id='login-button' className='serif-bold fs-5'>Log in</Button>
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