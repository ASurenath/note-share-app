import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import avatar from '../assets/avatar.png'

function EditProfile() {
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState(avatar) 
    const [imageStatus,setImageStatus] = useState(false)

    const handleOpen = () => setShow(true);
    const handleClose = () => {
        setShow(false);
    }
    const handleUploadImage = (e) => {
        let image = e.target.files[0]
        if (image?.type == "image/png" ||
          image?.type == "image/jpg" ||
          image?.type == "image/jpeg") {
          setImageStatus(true)
          setPreview(URL.createObjectURL(image))
        }
        else {
          setImageStatus(false)
          setPreview(avatar)
        }
      }
    return (
        <div>
            <Button variant='success' className='mt-3' onClick={handleOpen}>
                <h5 className='serif-bold '><i className='fa-solid fa-pen' />&nbsp;Edit</h5>
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size={'lg'}
                data-bs-theme='dark'
                dialogClassName='dark-bg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4} className='text-center'>
                            <label>
                                <input type="file" style={{ display: 'none' }} onChange={e=>handleUploadImage(e)} />
                                <img src={preview} alt="" className='img-fluid' />
                            </label>
                        </Col>
                        <Col md={8}>
                            <div className='form-grid'>
                                <label htmlFor='name1'>Name:</label>
                                <input id='name1' type="text " className='form-control mb-3' placeholder='Name' />
                                <label htmlFor='email'>Email:</label>
                                <input id='email' type="text " className='form-control mb-3' placeholder='example@sample.com' disabled />
                                <label htmlFor="interests">Topics interested in</label>
                                <input id='interests' type="text " className='form-control mb-3' placeholder='eg: Coding, Calculus... ' />
                                <label htmlFor="bio">Bio:</label>
                                <textarea className='form-control' placeholder='Say something about you...' id='bio'></textarea>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary">Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditProfile