import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'


function DeleteUser() {
  const [show, setShow] = useState(false);
  const [password,setPassword]=useState('')
  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setTitle('')
  }
  const [title, setTitle] = useState('')
  return (
    <div>
      <Button onClick={handleOpen} className='serif-bold'>Delete account</Button>

      <Modal
        size='small'
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header>
          <Modal.Title className='text-center' id="example-custom-modal">
            <p>Are you sure that you want to delete your account.</p>
            <p className='text-danger fw-bold fs-2'>Your notes will be deleted with your account!</p>
          </Modal.Title>
          <Button  onClick={handleClose} variant='primary' className='ms-auto'><i className='fa-solid fa-x'/></Button>
        </Modal.Header>
        <Modal.Body>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className='form-control mb-3 text-center' placeholder='Enter your password...'/>
          <div className='d-flex justify-content-evenly'>
          <Button onClick={handleClose} variant='success' className='serif-bold'>No,&nbsp;cancel</Button>
            <Button onClick={handleClose} variant='primary' className='serif-bold'>Yes,&nbsp;Please delete</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DeleteUser