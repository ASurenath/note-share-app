import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'


function DeleteNote() {
  const [show, setShow] = useState(false);

  const createNote = () => {
    if (!title) {
      alert('Please enter a title')
    }
    else {
      handleClose()
      alert('New Document Added!')
    }
  }
  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setTitle('')
  }
  const [title, setTitle] = useState('')
  return (
    <div>
      <Button onClick={handleOpen} variant='primary' className='normal-bold rounded-4'>
        Delete <br /><i className="fa-solid fa-trash"></i>
        </Button>

      <Modal
        size='small'
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header>
          <Modal.Title className='text-center' id="example-custom-modal">
            <p>Are you sure that you want to delete 'Note title'?</p>
            <p className='text-danger fw-bold fs-2'>This can't be undone!</p>
          </Modal.Title>
          <Button  onClick={handleClose} variant='primary' className='ms-auto'><i className='fa-solid fa-x'/></Button>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-evenly'>
          <Button onClick={handleClose} variant='success'>No,&nbsp;cancel</Button>
            <Button onClick={handleClose} variant='primary'>Yes,&nbsp;Please delete</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DeleteNote