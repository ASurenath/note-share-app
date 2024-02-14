import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { changePasswordApi } from '../apiServices/allApis';
import { toast } from 'react-toastify';


function ChangePassword() {
    const [show, setShow] = useState(false);
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', newPassword2: '' })
    const [validity, setValidity] = useState({ newPassword: true, newPassword2: true })
    const [readyToSubmit, setReadyToSubmit] = useState(false)



    useEffect(() => {
        if (passwords.currentPassword != "" && passwords.newPassword != "" && passwords.newPassword2 != "" && validity.newPassword && validity.newPassword2) {
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
        setValidity({ newPassword: true, newPassword2: true })
    }


    const setData = (e) => {
        const { name, value } = e.target
        setPasswords({ ...passwords, [name]: value })
        if (name == 'newPassword') {
            if (value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,100}$/)) {
                if (value == passwords.newPassword2) {
                    setValidity({ ...validity, [name]: true, newPassword2: true })
                }
                else {
                    setValidity({ ...validity, [name]: true, newPassword2: false })
                }
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
    const handleSubmit = async () => {
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const changeToast = toast.loading("Please wait...")
        try {
            const result = await changePasswordApi(passwords, reqHeader)
            if (result.status == 200) {
                toast.update(changeToast, { render:`Passworde changed successfully`, type: "success", isLoading: false,autoClose:true });
                handleClose()
            }
            else if (result.response.status == 404) {
                toast.update(changeToast, { render:result.response.data, type: "warning", isLoading: false,autoClose:true });
            }
        }
        catch (err) {
            console.log(err);
            toast.update(changeToast, { render:'Something went wrong. Please try again', type: "error", isLoading: false,autoClose:true });
        }
    }

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
// // ______________________________________________________RETURN
const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      document.getElementById('change-button').click();
    }
  };
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
                        <input id='password1' name='currentPassword' type="password" onChange={e => setData(e)} onKeyDown={handleKeypress} className='form-control mb-3' placeholder='Enter your current password..' />

                        {!validity.newPassword && <><p></p><p className='text-danger'>Invalid password</p></>}
                        <label htmlFor='password2'>
                            New password: &nbsp;
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}>
                                <i className="fa-regular fa-circle-question" />
                            </OverlayTrigger>
                        </label>
                        <input id='password2' name='newPassword' type="password" onChange={e => setData(e)} onKeyDown={handleKeypress} className='form-control mb-3' placeholder='Enter your new password..' />

                        {validity.newPassword && !validity.newPassword2 && <><p></p><span className='text-danger'>Passwords should match</span></>}
                        <label htmlFor="password3">Re-enter new password:</label>
                        <input id='password3' name='newPassword2' type="password" onChange={e => setData(e)} onKeyDown={handleKeypress} className='form-control mb-3' placeholder='Re-enter your new password..' />
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <Button onClick={handleClose} variant='primary' className='serif-bold'>Cancel</Button>
                        <Button onClick={handleSubmit} disabled={!readyToSubmit} id='change-button' variant='success' className='serif-bold'>Change</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ChangePassword