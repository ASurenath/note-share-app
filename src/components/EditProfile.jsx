import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import avatar from '../assets/avatar.png'
import { editUserApi } from '../apiServices/allApis';
import { SERVER_URL } from '../apiServices/serverUrl';
import { userUpdateContext } from '../Context/ContextShare';

function EditProfile({ user }) {
    const {userUpdate,setUserUpdate}=useContext(userUpdateContext)
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState({})
    const [preview, setPreview] = useState('')
    const [imageStatus, setImageStatus] = useState(false)
    const [readyToSubmit, setReadyToSubmit] = useState(true)
    // const [showImageTypes,setShowImageTypes]=useState(false)
    useEffect(() => { setUserData({ ...user, profileImage: "" }) }, [user])
    useEffect(()=>{
        setPreview(userData?.profileImage?URL.createObjectURL(userData.profileImage)
        :userData?.profilePic?`${SERVER_URL}/uploads/${userData.profilePic}`
        :avatar)},[userData.profileImage,userData.profilePic])
    useEffect(() => {
            if (userData?.uname?.match(/^[a-zA-Z ]+$/)) {
                setReadyToSubmit(true)
            }
            else {
                setReadyToSubmit(false)
            }
    }, [userData])
    // console.log("userData", user);
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
            setUserData({ ...userData, profileImage: image })
            // setShowImageTypes(false)
        }
        else {
            setImageStatus(false)
            setPreview(userData.profilePic ? userData.profilePic : avatar)
            setUserData({ ...userData, profileImage: "" })
            // setShowImageTypes(true)
        }
    }
const handleSubmit=async()=>{
    const token=sessionStorage.getItem('token')
    const {_id,uname,interests,bio,profilePic,profileImage}=userData
    try {
        const reqHeader = {
            "Content-Type": profileImage?"multipart/form-data":"Application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await editUserApi({ _id,uname,interests,bio,profilePic,profileImage }, reqHeader)
        if (result.status == 200) {
            // console.log(result.data);
            console.log("successfully edited");
            setUserUpdate(!userUpdate)
            handleClose()
        }
    }
    catch (err) {
        console.log(err);
    }
}
    return (
        <div>
            <Button variant='success' className='mt-3 mx-1' onClick={handleOpen}>
                <h5 className='serif-bold'><i className='fa-solid fa-pen' />&nbsp;Edit</h5>
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size={'lg'}
                data-bs-theme='dark'
                centered
            >
                <Modal.Header>
                    <Modal.Title>Update Profile</Modal.Title>
                    <Button onClick={handleClose} variant='primary' className='ms-4'><i className="fa-solid fa-xmark" /></Button>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4} className='text-center d-flex flex-column justify-content-between'>
                            <label>
                                <input type="file" style={{ display: 'none' }} onChange={e => handleUploadImage(e)}/>
                                <img src={preview} alt="" className='img-fluid avatar' style={{cursor:'pointer'}}/>
                            </label>
                            <Button className='primary mb-3' onClick={()=>{setUserData({...userData,profilePic:"",profileImage:""});setPreview(avatar)}} disabled={!userData.profileImage&&!userData.profilePic}>Remove profile picture</Button>

                        </Col>
                        <Col md={8}>
                            <div className='form-grid'>
                                <label htmlFor='name1'>Name:</label>
                                <input value={userData.uname} onChange={e => setUserData({ ...userData, uname: e.target.value })} id='name1' type="text " className='form-control mb-3' placeholder='Name' required />
                                <label htmlFor='email'>Email:</label>
                                <input value={userData.email} id='email' type="text " className='form-control mb-3' placeholder='example@sample.com' disabled />
                                <label htmlFor="interests">Topics interested in:&nbsp;</label>
                                <input value={userData.interests} onChange={e => setUserData({ ...userData, interests: e.target.value })} id='interests' type="text " className='form-control mb-3' placeholder='eg: Coding, Calculus... ' />
                                <label htmlFor="bio">Bio:</label>
                                <textarea value={userData.bio} onChange={e => setUserData({ ...userData, bio: e.target.value })} className='form-control' placeholder='Say something about you...' id='bio'></textarea>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} className='serif-bold'>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleSubmit} disabled={!readyToSubmit} className='serif-bold'>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditProfile