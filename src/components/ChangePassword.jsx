import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'


function ChangePassword() {
    const [show, setShow] = useState(false);
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', newPassword2: '' })
    const [validity, setValidity] = useState({ newPassword: true, newPassword2: true })
    const [readyToSubmit, setReadyToSubmit] = useState(false)

    useEffect(() => {
        if (passwords.currentPassword != "" &&passwords.newPassword != "" &&passwords.newPassword2 != "" &&   validity.newPassword && validity.newPassword2) {
            setReadyToSubmit(true)
        }
        else {
            setReadyToSubmit(false)
        }
    }, [passwords, validity])

    const handleOpen = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setPasswords({ currentPassword: '', newPassword: '', newPassword2: '' })
    }


    const setData = (e) => {
        const { name, value } = e.target
        setPasswords({ ...passwords, [name]: value })
        if (name == 'newPassword') {
            if (value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,100}$/)) {
                setValidity({ ...validity, [name]: true })
            }
            else {
                setValidity({ ...validity, [name]: false })
            }
        }
        else if (name == 'newPassword2') {
            if (value == passwords.newPassword) {
                setValidity({ ...validity, [name]: true })
            }
            else {
                setValidity({ ...validity, [name]: false })
            }
        }
    }
    return (
        <div>
            <Button className='serif-bold' onClick={handleOpen}>Change password</Button>

            <Modal
                size='small'
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <Modal.Header>
                    <Modal.Title className='text-center' id="example-custom-modal">
                        <p>Change password</p>
                    </Modal.Title>
                    <Button onClick={handleClose} variant='primary' className='ms-auto'><i className='fa-solid fa-x' /></Button>
                </Modal.Header>
                <Modal.Body className='pb-3'>
                    <div className='form-grid pb-3'>
                    
                        <label htmlFor='password1'>Current password:</label>
                        <input id='password1' name='currentPassword' type="password" onChange={e => setData(e)} className='form-control mb-3' placeholder='Enter your current password..' />

                        {!validity.newPassword&&<><p></p><span className='text-danger'>Invalid password</span></>}
                        <label htmlFor='password2'>New password:</label>
                        <input id='password2' name='newPassword' type="password" onChange={e => setData(e)} className='form-control mb-3' placeholder='Enter your new password..' />

                        {!validity.newPassword2&&<><p></p><span className='text-danger'>Passwords should match</span></>}
                        <label htmlFor="password3">Re-enter new password:</label>
                        <input id='password3' name='newPassword2' type="password" onChange={e => setData(e)} className='form-control mb-3' placeholder='Re-enter your new password..' />
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <Button onClick={handleClose} variant='primary' className='serif-bold'>Cancel</Button>
                        <Button onClick={handleClose} disabled={!readyToSubmit} variant='success' className='serif-bold'>Change</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ChangePassword