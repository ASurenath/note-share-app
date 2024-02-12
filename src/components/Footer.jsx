import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png'



function Footer() {
    
    return (
        <Navbar expand="lg" className="margin-only bg-secondary text-dark w-100 pt-5" style={{}}>
            <Container className='w-100'>
                <Row className='w-100'>

                    <Col lg={3} md={12} className='text-center'>
                    <Link to={'/'}>
                    <Navbar.Brand className='fw-bold fs-4'><img src={Logo} alt="NoteShare Logo" style={{scale:'0.5',maxWidth:'50vw'}}/></Navbar.Brand>

                </Link>
                    </Col>

                    <Col lg={3} xs={6}>
                        <h4 className='px-sm-5 text-white serif-bold'>
                            Links
                        </h4>
                        <ul className='hidden serif-bold'>
                            <li><Link to={'/'}>Home</Link></li>
                            <li><Link to={'/'}>Login</Link></li>
                            <li><Link to={'/'}>Register</Link></li>
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
                        <form action="">
                            <input type="email" name="" id="" placeholder='Your email id' className='form-control rounded-5' />
                            <button className='btn btn-outline-light mt-2'>Send an E-mail</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}

export default Footer
