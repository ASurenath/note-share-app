import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginStatusContext } from '../Context/ContextShare';


function Footer() {
    const [message, setMessage] = useState('')
    const { loginStatus } = useContext(loginStatusContext)

    return (
        <>
            <Navbar expand="lg" className="margin-only bg-secondary text-dark w-100 pt-5" style={{}}>
                <Container className='w-100'>
                    <Row className='w-100'>

                        <Col lg={3} md={12} className='text-center'>
                            <Link to={'/'}>
                                <Navbar.Brand className='fw-bold fs-4'><img src={Logo} alt="NoteShare Logo" style={{ scale: '0.5', maxWidth: '50vw' }} /></Navbar.Brand>

                            </Link>
                        </Col>

                        <Col lg={3} xs={6}>
                            <h4 className='px-sm-5 text-white serif-bold'>
                                Links
                            </h4>
                            <ul className='hidden serif-bold'>
                                <li><Link to={'/'}>Home</Link></li>
                                {loginStatus?<>
                                   <li><Link to={'/browse'}>Browse</Link></li>
                                    <li><Link to={'/dashboard'}>Dashboard</Link></li></>
                                :<li><Link to={'/register'}>Register</Link></li>
                            }
                            </ul>
                        </Col>
                        <Col lg={3} xs={6}>
                            <h4 className='px-sm-5 text-white serif-bold'>
                                Guides
                            </h4>
                            <ul className='serif-bold hidden'>
                                <li><Link to={'/'}>Help</Link></li>
                                <li><Link to={'/'}>FAQ</Link></li>
                                <li><Link to={'/'}>Community</Link></li>
                            </ul>
                        </Col>
                        <Col lg={3} md={12} className='text-center'>
                            <h4 className='px-5 text-white serif'>
                                Contact Us
                            </h4>
                            <textarea value={message} onChange={e => setMessage(e.target.value)} type="email" placeholder='Your feedbacks...' className='form-control rounded-5' />
                            <a href={`mailto:exapmle@exaple.com?subject=Feedback for NoteShare website&body=${message}`}><button className='btn btn-outline-dark mt-2'>Send an E-mail</button></a>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ transition: 'Slide' }}
            />
        </>
    )
}

export default Footer
