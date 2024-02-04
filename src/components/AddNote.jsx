import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'


function AddNote() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('')

  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setTitle('')
    setShow(false);
  }
  return (
    <div>
      <Button variant='danger' className='mt-3 p-1' onClick={handleOpen}>
        <h3 className='serif'>New&nbsp;note!</h3>
      </Button>
      <Modal
      size='small'
        show={show}
        onHide={handleClose}
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
           Create a new Note!
          </Modal.Title>
          <Button  onClick={handleClose} variant='primary' className='ms-auto'><i className='fa-solid fa-x'/></Button>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex px-5 pb-5'>
            <input type="text" className='form-control' placeholder='Title...' value={title} onChange={e => setTitle(e.target.value)} />
            <Button variant='success' disabled={!title}>Create</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddNote